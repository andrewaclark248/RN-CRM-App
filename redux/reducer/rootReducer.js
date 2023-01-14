import { combineReducers } from 'redux';
import { updateRegion } from './AddUpdateRegion'
import { addCustomer } from './AddCustomer'
import { asyncStorageReducer } from './AsyncStorageReducer'



const rootReducer = combineReducers({
	regionReducer: updateRegion,
	customerReducer: addCustomer,
	asyncStorageReducer: asyncStorageReducer
})

export default rootReducer;