import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/alert.component";
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import ConfirmButton from "../../components/forms/confirm-button";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";

type SendCodeProps = {
	setStep: (step: number) => void,
	email: string,
	setEmail: (email: string) => void
};

// Component for sending verification code to reset password
const SendCode = ({setStep, email, setEmail}: SendCodeProps) => {
	const { t } = useTranslation(); // Translation hook
	const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false}); // State for alert messages

	// Function to handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Preventing default form submission behavior
		if(email === '') {
				return setAlert({msg: t('forms.email_required'), error: true}); // Setting error alert message if email is empty
		}

		// Async function to send verification code
		async function sendEmail(username: string) {
			try {
				await Auth.forgotPassword(username); // Sending verification code using Amplify Auth
				setStep(2); // Setting step to 2 after successful submission
			} catch (error) {
				if(error instanceof Error) {
					console.log('Error:', error); // Logging error message
					setAlert({msg: `${error.message}`, error: true}); // Setting error alert message
				}
			}
		}
		sendEmail(email); // Calling sendEmail function with email as parameter
	};

	const { msg } = alert; // Destructuring alert message from alert state

	// JSX to render the send code form
	return (
		<>
			<TextWithBorders text={t('recover_pass.recover')} /> {/* Component to render text with borders */}
			<form 
				className="mt-4"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col">
					<LabelForm htmlFor="email" >{t('register.email_required')}</LabelForm> {/* Label for email input */}
					<InputForm
						name="email"
						type="email"
						placeholder={t('login.email')}
						value={email}
						onChange={e => setEmail(e.target.value)} // Input field for entering email
					/>
				</div>
				
				<ConfirmButton
					type="submit"
					textButton={t('recover_pass.continue')} // Button to continue
				/>

				<Link to='/iniciar-sesion' className="flex items-center mt-4"> {/* Link to sign-in page */}
					<p className="bg-[#1B2830] text-[14px] text-white tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.log_in')}</p>
				</Link>

				{msg && <Alert alert={alert} />} {/* Displaying alert message if exists */}
			</form>
		</>
	);
};

export default SendCode; // Exporting the SendCode component
