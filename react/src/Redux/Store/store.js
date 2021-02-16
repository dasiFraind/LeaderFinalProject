import { createStore, combineReducers, applyMiddleware } from 'redux';
import { toUpperCaseFirstLetter } from './MiddleWares/crud'
import taskReducer from './Reducers/Task';
import userReducer from './Reducers/User';
const reducer = combineReducers({ taskReducer, userReducer });
const store = createStore(reducer, applyMiddleware(toUpperCaseFirstLetter));
window.store = store;
export default store;
