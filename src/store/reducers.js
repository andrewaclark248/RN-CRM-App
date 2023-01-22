//global imports
import { STORE_CUSTOMER, STORE_REGION } from './../features/services/index' //async action
import { storeData } from './../features/services/AsyncData'


//show alert reducer
import { SHOW_CREATED_CUSTOMER_ALERT } from './actions/showAlertAction.js'
const alertInitialState = {
	showCreatedCustomerAlert: false
}

export const showAlertReducer = (state = alertInitialState, action) => {
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



//async storage reducer
import { ON_ASYNC_STORAGE, OFF_ASYNC_STORAGE } from './actions/toggleAsyncStorage'
const asyncStorgaeInitialState = {
	asyncStorageToggle: false
}

export const asyncStorageReducer = (state = asyncStorgaeInitialState, action) => {
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



//add customer reducer
import { ADD_CUSTOMER, UPDATE_CUSTOMER, ASYNC_LOAD_CUSTOMERS } from './actions/addCustomer' //redux action
const addCustomerInitialState = {
	customers: []
}

export const addCustomer = (state = addCustomerInitialState, action) => {

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
    } else if (action.type == ASYNC_LOAD_CUSTOMERS) {
        returnVar = {
            ...state,
            customers: action.payload.asyncCustomers
        }
    } else {
        returnVar = state;
    }
    return returnVar;
}


//add/udpdate region
import { UPDATE_REGION } from './actions/updateRegion'
const regionInitialState = {
	region: null
}

export const updateRegion = (state = regionInitialState, action) => {

    let returnVar = null;
    if (action.type == UPDATE_REGION) {
        storeData(STORE_REGION, action.payload.region)
        returnVar = {
            ...state,
            region: action.payload.region
        }
    } else {
        returnVar = state;
    }
    return returnVar;
}



//current customer 
import { CURRENT_CUSTOMER } from './actions/currentCustomer.js'
const currentCustomerInitialState = {
	currentCustomer: null
}

export const currentCustomerReducer = (state = currentCustomerInitialState, action) => {

    let returnVar = null;
    if (action.type == CURRENT_CUSTOMER) {
        returnVar = {
            ...state,
            currentCustomer: action.payload.customer
        }
    } else {
        returnVar = state;
    }
    return returnVar;
}