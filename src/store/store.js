import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga.js'

const sagaMiddleware = createSagaMiddleware()


//const store = createStore(rootReducer);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)


export default store;