import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next'
import Alert from "../../components/alert.component"
import TextWithBorders from '../../components/auth/text-with-borders.component';
import InputForm from '../../components/forms/input-form.component';
import ConfirmButton from '../../components/forms/confirm-button';
import { useSignUpForm } from '../../reducers/sign-up-form.reducer';

export default () => {
	const { form, clearForm } = useSignUpForm()
	const { t } = useTranslation()
	const location = useLocation();
	const navigate = useNavigate();

	const [ email, setEmail ] = useState('')
	const [ code, setCode ] = useState('')
	const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false})

	useEffect(() => {
		const query = new URLSearchParams(location.search);
		const emailQuery = query.get('email');

		if(emailQuery) {
			setEmail(emailQuery)
		} else {
			setEmail(form.email)
		}
	}, [])

	const verifyAccount = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(code === '') {
			setAlert({msg:t('mail_confirmation.code_field'), error: true})
			return
		}

		async function confirmSignUp(username: string, code: string) {
			try {
				await Auth.confirmSignUp(username, code, { forceAliasCreation: false });
				clearForm()
				navigate('/iniciar-sesion')
			} catch (error) {
				if(error instanceof Error) {
					setAlert({msg: error.message, error: true})
					setTimeout(() => {
						setAlert({msg: '', error: false})
					}, 3000);
				}
			}
		}
		confirmSignUp(email, code)
	}

	const noCode = () => {
		async function resendConfirmationCode(username: string) {
			try {
				await Auth.resendSignUp(username);
				setAlert({msg: t('mail_confirmation.code_resent'), error: false})
				setTimeout(() => {
					setAlert({msg: '', error: false})
				}, 3000);
			} catch (err) {
				console.log('error resending code: ', err);
			}
		}
		resendConfirmationCode(email)
	}

	const { msg } = alert

	return (
			<>
			<TextWithBorders text={t('mail_confirmation.confirmation')} />
			<p className='text-center text-[#CDCDCD] mt-4'>{t('mail_confirmation.enter')} {email}</p>
			<form onSubmit={verifyAccount}>
				<InputForm
					name='code'
					type="text"
					placeholder={t('mail_confirmation.confirmation_code')}
					value={code}
					onChange={e => setCode(e.target.value)}
				/>

				<div>
					<ConfirmButton
						type='submit'
						textButton={t('mail_confirmation.verify')}
					/>
					<button 
						type='button'
						className='bg-gray-800 mt-4 border border-[#364752] text-[#CDCDCD] p-3 rounded-lg w-full text-center uppercase font-semibold tracking-widest'
						onClick={noCode}
					>
						<p>{t('mail_confirmation.havent')}</p>
					</button>
				</div>
			</form>

			{msg && <Alert alert={alert} />}
		</>
    )
}