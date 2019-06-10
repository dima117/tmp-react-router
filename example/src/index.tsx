import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    combineReducers,
    applyMiddleware,
    AnyAction
} from 'redux';
import { Provider, connect } from 'react-redux';

import { createBrowserHistory } from 'history';
import {
    createRoutingMiddleware,
    RouterConfig,
    createRoutingReducer,
    RouterLocation,
    Link,
    AdvancedLink,
    RouterContext
} from '../tmp-react-router';

import { composeWithDevTools } from 'redux-devtools-extension';

// configuration
const history = createBrowserHistory();

const config: RouterConfig = { // todo: порядок ссылок
    routes: {
        PAGE1: '/page1',
        PAGE2: '/page2/:id',
        ROOT: '/',
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
    composeWithDevTools(applyMiddleware(routingMiddleware))
);

interface XxxProps {
    location: RouterLocation;
}

class Xxx extends React.Component<XxxProps> {
    render() {
        const {key, params} = this.props.location;
        let content = <div>404</div>;

        switch (key) {
            case 'ROOT':
                content = <div>ROOT</div>;
                break;
            case 'PAGE1':
                content = <div>PAGE1</div>;
                break;
            case 'PAGE2':
                content = <div>PAGE2, id: {params.id}</div>;
                break;
        }

        return <>
            <header>
                <Link href='/'>root</Link> | 
                <Link href='/page1'>page1</Link> | 
                <Link href='/page2/test'>page2</Link> |
                <AdvancedLink routeKey='PAGE2' params={{ id: 'moo' }} >page22</AdvancedLink>
            </header>
            {content}
        </>;
    }
}

function mapStateToProps(state: AppState): XxxProps {
    return {
        location: state.location
    };
}

const ConnectedXxx = connect<XxxProps, {}, {}, AppState>(mapStateToProps)(Xxx);

class TestApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RouterContext.Provider value={{ config }}>
                    <ConnectedXxx />
                </RouterContext.Provider>
            </Provider>
        );
    }
}

ReactDOM.render(<TestApplication />, document.getElementById('root'));
