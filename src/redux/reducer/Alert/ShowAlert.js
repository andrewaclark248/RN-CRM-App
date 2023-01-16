import { SHOW_CREATED_CUSTOMER_ALERT } from '../../actions/showAlertAction.js'


const initialState = {
	showCreatedCustomerAlert: false
}

export const showAlertReducer = (state = initialState, action) => {
    let returnVar = null;
    if (action.type == SHOW_CREATED_CUSTOMER_ALERT) {

        returnVar = {
            ...state,
            showCreatedCustomerAlert: !state.showCreatedCustomerAlert
        }
    } else {
        returnVar = state;
    }
    return returnVar;
}