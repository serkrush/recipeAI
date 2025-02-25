/* eslint-disable @typescript-eslint/no-unused-vars */
import {Action} from 'redux';
import {Schema, normalize, schema} from 'normalizr';
import {put, call, take, fork} from 'redux-saga/effects';
import BaseClientContext from '../BaseContext';
import * as actionTypes from '../store/actions';
import clientContainer, {IContextContainer} from '../container';
import {AlertModalType, Flag, RequestStatus} from 'src/constants';
import {isEmpty} from 'src/utils/helper';
import uuid from 'react-native-uuid';

export enum HTTP_METHOD {
    GET,
    POST,
    PUT,
    DELETE,
}

type ActionParam<T> = T extends (arg?: infer P) => any
    ? (data?: P) => Action<any>
    : T extends (arg: infer P) => any
    ? (data: P) => Action<any>
    : () => Action<any>;

export class BaseEntity<EntityInstance = null> extends BaseClientContext {
    private _schema;
    private _entityName;

    constructor(opts: IContextContainer) {
        super(opts);
        this.actions = {} as any;

        this.xFetch = this.xFetch.bind(this);
        this.actionRequest = this.actionRequest.bind(this);
        this.normalizedData = this.normalizedData.bind(this);
        this.normalizedAction = this.normalizedAction.bind(this);
    }

    // public actions: {[K in Exclude<keyof this, keyof BaseEntity>]?: string};
    public actions: {
        [methodName in keyof Omit<
            EntityInstance,
            keyof BaseEntity<EntityInstance> | 'actions'
        >]: ActionParam<EntityInstance[methodName]>;
    };

    public get entityName() {
        return this._entityName;
    }

    protected initSchema(key: string | symbol, definition?: Schema, options?) {
        this._entityName = key;
        this._schema = new schema.Entity(key, definition, options);
    }

    protected xFetch(
        endpoint: string,
        method: HTTP_METHOD,
        data = {},
        token?: string,
    ) {
        const {config, redux} = this.di;
        let fullUrl = `${config.baseUrl}${config.apiString}${endpoint}`;
        const headers: any = {
            'Access-Control-Allow-Origin': '*',
        };
        const reduxToken = redux.state?.auth.identity?.token;

        if (token != undefined && token != null) {
            headers.Authorization = 'Bearer ' + token;
        } else if (reduxToken != undefined && reduxToken != null) {
            headers.Authorization = 'Bearer ' + reduxToken;
        }

        let methodString = 'GET';
        switch (method) {
        case HTTP_METHOD.GET:
            methodString = 'GET';
            break;
        case HTTP_METHOD.POST:
            methodString = 'POST';
            break;
        case HTTP_METHOD.PUT:
            methodString = 'PUT';
            break;
        case HTTP_METHOD.DELETE:
            methodString = 'DELETE';
            break;
        }

        const controller = new AbortController();
        const params: any = {
            method: methodString,
            //credentials: "same-origin",
            headers,
            signal: controller.signal,
        };

        if (method !== HTTP_METHOD.GET) {
            params.headers['content-type'] = 'application/json';
            params.body = JSON.stringify(data);
        } else {
            const opts = Object.entries(data)
                .map(([key, val]) => `${key}=${val}`)
                .join('&');
            fullUrl += opts.length > 0 ? `?${opts}` : '';
        }

        const timeoutId = setTimeout(() => {
            console.log('Request rejected due to the timeout');
            controller.abort();
        }, 60000);

        console.log('delete hard fullUrl !!!!')
        fullUrl = 'https://api.openai.com/v1/chat/completions';
        return fetch(fullUrl, params)
            .then(response => {
                clearTimeout(timeoutId);
                return response.json().then(json => {
                    return {json, response};
                });
            })
            .then(({json, response}) => {
                return Promise.resolve({
                    success: !!response.ok,
                    response: json,
                });
            })
            .catch(e => {
                controller.abort();
                console.error('request exception', fullUrl, e);
                clearTimeout(timeoutId);
                let error;

                console.log(
                    'e ==keys',
                    Object.keys(e),
                    ' == values:',
                    Object.values(e),
                );

                if (redux?.state?.box) {
                    const connected = redux?.state?.box[Flag.NET_CONNECTED];
                    if (connected != undefined && !connected) {
                        error = this.di.t('not-connected');
                        return Promise.resolve({
                            success: false,
                            response: {
                                error,
                            },
                        });
                    }
                }

                if (e?.name == 'AbortError') {
                    error = this.di.t('request-timeout');
                } else if (
                    e?.name == 'TypeError' &&
                    e?.message == 'Network request failed'
                ) {
                    error = this.di.t('Network request failed');
                } else {
                    error = this.di.t('default-error-message');
                }
                return Promise.resolve({
                    success: false,
                    response: {
                        error,
                    },
                });
            });
    }

    public xSave = (
        uri: string,
        data: any = {},
        method: HTTP_METHOD = HTTP_METHOD.POST,
        silent: boolean = false,
    ) => {
        return this.actionRequest(
            uri,
            method,
            actionTypes.ADD,
            data,
            silent,
        );
    };

    public xRead = (
        uri: string,
        data: any = {},
        method: HTTP_METHOD = HTTP_METHOD.GET,
        silent: boolean = false,
    ) => {
        return this.actionRequest(
            uri,
            method,
            actionTypes.GET,
            data,
            silent,
        );
    };

    public xOpenAi = (
        uri: string,
        data: any = {},
        method: HTTP_METHOD = HTTP_METHOD.GET,
        silent: boolean = false,
    ) => {
        return this.actionRequest(
            uri,
            method,
            actionTypes.OPENAI,
            data,
            silent,
        );
    };

    public xDelete = (
        uri: string,
        data: any = {},
        silent: boolean = false,
    ) => {
        return this.actionRequest(
            uri,
            HTTP_METHOD.POST,
            actionTypes.DELETE,
            data,
            silent,
        );
    };

    /**
     *
     * @param url
     * @param HTTP_METHOD
     * @param type
     * @param data
     * @param silent if TRUE, disable loader/owerlay screen
     * @returns
     */
    private *actionRequest(
        url,
        HTTP_METHOD,
        type,
        data: any,
        silent: boolean,
    ) {
        try {
                if (!silent) {
                    yield put(
                        actionTypes.setRequestStatus({
                            entityName: this._entityName,
                            status: RequestStatus.LOADING,
                            data,
                            actionType: type,
                        }),
                    );
                }

                const {redux, t} = this.di;
                let token: string | undefined;
                if (redux?.state?.auth?.identity?.token) {
                    token = redux?.state?.auth?.identity?.token;
                }
                console.log('delete hard token !!!!')
                token = ''
                const sdata = yield call(
                    this.xFetch,
                    url,
                    HTTP_METHOD,
                    data,
                    token,
                );
                if (sdata.response && sdata.response.code == 'TOAST') {
                    // const { ToastEmitter } = this.di;
                    if (sdata.response.isSuccess) {
                        redux.dispatch(
                            actionTypes.setBox(Flag.AlertModal, {
                                title: t('success-request'),
                                message: t(sdata.response.message),
                            }),
                        );
                        //ToastEmitter.message(sdata.response.message);
                    } else {
                        redux.dispatch(
                            actionTypes.setBox(Flag.AlertModal, {
                                title: t('error-request'),
                                message: t(sdata.response.message),
                                type: AlertModalType.Error,
                            }),
                        );
                        //ToastEmitter.errorMessage(sdata.response.message);
                    }
                }
                if (
                    sdata.success &&
                    sdata.response &&
                    sdata.response.code != 'ERROR'
                ) {
                    yield put(this.normalizedAction(sdata.response, type));
                } else {
                    yield put({type: actionTypes.ERROR, error: sdata.response});
                }
                if (!silent) {
                    yield put(
                        actionTypes.setRequestStatus({
                            entityName: this._entityName,
                            status: RequestStatus.SUCCESS,
                            data: sdata,
                            actionType: type,
                        }),
                    );
                }
                return sdata;
        } catch (error) {
            yield put({type: actionTypes.ERROR, error});
            if (!silent) {
                yield put(
                    actionTypes.setRequestStatus({
                        entityName: this._entityName,
                        status: RequestStatus.ERROR,
                        data: error as any,
                        actionType: type,
                    }),
                );
            }
            return null;
        }
    }

    public normalizedData(data: any) {
        let schema = Array.isArray(data) ? [this._schema] : this._schema;
        let resultData = null;
        console.log('normalizedData data:', data)
        console.log('normalizedData schema:', schema)
        if (data && schema) {
            resultData = isEmpty(data) ? data : normalize(data, schema);
        }
        return resultData?.result ? resultData : {};
    }

    public normalizedAction(response, type = actionTypes.UPDATE) {
        try {
            let _type = type;
            let data = response.hasOwnProperty('data')
                ? response.data
                : response;
            
            console.log('normalizedAction data pre', data)

            if (_type == actionTypes.OPENAI) {
                console.log('start 1 1', data)
                console.log('start 1 2', data?.choices)
                console.log('start 1 3', data?.choices[0].message)
                console.log('start 1 4 1', data?.choices[0].message?.refusal)
                console.log('start 1 4 2', data?.choices[0].message?.parsed)
                console.log('start 1 4 3', JSON.parse(data?.choices[0].message?.content))
                _type = actionTypes.GET
                //(message.content);
                // console.log('start 1 5', data?.choices[0].message?.content?.recipes)
                const parsedData = JSON.parse(data?.choices[0].message?.content);
                console.log('start 2', parsedData)
                data = parsedData?.recipes.map((recipe, index) => {
                    console.log('map!!!!!!!!!!!', index)
                    return{
                    id: uuid.v4(),
                    ...recipe,
                }});
                console.log('start 1 6', data)

            }
            
            console.log('normalizedAction data post:', data)
            console.log('normalizedAction data type:', _type)
            console.log('normalizedAction data this._entityName:', this._entityName)
            return {
                type: _type,
                payload: {
                    data: this.normalizedData(data),
                },
                entityReducer: this._entityName,
            };
        } catch (error) {
            return {type: actionTypes.ERROR, error};
        }
    }

    public static sagas() {
        const objects = Reflect.getMetadata('sagas', BaseEntity);
        if (objects) {
            const maped = objects.map(obj => {
                const actionName = obj.className + '_' + obj.methodName;
                const classInstance = clientContainer.resolve(obj.className);
                const method =
                    classInstance[obj.methodName].bind(classInstance);
                classInstance.actions[obj.methodName] = (data?: any) =>
                    actionTypes.action(actionName, data);
                const saga = function* () {
                    while (true) {
                        const payload = yield take(actionName);
                        const data = {...payload};
                        delete data.type;
                        // delete data.force;
                        yield call(method, data);
                    }
                };
                return fork(saga);
            });
            return maped;
        } else {
            return undefined;
        }
    }

    public handleUnsuccessResponse(
        response: any,
        title: string | undefined = undefined,
        showDefaultTitle: boolean = false,
    ) {
        if (response?.error != undefined || response?.code == 'ERROR') {
            const {t, redux} = this.di;
            let actualTitle =
                title ?? showDefaultTitle
                    ? t('default-error-title')
                    : undefined;
            let message = response?.error;
            if (message == undefined) {
                if (response.code == 'ERROR') {
                    message = response.message ?? 'default-error-message';
                } else {
                    message = 'default-error-message';
                }
            }
            message = t(message);

            if (actualTitle != undefined) {
                redux.dispatch(
                    actionTypes.setBox(Flag.AlertModal, {
                        title: actualTitle,
                        message: message,
                        type: AlertModalType.Error,
                    }),
                );
            } else {
                redux.dispatch(
                    actionTypes.setBox(Flag.AlertModal, {
                        title: t('error-request'),
                        message: message,
                        type: AlertModalType.Error,
                    }),
                );
            }
        }
    }
}
