import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import alertsReducer, { alertsSlice } from './alertsSlice';


const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;