import { UPDATE_REGION } from '../actions/updateRegion'

const initialState = {
	currentUser: "none"
}

export const updateRegion = (state = initialState, action) => {

	switch(action.type){
		case UPDATE_REGION: 
			return {
				...state,
				region: action.payload.region
			}
		default: return state
	}
}