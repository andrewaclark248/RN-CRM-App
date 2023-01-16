import { combineReducers } from 'redux';
import { updateRegion } from './Region/AddUpdateRegion'
import { addCustomer } from './Customer/AddCustomer'
import { asyncStorageReducer } from './AsyncStorage/AsyncStorageReducer'
import { showAlertReducer } from './Alert/ShowAlert'



const rootReducer = combineReducers({
	regionReducer: updateRegion,
	customerReducer: addCustomer,
	asyncStorageReducer: asyncStorageReducer,
	showAlertReducer: showAlertReducer
})

export default rootReducer;