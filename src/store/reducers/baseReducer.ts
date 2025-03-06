import { ENTITY, StoreAction } from '../../constants';
import * as actionTypes from '../actions';

type StoreState = {};

const initialState: StoreState = {};

const updateRecipesType = (state, payload) => {
    const updatedState = { ...state };

    payload.forEach(({ id }) => {
        if (updatedState[id]) {
            updatedState[id] = { ...updatedState[id], type: "default" };
        }
    });

    return updatedState;
};

const baseReducer =
    (entityReducer: string) =>
        (state: StoreState = initialState, action: StoreAction): StoreState => {
            switch (action.type) {
                case actionTypes.GET:
                case actionTypes.ADD:
                case actionTypes.UPDATE:
                    if (action.payload) {
                        const entitiesArr = action.payload?.data?.entities;
                        let newValues: any = {};

                        if (entitiesArr && entityReducer in entitiesArr) {
                            const newData = entitiesArr[entityReducer];
                            newValues = [
                                state[entityReducer] ?? {},
                                newData ?? {},
                            ].reduce(function (r, o) {
                                Object.keys(o).forEach(function (k) {
                                    r[k] = o[k];
                                });
                                return r;
                            }, {});
                        }

                        return {
                            ...state,
                            ...newValues,
                        };
                    }
                    break;
                case actionTypes.DELETE:
                    if (action.payload) {
                        const entitiesArr = action.payload?.data?.entities;
                        if (entitiesArr && entityReducer in entitiesArr) {
                            const dataForDelete = entitiesArr[entityReducer];
                            const newValues = { ...state };
                            Object.keys(dataForDelete).forEach(key => {
                                if (newValues.hasOwnProperty(key)) {
                                    delete newValues[key];
                                }
                            });
                            return {
                                ...newValues,
                            };
                        }
                    }
                    break;
                case actionTypes.DELETE_ALL:
                    if (action.payload) {
                        const entitiesArr = action.payload?.data?.entities;
                        if (entitiesArr && entityReducer in entitiesArr) {
                            return {};
                        }
                    }
                    break;
                case actionTypes.TRANSFER_RECIPE:
                    if (action.payload) {
                        const newState = updateRecipesType(state, action.payload);
                        return newState
                    }
                    break;
                case actionTypes.ADD_RECIPE:
                    if (action.payload) {
                        console.log('ADD_RECIPE state', state)
                        console.log('ADD_RECIPE action.payload', action.payload)
                        return { ...state, ...action.payload }
                        return {}
                    }
                    break;
                case actionTypes.CLEAR_RECIPE:
                    if (action.payload) {
                        return {}
                    }
                    break;
                case actionTypes.USER_LOGIN_SUCCESS:
                    if (action.payload) {
                        return { ...state, ...action.payload }
                    }
                    break;
            }
            return state;
        };

export default baseReducer;
