import { INCREMENT } from '../constants/counterConstants';

export function increment() {
    return { type: INCREMENT };
}

export function asyncIncrement() {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    };
}

/**
 * TODO
 * Promise based action
 */

/**
 * TODO
 * Observable based action
 */

/**
 * TODO
 * Async action using angular http service
 */
