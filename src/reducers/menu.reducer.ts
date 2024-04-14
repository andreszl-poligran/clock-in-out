import { IAction } from '../actions/menu.actions';
import actions from '../actions';
import * as interfaces from '../interfaces';
import * as constants from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '.';

export default ( state: interfaces.menu.IState = interfaces.menu.initialState, action: IAction ): interfaces.menu.IState => {
	return {
		...state,
		...(action.type === constants.menu.UPDATE_USERNAME && { username: action.payload }),
		...(action.type === constants.menu.UPDATE_ADMIN && { admin: action.payload }),
		...(action.type === constants.menu.UPDATE_MENU_ACTIVE && { active: action.payload }),
	};
};


export type Dispatchers = {
	[K in keyof typeof actions.menu.actions]: (
		...args: Parameters<typeof actions.menu.actions[K]>
	) => ReturnType<typeof actions.menu.actions[K]>;
};

export const useMenu = () => {
	const attributes = useSelector((state: RootState) => state.menu);
	const dispatch = useDispatch<AppDispatch>();
	const dispatchers: Dispatchers = {} as Dispatchers;

	Object.keys(actions.menu.actions).forEach((actionName) => {
		const action =( actions.menu.actions as any)[actionName];
		dispatchers[actionName as keyof Dispatchers] = (...args) => {
			return dispatch(action(...args)) as ReturnType<typeof action>;
		};
	});
    
	return { ...attributes, ...dispatchers, ...actions.menu.functionalsActions };
};
