import {schema} from 'normalizr';
import {call, put} from 'redux-saga/effects';
import alias from 'src/decorators/alias';
import action from '../../src/decorators/action';
import {AlertModalType, ENTITY, Flag} from '../constants';
import reducer from '../decorators/reducer';
import * as actionTypes from '../store/actions';
import {BaseEntity, HTTP_METHOD} from './BaseEntity';
import {IUserEntity} from './EntityTypes';
@alias('Users')
@reducer(ENTITY.USER)
export default class UserEntity extends BaseEntity<UserEntity> {
    constructor(opts: any) {
        super(opts);
        const groups = new schema.Entity(ENTITY.GROUP, {}, {});
        const access = new schema.Entity(ENTITY.ACCESS, {}, {});
        this.initSchema(
            ENTITY.USER,
            {
                [ENTITY.GROUP]: [groups],
                [ENTITY.ACCESS]: [access],
            },
            {idAttribute: 'uid'},
        );

        this.getUserDetailed = this.getUserDetailed.bind(this);
        this.inviteAcceptCompletion = this.inviteAcceptCompletion.bind(this);
        this.transferRightsCompletion =
            this.transferRightsCompletion.bind(this);
        this.getCurrentUserDetailed = this.getCurrentUserDetailed.bind(this);
        this.clearCurrentUserAccess = this.clearCurrentUserAccess.bind(this);
    }

    @action()
    public *getRelatedUsers({data}) {
        console.log('getRelatedUsers data', data);
        const force = data?.force ?? false;
        console.log('force', force);
        try {
            const resData = yield call(
                this.xRead,
                '/users/related',
                {},
                HTTP_METHOD.GET,
                force ?? false,
            );
            if (resData.success) {
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            console.log(' error', error);
        }
    }

    @action()
    public *getUserDetailed({
        uid,
        flag,
        force,
    }: {
        uid: string;
        flag: string;
        force?: boolean;
    }) {
        console.log('getUserDetailed !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        yield put(actionTypes.setBox(flag, false));
        try {
            const resData = yield call(
                this.xRead,
                `/users/${uid}/detailed`,
                {},
                HTTP_METHOD.POST,
                force ?? false,
            );
            console.log('getUserDetailed resData', resData);
            yield put(actionTypes.setBox(flag, true));
            if (resData.success) {
                yield call(this.clearCurrentUserAccess);
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            yield put(actionTypes.setBox(flag, true));
            console.log('error', error);
        }
    }

    @action()
    public *getCurrentUserDetailed({data}) {
        const force = data?.force ?? false;
        try {
            const resData = yield call(
                this.xRead,
                '/users/detailed',
                {},
                HTTP_METHOD.POST,
                force,
            );
            console.log('getUserDetailed resData', resData);
            if (resData.success) {
                yield call(this.clearCurrentUserAccess);
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    @action()
    public *sendIviteForNewUser({
        receiverFirstName,
        receiverLastName,
        receiverEmail,
        accessData,
    }) {
        console.log('sendIviteForNewUser1');
        try {
            const {t, redux} = this.di;
            console.log('sendIviteForNewUser', receiverEmail);
            const resData = yield call(this.xSave, '/users/invite', {
                data: {
                    receiverFirstName,
                    receiverLastName,
                    receiverEmail,
                    accessData,
                },
            });
            if (resData.success) {
                redux.dispatch(
                    actionTypes.setBox(Flag.AlertModal, {
                        title: t('sending-invite'),
                        message: t('send-ivite-success'),
                    }),
                );
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    @action()
    public *updateIdentityData({
        user,
        updatedData,
    }: {
        user: IUserEntity;
        updatedData;
    }) {
        const {
            Identity,
            redux: {dispatch},
        } = this.di;

        if (updatedData.language) {
            yield call(Identity.setLanguageCode, {value: updatedData.language});
        }
        const {t} = this.di;
        try {
            const resData = yield call(
                this.xSave,
                `/users/${user.uid}/update/data`,
                {
                    data: {...user, ...updatedData},
                },
            );
            if (resData.success) {
                yield put(
                    actionTypes.action(actionTypes.UPDATE_IDENTITY_USERDATA, {
                        payload: {
                            data: resData.response.data,
                        },
                    }),
                );
                dispatch(
                    actionTypes.setBox(Flag.AlertModal, {
                        title: t('updating-user'),
                        message: t('user-updated-success'),
                    }),
                );
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            console.log('login error', error);
        }
    }

    @action()
    public *transferAllRights({newUser}: {newUser: string}) {
        try {
            const {t, navigator, Identity, redux} = this.di;
            const resData = yield call(this.xSave, '/users/transfer', {
                newUser,
            });
            if (resData.success) {
                redux.dispatch(
                    actionTypes.setBox(Flag.AlertModal, {
                        title: t('transferring-rights'),
                        message: t('success-transferring-rights'),
                    }),
                );
                navigator.navigate('Main');
                let entities = {};
                Object.values(ENTITY).forEach(entity => {
                    entities[entity] = {};
                });
                yield put(
                    actionTypes.action(actionTypes.DELETE_ALL, {
                        payload: {
                            data: {
                                entities,
                            },
                        },
                    }),
                );
                yield put(Identity.actions.updateIdentity({force: true}));
            } else {
                this.handleUnsuccessResponse(resData?.response);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    clearCurrentUserAccess() {
        const {redux} = this.di;
        const userId = redux.state?.auth?.identity?.userId;
        const users = redux.state.users;
        if (userId && users) {
            const user = users[userId];
            const userAccess = user?.access ?? [];
            const access = redux.state.access;
            const accessForDelete = Object.values(access).filter(value => {
                return value.userId == userId && !userAccess.includes(value.id);
            });
            const deleteObject = {};
            for (let i = 0; i < accessForDelete.length; i++) {
                const element = accessForDelete[i];
                deleteObject[element.id] = element;
            }

            redux.dispatch(
                actionTypes.action(actionTypes.DELETE, {
                    payload: {
                        data: {
                            entities: {
                                [ENTITY.ACCESS]: deleteObject,
                            },
                        },
                    },
                }),
            );
        }
    }

}
