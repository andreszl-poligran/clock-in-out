import * as interfaces from '../interfaces';
import { RootState } from '../reducers';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';

export const signOut = () => {
	return async (_dispatch: Dispatch, _getState: () => RootState) => {
		const signOutResult = await Auth.signOut();
		localStorage.removeItem('token')
		localStorage.removeItem('iDtoken')
		return { signOutResult };
	};
};

export const actions = { };
export const functionalsActions = { signOut };
export type IAction = interfaces.redux.IActionUnion<typeof actions>

