import { combineReducers } from 'redux';
import { updateRegion } from './AddUpdateRegion'
import { addCustomer } from './AddCustomer'
import { asyncStorageReducer } from './AsyncStorageReducer'
import { showAlertReducer } from './ShowAlert'



const rootReducer = combineReducers({
	regionReducer: updateRegion,
	customerReducer: addCustomer,
	asyncStorageReducer: asyncStorageReducer,
	showAlertReducer: showAlertReducer
})

export default rootReducer;