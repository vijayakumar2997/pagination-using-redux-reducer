import { combineReducers } from 'redux';
import { beerReducer } from './beerSlice';

const Reducers = combineReducers({
    beerReducer
})
//export type ApplicationState = ReturnType<typeof Reducers>;

export default Reducers;