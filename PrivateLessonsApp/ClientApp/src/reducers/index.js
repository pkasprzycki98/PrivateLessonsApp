import counterReducer from './counter';
import loggedReducer from './isLogged';
import dataReducer from './DataState';
import {combineReducers} from 'redux';

const allReducer = combineReducers({
    loggedReducer,
    counterReducer,
    dataReducer
});
export default allReducer;