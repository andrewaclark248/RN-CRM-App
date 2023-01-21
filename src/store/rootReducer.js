import { combineReducers } from 'redux';
import { updateRegion, addCustomer, showAlertReducer, asyncStorageReducer } from './reducers.js'

const rootReducer = combineReducers({
	regionReducer: updateRegion,
	customerReducer: addCustomer,
	asyncStorageReducer: asyncStorageReducer,
	showAlertReducer: showAlertReducer
})

export default rootReducer;