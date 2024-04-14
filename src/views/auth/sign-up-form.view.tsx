import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import ConfirmButton from "../../components/forms/confirm-button";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import { FaEye, FaEyeSlash, FaRegQuestionCircle } from 'react-icons/fa'
import { z } from "zod"
import { signUpSchema } from "../../form-schemas/auth/sign-up.schema";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "../../components/alert.component";
import { useSignUpForm } from "../../reducers/sign-up-form.reducer";


type ISignUp = z.infer<typeof signUpSchema>

export default () => {
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<ISignUp>({ resolver: zodResolver(signUpSchema) });
    const { form, updateForm, updateStep, clearForm } = useSignUpForm()
    const { t } = useTranslation()
		
    const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false})
    const [ loading, setLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)

    useEffect(() => {
			setValue('email', form.email || '');
			setValue('name', form.name || '')
			setValue('lastName', form.lastName || '')
			setValue('password', form.password || '');
			setValue('confirmPassword', form.confirmPassword || '');
    }, [form, setValue])

    const onSubmit = (data: ISignUp) => {
		const { email, password, confirmPassword, name, lastName } = data

		updateForm({ email, name, lastName, password, confirmPassword })
			async function signUp(email: string, password: string, name: string, last_name: string){
				if(form.email) {
					try {
						setLoading(true)
						await Auth.signUp({ username: email, password, attributes: { given_name: name, family_name: last_name, name: `${name} ${last_name}` } });
						clearForm()
						form.email = email;
						updateForm({ ...form })
						setLoading(false)
						updateStep(2)
					} catch (error) {
						setLoading(false)
						if(error instanceof Error) {
							setAlert({msg: error.message, error: true})
							console.log(error)
						}
					}
				}
			}
			signUp(form.email, form.password, form.name, form.lastName)
    }

    const { msg } = alert

	return (
		<>
			<TextWithBorders text={t('register.general_information')} />
			<form className="mt-4" onSubmit={handleSubmit(onSubmit)} >
				<div className="md:flex md:flex-row md:gap-3">
					<div className="flex flex-col md:w-full">
						<LabelForm htmlFor="email">{t('register.email_required')}</LabelForm>
						<InputForm
							{...register('email')}
							name="email"
							type="email"
							placeholder={t('register.email_required')}
							error={errors.email}
						/>
					</div>
				</div>
				<div className="flex flex-col md:w-full mt-4">
					<LabelForm htmlFor="name">{t('personal.name_req')}</LabelForm>
					<InputForm
						{...register('name')}
						type="text"
						name={'name'}
						placeholder={t('personal.name')}
						error={errors.name}
					/>
				</div>

				<div className="flex flex-col md:w-full mt-4">
					<LabelForm htmlFor="lastName">{t('personal.last_name_req')}</LabelForm>
					<InputForm
						{...register('lastName')}
						type="text"
						name={'lastName'}
						placeholder={t('personal.last_name')}
						error={errors.lastName}
					/>
				</div>

				<div className="md:flex md:flex-row md:gap-3">
					<div className="flex flex-col mt-2 md:w-full">
						<div className="flex items-center gap-2">
							<LabelForm htmlFor="password">{t('register.pass_req')}</LabelForm>
							<div className="relative group z-10 mt-[2px]">
								<FaRegQuestionCircle className="text-[#CDCDCD]" />
								<div className="absolute hidden group-hover:block left-4 -top-16 bg-[#121A1F] border border-gray-400 shadow-md rounded-md p-6">
									<p className="text-[16px] text-[#9A9A9A] w-[200px]">{t('register.pass_must')}</p>
								</div>
							</div>
						</div>
						<div className="relative">
							<InputForm
								{...register('password')}
								type={`${showPassword ? 'text' : 'password'}`}
								name={'password'}
								placeholder={t('login.pass')}
								error={errors.password}
							/>
							<div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />}
							</div>
						</div>
					</div>

					<div className="flex flex-col mt-2 md:w-full">
						<LabelForm htmlFor="confirmPassword">{t('register.pass_conf')}</LabelForm>
						<div className="relative">
							<InputForm
								{...register('confirmPassword')}
								type={`${showConfirmPassword ? 'text' : 'password'}`}
								name={'confirmPassword'}
								placeholder={t('register.pass_con')}
								error={errors.confirmPassword}
							/>
							<div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
								{showConfirmPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />}
							</div>
						</div>
					</div>
				</div>

				<ConfirmButton
					type="submit"
					textButton={t('login.sign_up')}
					className={'text-[14px]'}
					disabled={loading}
				/>

				<TextWithBorders text={t('register.already_account')} />

				<Link to='/iniciar-sesion' className="flex items-center mt-4">
					<p className="bg-[#1B2830] text-[14px] text-[#CDCDCD] tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.log_in')}</p>
				</Link>

				{msg && <Alert alert={alert} />}
			</form>
		</>
	)
}