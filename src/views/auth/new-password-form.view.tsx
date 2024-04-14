import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../../components/alert.component"
import { Auth } from 'aws-amplify';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';
import ConfirmButton from "../../components/forms/confirm-button";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";

type NewPasswordProps = {
    setStep: (step: number) => void,
    email: string
    setEmail: (email: string) => void
}

const NewPassword = ({ setStep, email }: NewPasswordProps) => {
	const { t } = useTranslation()
	const navigate = useNavigate();

	const [ code, setCode ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ showPassword, setShowPassword ] = useState(false)
	const [ alert, setAlert ] = useState<AlertType>({ msg: '', error: false })

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(email === '') {
			console.log('El campo email es obligatorio')
			return
		}

		async function newPassword(username: string, code: string, password: string) {
			try {
				await Auth.forgotPasswordSubmit(username, code, password);
				setStep(1)
				navigate('/iniciar-sesion')
			} catch (error) {
				if(error instanceof Error) {
					console.log('Error:',error.message.split(':')[0]);
					setAlert({msg: `${t(`forms.${error.message.split(':')[0]}`)}`, error: true})
				}
			}
		}
		newPassword(email, code, password)
	}

	const { msg } = alert

  return (
    <>
        <TextWithBorders text={t('recover_pass.recover')} />
        <p className='text-center text-[#CDCDCD] mt-4'>{t('recover_pass.6_digit')} {email}</p>
        <form className="mt-4" onSubmit={handleSubmit} >
					<div className="flex flex-col">
						<LabelForm htmlFor="code" >{t('recover_pass.code_required')}</LabelForm>
						<InputForm
							type="text"
							name='code'
							placeholder={t('recover_pass.code')}
							value={code}
							onChange={e => setCode(e.target.value)}
						/>
					</div>

					<div className="mt-4">
						<LabelForm  htmlFor="password" className="text-[#CDCDCD] text-[14px]">{t('recover_pass.new_pass_req')}</LabelForm>
						<div className="relative">
							<InputForm
								type={`${showPassword ? 'text' : 'password'}`}
								name='password'
								className="bg-transparent p-3 rounded-lg border border-[#364752] text-white w-full placeholder:text-[#686868]"
								placeholder={t('recover_pass.new_pass')}
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />}
							</div>
						</div>
					</div>
					
					<ConfirmButton
						type="submit"
						textButton={t('recover_pass.save_new_pass')}
					/>

					<Link to='/iniciar-sesion' className="flex items-center mt-4">
						<p className="bg-[#1B2830] text-[14px] text-white tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.log_in')}</p>
					</Link>

					{msg && <Alert alert={alert} />}
			</form>
    </>
  )
}

export default NewPassword;