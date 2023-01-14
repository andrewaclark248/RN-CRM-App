import { ON_ASYNC_STORAGE, OFF_ASYNC_STORAGE } from '../actions/toggleAsyncStorage'


const initialState = {
	asyncStorageToggle: false
}

export const asyncStorageReducer = (state = initialState, action) => {
    let returnVar = null;
    if (action.type == ON_ASYNC_STORAGE) {
        returnVar = {
            ...state,
            asyncStorageToggle: true
        }
    } else if (action.type == OFF_ASYNC_STORAGE) {
        returnVar = {
            ...state,
            asyncStorageToggle: false
        }
    } else {
        returnVar = state;
    }
    return returnVar;
}