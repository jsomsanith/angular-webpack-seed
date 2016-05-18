import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

export default function configureStore(initialState) {
    const store = compose(
        applyMiddleware(thunk)
    )(createStore)(rootReducer, initialState);
    return store;
}
