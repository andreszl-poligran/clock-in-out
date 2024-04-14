import { IAction} from '../actions/sign-up-form.actions';
import actions from '../actions';
import * as interfaces from '../interfaces';
import * as constants from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '.';

export default (
    state: interfaces.signup.IState = interfaces.signup.initialState,
    action: IAction
): interfaces.signup.IState => {
    return {
        ...state,
        ...(action.type === constants.signup.CLEAR_FORM && interfaces.signup.initialState),
        ...(action.type === constants.signup.UPDATE_FORM && { form: action.payload }),
        ...(action.type === constants.signup.UPDATE_STEP && { step: action.payload }),
    };
};


export type Dispatchers = {
    [K in keyof typeof actions.signUpForm.actions]: (
        ...args: Parameters<typeof actions.signUpForm.actions[K]>
    ) => ReturnType<typeof actions.signUpForm.actions[K]>;
};


export const useSignUpForm = () => {
    const attributes = useSelector((state: RootState) => state.signUpForm);
    const dispatch = useDispatch<AppDispatch>();

    const dispatchers: Dispatchers = {} as Dispatchers;

    Object.keys(actions.signUpForm.actions).forEach((actionName) => {
        const action =( actions.signUpForm.actions as any)[actionName];
        dispatchers[actionName as keyof Dispatchers] = (...args: Parameters<typeof action>) => {
            return dispatch(action(...args)) as ReturnType<typeof action>;
        };
    });

	return { ...attributes, ...dispatchers, ...actions.signUpForm.functionalsActions };
};
