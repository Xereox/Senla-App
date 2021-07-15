import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleWare from 'redux-thunk'
import categoryReducer from './category-reducer';
import detailsReducer from './details-reducer';
import paymentsReducer from './payments-reducer';
import settingsReducer from './settings-reducer';
import mainReducer from "./main-reducer";

let reducers = combineReducers({
    main: mainReducer,
    payments: paymentsReducer,
    category: categoryReducer,
    details: detailsReducer,
    settings: settingsReducer
})

type ReducerType = typeof reducers
export type GlobalStoreType = ReturnType<ReducerType>

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
