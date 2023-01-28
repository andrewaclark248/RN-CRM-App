import { ADD_CUSTOMER, UPDATE_CUSTOMER }  from '../../store/actions/addCustomer'
import { call, put, takeEvery } from 'redux-saga/effects'
import { storeDataInAsyncStorage } from './../services/utils.js'

function* addCustomerSaga() {
    yield takeEvery(ADD_CUSTOMER, addCustomer)
}

function* addCustomer({type, payload}) {
    try {
        console.log("redux saga side effect")
        yield storeDataInAsyncStorage(customer)
    } catch (err) {
    }
}



export default addCustomerSaga
