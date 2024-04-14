import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import ConfirmButton from "../../components/forms/confirm-button"
import LabelForm from "../../components/forms/label-form.component"
import InputForm from "../../components/forms/input-form.component"
import TextWithBorders from "../../components/auth/text-with-borders.component"
import Alert from "../../components/alert.component"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "../../form-schemas/auth/sign-in.schema"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import trackterra from '../../assets/trackterra.png'
import { useSignUpForm } from "../../reducers/sign-up-form.reducer";

type ISignIn = z.infer<typeof signInSchema>

const Login = () => {

    const { clearForm } = useSignUpForm()

    const { register, handleSubmit, formState: { errors } } = useForm<ISignIn>({ resolver: zodResolver(signInSchema) });

    const {t} = useTranslation()
    const navigate = useNavigate();

    const [ showPassword, setShowPassword ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false})

    useEffect(() => {
        clearForm()
        const userAuth = async () => {
            try {
                await Auth.currentAuthenticatedUser()
                navigate('/dashboard')
            } catch (error) {
                navigate('/iniciar-sesion')
            }
        }
        userAuth()
    }, [])

    const onSubmit = (data: ISignIn) => {
        async function signIn(username: string, password: string) {
            try {
                setLoading(true)
                await Auth.signIn(username, password);
                setLoading(false)
                navigate('/dashboard')
            } catch (error) {
                setLoading(false)
                if(error instanceof Error) {
                    if(error.message === 'User is not confirmed.') {
                        navigate(`/signup?step=2&email=${username}`)
                        return
                    }
                    setAlert({msg: `${t(`forms.${error.message}`)}`, error: true})
                    setTimeout(() => {
                        setAlert({msg: '', error: false})
                    }, 3000);
                } else {
                    console.log('Error:', error);
                }
            }
        }
        signIn(data.email, data.password)
    }

    const { msg } = alert

    return (
        <div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:gap-60 lg:items-center lg:mt-5">
            <div className="lg:w-5/12">
                <div className='flex items-center justify-center'>
                    <img className='h-[200px] w-[200px] text-center' src={trackterra} />
                </div>
                <TextWithBorders text={t('login.welcome_back')} />
                <form 
                    className="mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col">
                        <LabelForm htmlFor="email" className="mt-2">{t('login.email')}</LabelForm>
                        <InputForm
                            {...register('email')}
                            name="email"
                            type="email"
                            placeholder={t('login.email')}
                            error={errors.email}
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <LabelForm htmlFor="password" className="mt-2">{t('login.pass')}</LabelForm>
                        <div className="relative">
                            <InputForm
                                {...register('password')}
                                name="password"
                                type={`${showPassword ? 'text' : 'password'}`}
                                placeholder={t('login.pass')}
                                error={errors.password}
                            />
                            <div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 relative" />
                        <Link to='/recuperar-contrasena'>
                            <p className="text-[#686868] text-center">{t('login.forgot_pass')}</p>
                        </Link>
                    </div>    

                    <ConfirmButton
                        type="submit"
                        loading={loading}
                        textButton={t('login.log_in')}
                        className={'text-[14px]'}
                    />

                    {msg && <Alert alert={alert} />}

                    <TextWithBorders text={t('login.dont_have_account')} className="font-bold" />

                    <a href='/registrarse' className="flex items-center mt-4">
                        <p className="bg-[#1B2830] text-[14px] text-[#CDCDCD] tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.sign_up')}</p>
                    </a>
                </form>
            </div>
        </div>
    )
}

export default Login
