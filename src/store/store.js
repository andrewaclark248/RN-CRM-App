import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga.js'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

//const sagaMiddleware = createSagaMiddleware()
let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

//const store = createStore(rootReducer);

//const store = createStore(
//    rootReducer,
//    composeWithDevTools(
//        applyMiddleware(sagaMiddleware)
//    )
//)

const store = configureStore({
    reducer,
    middleware
  })

sagaMiddleware.run(rootSaga)


export default store;