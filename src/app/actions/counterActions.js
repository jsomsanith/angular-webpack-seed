/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

import { INCREMENT, INCREMENT_REQUEST } from '../constants/counterConstants';

/**
 * synchronous action creator AKA classic one
 */
export function increment() {
    return { type: INCREMENT };
}

/**
 * Asynchronous action creator
 */
export function asyncIncrement() {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    };
}


function incrementRequest() {
    return {
        type: INCREMENT_REQUEST,
    };
}

/**
 * Asynchronous promise based action creator
 */
export function promiseAsyncIncrement() {
    return dispatch => {
        dispatch(incrementRequest());
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('OK');
            }, 1000);
        }).then(() => {
            dispatch(increment());
        });
    };
}
