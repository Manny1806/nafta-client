import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import proReducers from './reducers/home/pro-reducers'
import conReducers from './reducers/home/con-reducers'
import congressReducers from './reducers/home/congress-reducers'

const reducers = combineReducers({proReducers, conReducers});
const store = createStore(reducers, applyMiddleware(thunk));

export default store;