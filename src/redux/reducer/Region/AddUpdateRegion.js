import { UPDATE_REGION } from '../../actions/updateRegion'
import { storeData } from '../../../async_storage_data/AsyncData'
import { STORE_REGION } from '../../../async_storage_data/index'


const initialState = {
	region: null
}

export const updateRegion = (state = initialState, action) => {

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