import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from 'redux/root-reducer';
import {rootSaga} from 'redux/root-saga';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const router = routerMiddleware(history);

export const store = configureStore({
    reducer: rootReducer(history),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [...getDefaultMiddleware(), sagaMiddleware, router]
});

sagaMiddleware.run(rootSaga);
