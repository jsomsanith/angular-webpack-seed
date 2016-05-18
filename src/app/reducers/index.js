import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import anotherReducer from './anotherReducer';

export default combineReducers({
    counter: counterReducer,
    anotherReducer,
});
