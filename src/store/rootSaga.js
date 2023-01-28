import { all } from 'redux-saga/effects'
import addCustomerSaga from './../features/sagas/addCustomerSaga.js'

export function* rootSaga() {
    yield all([
        addCustomerSaga()
    ])
}