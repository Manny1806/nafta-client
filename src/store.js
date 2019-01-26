import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import proReducers from './reducers/home/pro-reducers'
import conReducers from './reducers/home/con-reducers'
import congressReducers from './reducers/home/congress-reducers'
import authReducer from './reducers/auth'
import modal from './reducers/home/modal'
import {setAuthToken, refreshAuthToken} from './actions/auth';
import {loadAuthToken} from './local-storage';


const reducers = combineReducers({proReducers, conReducers, congressReducers, modal, auth: authReducer});
const store = createStore(reducers, applyMiddleware(thunk));

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;