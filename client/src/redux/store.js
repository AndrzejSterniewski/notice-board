import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import adsReducer from './adsRedux';
import userReducer from './userRedux';
import searchStringReducer from './searchStringRedux';

const subreducers = {
    ads: adsReducer,
    user: userReducer,
    searchString: searchStringReducer
}

const reducer = combineReducers(subreducers);

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;