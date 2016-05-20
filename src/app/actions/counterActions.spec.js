/* ============================================================================

 Copyright (C) 2006-2016 Talend Inc. - www.talend.com

 This source code is available under agreement available at
 https:github.com/Talend/data-prep/blob/master/LICENSE

 You should have received a copy of the agreement
 along with this program; if not, write to Talend SA
 9 rue Pages 92150 Suresnes, France

 ============================================================================ */

import { increment, asyncIncrement, promiseAsyncIncrement } from './counterActions';
import { INCREMENT, INCREMENT_REQUEST } from '../constants/counterConstants';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const expectedIncrementAction = { type: INCREMENT };

describe('counterAction', () => {
    /**
     * Testing a classical synchronous action creator
     */
    it('increment action creator should return a proper increment action', () => {
        expect(increment()).toEqual(expectedIncrementAction);
    });

    /**
     * Testing an asynchronous action creator (beware they can fire multiple action)
     */
    it('asyncIncrement action creator should dispatch a proper increment action', (done) => {
        const store = mockStore({});
        /**
         * FIXME: Should be the right way to test async action when
         * https://github.com/arnaudbenard/redux-mock-store/pull/38
         * will be merged in redux-mock-store
         */
        // store.subscribe(() => {
        //     expect(store.getActions()[0]).toEqual(expectedIncrementAction);
        //     done();
        // });
        store.dispatch(asyncIncrement());
        // FIXME: not a big fan to set a specific timeout...
        setTimeout(() => {
            const [action] = store.getActions();
            expect(action).not.toEqual({ type: 'TEST' });
            expect(action).toEqual(expectedIncrementAction);
            done();
        }, 1100);
    });

    /**
     * Testing an asynchronous action creator baked by a promise
     */
    it('asyncPromiseIncrement should dispatch a proper action increment', (done) => {
        const expectedActions = [{ type: INCREMENT_REQUEST }, expectedIncrementAction];
        const store = mockStore({});
        return store.dispatch(promiseAsyncIncrement())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
                done();
            });
    });
});
