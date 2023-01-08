import { combineReducers } from 'redux';
import { updateRegion } from './AddUpdateRegion'

const rootReducer = combineReducers({
	regionReducer: updateRegion
})

export default rootReducer;