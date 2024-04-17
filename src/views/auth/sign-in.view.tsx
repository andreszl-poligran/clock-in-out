import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import ConfirmButton from "../../components/forms/confirm-button";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import Alert from "../../components/alert.component";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../form-schemas/auth/sign-in.schema";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import trackterra from '../../assets/trackterra.png';
import { useSignUpForm } from "../../reducers/sign-up-form.reducer";

// Interface for sign-in data
type ISignIn = z.infer<typeof signInSchema>;

// Component for user login
const Login = () => {
    const { clearForm } = useSignUpForm(); // Hook to clear sign-up form data
    const { register, handleSubmit, formState: { errors } } = useForm<ISignIn>({ resolver: zodResolver(signInSchema) }); // Hook for form handling
    const { t } = useTranslation(); // Translation hook
    const navigate = useNavigate(); // Navigation hook

    const [ showPassword, setShowPassword ] = useState(false); // State for toggling password visibility
    const [ loading, setLoading ] = useState(false); // State for loading state
    const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false}); // State for alert messages

    // Effect hook to check if user is authenticated
    useEffect(() => {
        clearForm(); // Clearing sign-up form data
        const userAuth = async () => {
            try {
                await Auth.currentAuthenticatedUser(); // Checking current authenticated user
                navigate('/dashboard'); // Redirecting to dashboard if user is authenticated
            } catch (error) {
                navigate('/iniciar-sesion'); // Redirecting to sign-in page if user is not authenticated
            }
        };
        userAuth();
    }, []);

    // Function to handle form submission
    const onSubmit = (data: ISignIn) => {
        // Async function to sign in user
        async function signIn(username: string, password: string) {
            try {
                setLoading(true); // Setting loading state to true
                await Auth.signIn(username, password); // Signing in user using Amplify Auth
                setLoading(false); // Setting loading state to false
                navigate('/dashboard'); // Redirecting to dashboard after successful login
            } catch (error) {
                setLoading(false); // Setting loading state to false
                if (error instanceof Error) {
                    if (error.message === 'User is not confirmed.') {
                        navigate(`/signup?step=2&email=${username}`); // Redirecting to sign-up page if user is not confirmed
                        return;
                    }
                    setAlert({msg: `${t(`forms.${error.message}`)}`, error: true}); // Setting error alert message
                    setTimeout(() => {
                        setAlert({msg: '', error: false}); // Clearing error alert message after 3 seconds
                    }, 3000);
                } else {
                    console.log('Error:', error); // Logging other errors
                }
            }
        }
        signIn(data.email, data.password); // Calling signIn function with email and password
    };

    const { msg } = alert; // Destructuring alert message from alert state

    // JSX to render the login form
    return (
        <div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:gap-60 lg:items-center lg:mt-5">
            <div className="lg:w-5/12">
                <div className='flex items-center justify-center'>
                    <img className='h-[200px] w-[200px] text-center' src={trackterra} />
                </div>
                <TextWithBorders text={t('login.welcome_back')} /> {/* Component to render text with borders */}
                <form 
                    className="mt-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col">
                        <LabelForm htmlFor="email" className="mt-2">{t('login.email')}</LabelForm> {/* Label for email */}
                        <InputForm
                            {...register('email')}
                            name="email"
                            type="email"
                            placeholder={t('login.email')}
                            error={errors.email} // Displaying error message for email field if any
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <LabelForm htmlFor="password" className="mt-2">{t('login.pass')}</LabelForm> {/* Label for password */}
                        <div className="relative">
                            <InputForm
                                {...register('password')}
                                name="password"
                                type={`${showPassword ? 'text' : 'password'}`}
                                placeholder={t('login.pass')}
                                error={errors.password} // Displaying error message for password field if any
                            />
                            <div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />} {/* Button to toggle password visibility */}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 relative" />
                        <Link to='/recuperar-contrasena'>
                            <p className="text-[#686868] text-center">{t('login.forgot_pass')}</p> {/* Link to password recovery page */}
                        </Link>
                    </div>    

                    <ConfirmButton
                        type="submit"
                        loading={loading}
                        textButton={t('login.log_in')} // Button to log in
                        className={'text-[14px]'}
                    />

                    {msg && <Alert alert={alert} />} {/* Displaying alert message if exists */}

                    <TextWithBorders text={t('login.dont_have_account')} className="font-bold" /> {/* Text to indicate user to sign up */}

                    <a href='/registrarse' className="flex items-center mt-4">
                        <p className="bg-[#1B2830] text-[14px] text-[#CDCDCD] tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.sign_up')}</p> {/* Link to sign-up page */}
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login; // Exporting the Login component
