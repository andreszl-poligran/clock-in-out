import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { store } from '../reducers';

export namespace redux {
	export interface IStringMap<T> {
		[key: string]: T
	}

	export type IAnyFunction = (...args: any[]) => any;
	export type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

	export type Store = ReturnType<typeof store.getState>;

	export type IThunkAction<ReturnType = any> =
		ThunkAction<
			ReturnType,
			Store,
			unknown,
			Action<string>
		>;
}

export default redux;
