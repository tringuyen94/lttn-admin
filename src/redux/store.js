import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";
import rootReducer from './reducers/root.reducer';

const initialState = {}
const middlewares = [thunk]
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)))
export default store