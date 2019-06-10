import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    combineReducers,
    applyMiddleware,
    AnyAction
} from 'redux';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';
import {
    createRoutingMiddleware,
    RouterConfig,
    createRoutingReducer,
    RouterLocation
} from 'tmp-react-router';

// configuration
const history = createBrowserHistory();

const config: RouterConfig = {
    routes: {
        ROOT: '/',
        PAGE1: '/page1',
        PAGE2: '/page2/:id'
    }
};

// middleware
const routingMiddleware = createRoutingMiddleware(config, history);

// reducer
interface AppState {
    location: RouterLocation;
}

const rootReducer = combineReducers({
    location: createRoutingReducer(config, history.location)
});

// store
const store = createStore<AppState, AnyAction, {}, {}>(
    rootReducer,
    applyMiddleware(routingMiddleware)
);

class TestApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>test</div>
            </Provider>
        );
    }
}

ReactDOM.render(<TestApplication />, document.body);
