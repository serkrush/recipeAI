import {call, put} from 'redux-saga/effects';
import {BaseEntity, HTTP_METHOD} from './BaseEntity';
import * as actionTypes from '../../src/store/actions';
import action from '../../src/decorators/action';
import {
    ENTITY,
    Flag,
} from '../../src/constants';
import i18next from 'i18next';
import userDefaults from 'react-native-user-defaults';
import {schema} from 'normalizr';
import alias from 'src/decorators/alias';

@alias('Identity')
export default class Identity extends BaseEntity<Identity> {
    constructor(opts: any) {
        super(opts);
        const users = new schema.Entity(
            ENTITY.USER,
            {},
            {idAttribute: 'userId'},
        );
        this.initSchema(ENTITY.IDENTITY, {userData: users}, {});

        this.navigateToTabs = this.navigateToTabs.bind(this);
        this.updateIdentity = this.updateIdentity.bind(this);
    }

    navigateToTabs() {
        const {navigator} = this.di;
        navigator.reset({
            index: 0,
            routes: [{name: 'Tabs'}],
        });
    }

    @action()
    public *updateIdentity({force}: {force: boolean}) {
        const resData = yield call(
            this.xRead,
            '/auth/update-identity/expanded',
            {},
            HTTP_METHOD.POST,
            force ?? false,
        );

        if (resData.success) {
            yield put(
                actionTypes.action(actionTypes.UPDATE_IDENTITY, {
                    payload: {
                        data: resData.response.data,
                    },
                }),
            );
        } else {
            this.handleUnsuccessResponse(resData?.response);
        }
    }

    @action()
    public *login({data}) {
        const {t, redux} = this.di;

        console.log('login');

    }

    @action()
    public *tryAutologin({}) {
        const {t, redux} = this.di;
        console.log('tryAutologin');

    }

    @action()
    public *register({data}) {
        const {t, redux} = this.di;
        console.log('register');

    }

    @action()
    public *logout() {
        console.log('logout');
    }

    @action()
    public *setLanguageCode({value}) {
        yield put(actionTypes.setBox(Flag.LanguageCode, value));
        userDefaults
            .set(Flag.LanguageCode, value)
            .then(data => console.log('userDefaults set', data));
        i18next.changeLanguage(value);
    }

}
