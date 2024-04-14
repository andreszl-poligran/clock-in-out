export namespace signup {
	export interface IState {
		form: {
			email: string,
			name: string,
			lastName: string,
			password: string,
			confirmPassword: string,
		},
		step: number,
	}

	export const initialState: IState = {
		form: {
			email: '',
			name: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},
		step: 1,
	};
}

