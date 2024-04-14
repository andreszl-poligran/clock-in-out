
import * as interfaces from '../interfaces';
import * as constants from '../constants';

export function updateUserName(username: string) {
	return {
		type: constants.menu.UPDATE_USERNAME,
		payload: username,
	} as const;
}

export function updateAdmin(is_admin: boolean) {
	return {
		type: constants.menu.UPDATE_ADMIN,
		payload: is_admin,
	} as const;
}

export function updateMenuActive(active: boolean) {
	return {
		type: constants.menu.UPDATE_MENU_ACTIVE,
		payload: active,
	} as const;
}

export const actions = { updateUserName, updateAdmin, updateMenuActive };
export const functionalsActions = { };
export type IAction = interfaces.redux.IActionUnion<typeof actions>

