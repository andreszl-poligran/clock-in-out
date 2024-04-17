import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../components/alert.component";
import { Auth } from 'aws-amplify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ConfirmButton from "../../components/forms/confirm-button";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";

type NewPasswordProps = {
	setStep: (step: number) => void,
	email: string,
	setEmail: (email: string) => void
};

// Component for setting a new password after resetting it
const NewPassword = ({ setStep, email }: NewPasswordProps) => {
	const { t } = useTranslation(); // Translation hook
	const navigate = useNavigate(); // Navigation hook

	// State variables
	const [code, setCode] = useState(''); // State for verification code
	const [password, setPassword] = useState(''); // State for new password
	const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
	const [alert, setAlert] = useState<AlertType>({ msg: '', error: false }); // State for alert messages

	// Function to handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Preventing default form submission behavior
		if (email === '') {
			console.log('El campo email es obligatorio'); // Log message if email is empty
			return;
		}

		// Async function to set new password
		async function newPassword(username: string, code: string, password: string) {
			try {
				await Auth.forgotPasswordSubmit(username, code, password); // Setting new password using Amplify Auth
				setStep(1); // Setting step to 1
				navigate('/iniciar-sesion'); // Redirecting to sign-in page after successful password change
			} catch (error) {
				if (error instanceof Error) {
					console.log('Error:',error.message.split(':')[0]); // Logging error message
					setAlert({msg: `${t(`forms.${error.message.split(':')[0]}`)}`, error: true}); // Setting error alert message
				}
			}
		}
		newPassword(email, code, password); // Calling newPassword function with email, verification code, and new password
	};

	const { msg } = alert; // Destructuring alert message from alert state

	// JSX to render the new password form
	return (
		<>
			<TextWithBorders text={t('recover_pass.recover')} /> {/* Component to render text with borders */}
			<p className='text-center text-[#CDCDCD] mt-4'>{t('recover_pass.6_digit')} {email}</p> {/* Text to display user email */}
			<form className="mt-4" onSubmit={handleSubmit} > {/* Form for setting new password */}
				<div className="flex flex-col">
					<LabelForm htmlFor="code" >{t('recover_pass.code_required')}</LabelForm> {/* Label for verification code */}
					<InputForm
						type="text"
						name='code'
						placeholder={t('recover_pass.code')}
						value={code}
						onChange={e => setCode(e.target.value)} // Input field for entering verification code
					/>
				</div>

				<div className="mt-4">
					<LabelForm  htmlFor="password" className="text-[#CDCDCD] text-[14px]">{t('recover_pass.new_pass_req')}</LabelForm> {/* Label for new password */}
					<div className="relative">
						<InputForm
							type={`${showPassword ? 'text' : 'password'}`}
							name='password'
							className="bg-transparent p-3 rounded-lg border border-[#364752] text-white w-full placeholder:text-[#686868]"
							placeholder={t('recover_pass.new_pass')}
							value={password}
							onChange={e => setPassword(e.target.value)} // Input field for entering new password
						/>
						<div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />} {/* Button to toggle password visibility */}
						</div>
					</div>
				</div>
				
				<ConfirmButton
					type="submit"
					textButton={t('recover_pass.save_new_pass')} // Button to save new password
				/>

				<Link to='/iniciar-sesion' className="flex items-center mt-4">
					<p className="bg-[#1B2830] text-[14px] text-white tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.log_in')}</p> {/* Link to sign-in page */}
				</Link>

				{msg && <Alert alert={alert} />} {/* Displaying alert message if exists */}
			</form>
		</>
	);
};

export default NewPassword; // Exporting the NewPassword component
