import { combineReducers } from 'redux'; // Import combineReducers function from Redux
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore function from Redux Toolkit
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'; // Import hooks from react-redux

import signUpForm from './sign-up-form.reducer'; // Import reducer for sign-up form
import menu from './menu.reducer'; // Import reducer for menu

// Combine multiple reducers into a single reducer
const reducers = combineReducers({
	signUpForm,
	menu,
});

// Export the combined reducer
export default reducers;

// Configure and export the Redux store using reducers
export const store = configureStore({ reducer: reducers });

// Define the type for the root state of the Redux store
export type RootState = ReturnType<typeof store.getState>;

// Define the type for the dispatch function of the Redux store
export type AppDispatch = typeof store.dispatch;

// Define a custom hook for selecting state from the Redux store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Define a custom hook for accessing the dispatch function of the Redux store
export const useAppDispatch = () => useDispatch<AppDispatch>();
