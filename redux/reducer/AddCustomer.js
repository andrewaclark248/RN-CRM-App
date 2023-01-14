import { ADD_CUSTOMER, UPDATE_CUSTOMER } from '../actions/addCustomer' //redux action
import { STORE_CUSTOMER } from '../../async_storage_data/index' //async action
import { storeData } from '../../async_storage_data/AsyncData'


const initialState = {
	customers: []
}

export const addCustomer = (state = initialState, action) => {

    console.log("saveToAsyncStorage = " + action?.payload?.saveToAsyncStorage)

    let returnVar = null;
    if (action.type == ADD_CUSTOMER) {
        var customers = state.customers.concat(action.payload.customer)
        
        if (action?.payload?.saveToAsyncStorage) {
            storeData(STORE_CUSTOMER, JSON.stringify(customers))
        }
        returnVar = {
            ...state,
            customers: customers
        }

    } else if (action.type == UPDATE_CUSTOMER) {

        var customer = state.customers.filter((customer) => {
			return customer.id == action.payload.customer.id
		})[0]

        customer.firstName = action.payload.customer.firstName
        customer.lastName = action.payload.customer.lastName
        customer.region = action.payload.customer.region
        customer.status = action.payload.customer.status

        var allCustomer = state.customers.filter((customer) => {
			return customer.id != action.payload.customer.id
		})
        var listOfCustomers = allCustomer.concat(customer)

        if (action?.payload?.saveToAsyncStorage) {
            storeData(STORE_CUSTOMER, JSON.stringify(listOfCustomers))
        }

        returnVar = {
            ...state,
            customers: listOfCustomers
        }
    } else {
        returnVar = state;
    }
    return returnVar;
}