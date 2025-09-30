import { combineReducers, configureStore } from "@reduxjs/toolkit";

import vacanciesReducer from "../../app/redux/reducers/vacanciesSlice";

const rootReducer = combineReducers({ vacanciesReducer });

export const setupStore = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
