import { combineReducers } from 'redux';
import { updateRegion } from './AddUpdateRegion'
import { addCustomer } from './AddCustomer'

const rootReducer = combineReducers({
	regionReducer: updateRegion,
	customerReducer: addCustomer
})

export default rootReducer;