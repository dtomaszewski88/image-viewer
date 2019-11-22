import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';

import AppContainer from './components/app.container';
import Fallback from './components/fallback';
import * as serviceWorker from './serviceWorker';
import {Provider, ReactReduxContext} from 'react-redux';
import {store, history} from './store';
import {ConnectedRouter} from 'connected-react-router';
import {Switch, Route} from 'react-router';

import {INDEX_PAGE, MAIN_PAGE} from './constants/url.constants';

ReactDOM.render(
    <Provider context={ReactReduxContext} store={store}>
        <ConnectedRouter context={ReactReduxContext} history={history}>
            <Switch>
                <Route component={AppContainer} path={INDEX_PAGE} exact />
                <Route component={AppContainer} path={MAIN_PAGE} exact />
                <Route component={Fallback} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
