import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {
    LOGIN_USER_PENDING, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
} from '../constants/userConstants';

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
        return (dispatch) => {
            dispatch({ type: LOGIN_USER_PENDING });
            return this.http.post('/auth/login', credentials)
                .map((response) => response.json())
                .subscribe(
                    response => dispatch({ type: LOGIN_USER_SUCCESS, response }),
                    error => {
                        // TODO: need some sexyness
                        const status = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                        const errMsg = error.message ? error.message : status;
                        dispatch({ type: LOGIN_USER_ERROR, error: errMsg });
                    }
                );
        };
    }
}
