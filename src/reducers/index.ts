import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import signUpForm from './sign-up-form.reducer';
import menu from './menu.reducer';

const reducers = combineReducers({
	signUpForm,
	menu,
});

export default reducers;
export const store = configureStore({ reducer: reducers, });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();