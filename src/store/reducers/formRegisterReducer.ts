import {UPDATE_VALUE_REGISTER} from '../actions';

const initialBox = {
    gender: '',
    lifestyle: '',
    mealApps: '',
    goal: '',
    age: '',
    weight: '',
    cause: '',
    diet: '',
    accomplish: '',
};

function formRegisterReducer(state = initialBox, action: any) {
    const {type, payload} = action;

    if (type === UPDATE_VALUE_REGISTER) {
        return {
            ...state,
            ...payload,
        };
    }

    return state;
}

export default formRegisterReducer;
