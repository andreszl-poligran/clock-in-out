import { IAction } from '../actions/menu.actions'; // Import action interface for menu
import actions from '../actions'; // Import actions for menu
import * as interfaces from '../interfaces'; // Import interfaces
import * as constants from '../constants'; // Import constants
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from react-redux
import { AppDispatch, RootState } from '.'; // Import types

// Reducer function for menu state
export default (state: interfaces.menu.IState = interfaces.menu.initialState, action: IAction): interfaces.menu.IState => {
	return {
		...state,
		// Update state based on action type and payload
		...(action.type === constants.menu.UPDATE_USERNAME && { username: action.payload }),
		...(action.type === constants.menu.UPDATE_ADMIN && { admin: action.payload }),
		...(action.type === constants.menu.UPDATE_MENU_ACTIVE && { active: action.payload }),
	};
};

// Define type for dispatchers
export type Dispatchers = {
	[K in keyof typeof actions.menu.actions]: (
		...args: Parameters<typeof actions.menu.actions[K]>
	) => ReturnType<typeof actions.menu.actions[K]>;
};

// Custom hook for menu state management
export const useMenu = () => {
	// Get menu attributes from Redux store
	const attributes = useSelector((state: RootState) => state.menu);
	// Get dispatch function from Redux store
	const dispatch = useDispatch<AppDispatch>();
	// Initialize dispatchers object
	const dispatchers: Dispatchers = {} as Dispatchers;

	// Populate dispatchers object with actions
	Object.keys(actions.menu.actions).forEach((actionName) => {
		const action = (actions.menu.actions as any)[actionName];
		dispatchers[actionName as keyof Dispatchers] = (...args) => {
			// Dispatch action with arguments
			return dispatch(action(...args)) as ReturnType<typeof action>;
		};
	});

	// Return menu attributes, dispatchers, and functional actions
	return { ...attributes, ...dispatchers, ...actions.menu.functionalsActions };
};
