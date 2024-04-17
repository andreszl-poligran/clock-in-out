import { IAction } from '../actions/sign-up-form.actions'; // Import action interface for sign-up form
import actions from '../actions'; // Import actions for sign-up form
import * as interfaces from '../interfaces'; // Import interfaces
import * as constants from '../constants'; // Import constants
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from react-redux
import { AppDispatch, RootState } from '.'; // Import types

// Reducer function for sign-up form state
export default (
    state: interfaces.signup.IState = interfaces.signup.initialState,
    action: IAction
): interfaces.signup.IState => {
    return {
        ...state,
        // Update state based on action type and payload
        ...(action.type === constants.signup.CLEAR_FORM && interfaces.signup.initialState),
        ...(action.type === constants.signup.UPDATE_FORM && { form: action.payload }),
        ...(action.type === constants.signup.UPDATE_STEP && { step: action.payload }),
    };
};

// Define type for dispatchers
export type Dispatchers = {
    [K in keyof typeof actions.signUpForm.actions]: (
        ...args: Parameters<typeof actions.signUpForm.actions[K]>
    ) => ReturnType<typeof actions.signUpForm.actions[K]>;
};

// Custom hook for sign-up form state management
export const useSignUpForm = () => {
    // Get sign-up form attributes from Redux store
    const attributes = useSelector((state: RootState) => state.signUpForm);
    // Get dispatch function from Redux store
    const dispatch = useDispatch<AppDispatch>();

    // Initialize dispatchers object
    const dispatchers: Dispatchers = {} as Dispatchers;

    // Populate dispatchers object with actions
    Object.keys(actions.signUpForm.actions).forEach((actionName) => {
        const action = (actions.signUpForm.actions as any)[actionName];
        dispatchers[actionName as keyof Dispatchers] = (...args: Parameters<typeof action>) => {
            // Dispatch action with arguments
            return dispatch(action(...args)) as ReturnType<typeof action>;
        };
    });

    // Return sign-up form attributes, dispatchers, and functional actions
    return { ...attributes, ...dispatchers, ...actions.signUpForm.functionalsActions };
};
