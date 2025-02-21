import 'reflect-metadata';
import {AnyAction, CombinedState, Reducer, combineReducers} from 'redux';

import {BaseEntity} from '../../entities/BaseEntity';
import baseReducer from './baseReducer';
import identityReducer from './identityReducer';
import box from './box';
import requestStatusReducer from './requestStatusReducer';
import formRegisterReducer from './formRegisterReducer';

let combinedReducers = Reflect.getMetadata('reducers', BaseEntity).reduce(
    (reducers, obj) => {
        const key = `${obj.reducerName}`;
        const reducer = baseReducer(obj.reducerName);
        return {
            ...reducers,
            [key]: reducer,
        };
    },
    {
        auth: identityReducer,
        box,
        formRegister: formRegisterReducer,
        requestStatus: requestStatusReducer,
    },
);

const rootReducer = combineReducers(combinedReducers) as Reducer<
    CombinedState<any>,
    AnyAction
>;

export default rootReducer;
