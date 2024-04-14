
import * as interfaces from '../interfaces';
import * as constants from '../constants';


export function updateForm(form: interfaces.signup.IState['form']) {
	return {
		type: constants.signup.UPDATE_FORM,
		payload: form,
	} as const;
}

export function updateStep(step: number) {
	return {
		type: constants.signup.UPDATE_STEP,
		payload: step,
	} as const;
}

export function clearForm() {
	return {
		type: constants.signup.CLEAR_FORM,
	} as const;
}

export const actions = { updateForm, updateStep, clearForm };
export const functionalsActions = { };
export type IAction = interfaces.redux.IActionUnion<typeof actions>

