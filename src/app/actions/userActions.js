import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../constants/userConstants';

/**
 * Injectable action classe
 * demonstrating how to use angular injectable service into action creators
 */
@Injectable()
export default class UserInjectableActions {
    constructor(@Inject(Http) http) {
        this.http = http;
    }

    loginUser(credentials) {
        return (dispatch, getState) => {
            dispatch({ type: LOGIN_USER_PENDING });

            this.http.post('/auth/login', credentials)
                .toPromise()
                .then(response => dispatch({ type: LOGIN_USER_SUCCESS, payload: response.json() }))
                .catch(error => dispatch({ type: LOGIN_USER_ERROR, payload: error, error: true }));
        };
    }
}
