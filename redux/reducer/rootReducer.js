import { combineReducers } from 'redux';
import { updateRegion } from './AddUpdateRegion'

const rootReducer = combineReducers({
	region: updateRegion
})

export default rootReducer;