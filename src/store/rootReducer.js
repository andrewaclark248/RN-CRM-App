import { combineReducers } from 'redux';
import { updateRegion, addCustomer, showAlertReducer, asyncStorageReducer, currentCustomerReducer } from './reducers.js'

const reducer = combineReducers({
	regionReducer: updateRegion,
	customerReducer: addCustomer,
	asyncStorageReducer: asyncStorageReducer,
	showAlertReducer: showAlertReducer,
	currentCustomerReducer: currentCustomerReducer
})

export default reducer;