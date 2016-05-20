/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */
import {
    provide,
} from '@angular/core';
import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import {
    BaseRequestOptions,
    Response,
    ResponseOptions,
    Http,
} from '@angular/http';
import {
    MockBackend,
    MockConnection,
} from '@angular/http/testing';

import UserInjectableActions from './userActions';

import {
    LOGIN_USER_PENDING,
    LOGIN_USER_ERROR,
} from '../constants/userConstants';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userAction', () => {
    let actions;

    beforeEachProviders(() => [
        UserInjectableActions,
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => (new Http(backend, defaultOptions)
            ),
            deps: [MockBackend, BaseRequestOptions],
        }),
    ]);

    beforeEach(inject([UserInjectableActions, MockBackend], (userInjectableActions, backend) => {
        const baseResponse = new Response(new ResponseOptions({ body: 'got response' }));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
        actions = userInjectableActions;
    }));

    it('expect the action creator to dispatch failed post', () => {
        const expectedActions = [{ type: LOGIN_USER_PENDING }, { type: LOGIN_USER_ERROR, error: 'JSON Parse error: Unexpected identifier "got"' }];
        const store = mockStore({});
        store.dispatch(actions.loginUser());
        expect(store.getActions()).toEqual(expectedActions);
        // setTimeout(() => {
        //     expect(store.getActions()).toEqual(expectedActions);
        //     done();
        // }, 0);
    });
});
