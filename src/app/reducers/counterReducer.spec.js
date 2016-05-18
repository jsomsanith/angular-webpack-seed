import counterReducer from './counterReducer';
import { INCREMENT, DECREMENT } from '.././constants/counterConstants';


describe('counterReducer', () => {
    it('reducer should increment state when receiving INCREMENT action.type', () => {
        expect(counterReducer(0, { type: INCREMENT })).toEqual(1);
    });

    it('reducer should decrement state when receiving DECREMENT action.type', () => {
        expect(counterReducer(1, { type: DECREMENT })).toEqual(0);
    });

    it('reducer should return state as it if no action.type of interest are passed', () => {
        expect(counterReducer(0, { type: 'STUFF' })).toEqual(0);
    });
});
