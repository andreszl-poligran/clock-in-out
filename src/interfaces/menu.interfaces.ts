

export namespace menu {
	export interface IState {
		username: string,
		admin: boolean,
		active: boolean,
	}

	export const initialState: IState = {
		username: '',
		admin: false,
		active: false,
	};
}



