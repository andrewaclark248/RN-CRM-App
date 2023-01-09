import { ADD_CUSTOMER } from '../actions/addCustomer' //redux action
import { STORE_CUSTOMER } from '../../async_storage_data/index' //async action
import { storeData } from '../../async_storage_data/AsyncData'


const initialState = {
	customers: []
}

export const addCustomer = (state = initialState, action) => {
    let returnVar = null;
    if (action.type == ADD_CUSTOMER) {
        var customers = state.customers.concat(action.payload.customer)

        storeData(STORE_CUSTOMER, JSON.stringify(customers))
        returnVar = {
            ...state,
            customers: customers
        }

    } else {
        returnVar = state;
    }
    return returnVar;
}