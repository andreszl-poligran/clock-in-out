import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import ConfirmButton from "../../components/forms/confirm-button";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import { FaEye, FaEyeSlash, FaRegQuestionCircle } from 'react-icons/fa';
import { z } from "zod";
import { signUpSchema } from "../../form-schemas/auth/sign-up.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../../components/alert.component";
import { useSignUpForm } from "../../reducers/sign-up-form.reducer";

// Type for sign-up data
type ISignUp = z.infer<typeof signUpSchema>;

// Component for user sign-up
export default () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ISignUp>({ resolver: zodResolver(signUpSchema) }); // Hook for form handling
    const { form, updateForm, updateStep, clearForm } = useSignUpForm(); // Hook for sign-up form data management
    const { t } = useTranslation(); // Translation hook

    const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false}); // State for alert messages
    const [ loading, setLoading ] = useState(false); // State for loading state
    const [ showPassword, setShowPassword ] = useState(false); // State for toggling password visibility
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false); // State for toggling confirm password visibility

    // Effect hook to set form values from sign-up form data
    useEffect(() => {
        setValue('email', form.email || ''); // Setting email value
        setValue('name', form.name || ''); // Setting name value
        setValue('lastName', form.lastName || ''); // Setting last name value
        setValue('password', form.password || ''); // Setting password value
        setValue('confirmPassword', form.confirmPassword || ''); // Setting confirm password value
    }, [form, setValue]);

    // Function to handle form submission
    const onSubmit = (data: ISignUp) => {
        const { email, password, confirmPassword, name, lastName } = data; // Destructuring form data

        updateForm({ email, name, lastName, password, confirmPassword }); // Updating sign-up form data
        // Async function to sign up user
        async function signUp(email: string, password: string, name: string, last_name: string){
            if(form.email) {
                try {
                    setLoading(true); // Setting loading state to true
                    await Auth.signUp({ username: email, password, attributes: { given_name: name, family_name: last_name, name: `${name} ${last_name}` } }); // Signing up user using Amplify Auth
                    clearForm(); // Clearing sign-up form data
                    form.email = email; // Setting email value in form data
                    updateForm({ ...form }); // Updating sign-up form data
                    setLoading(false); // Setting loading state to false
                    updateStep(2); // Updating step to 2
                } catch (error) {
                    setLoading(false); // Setting loading state to false
                    if(error instanceof Error) {
                        setAlert({msg: error.message, error: true}); // Setting error alert message
                        console.log(error); // Logging error
                    }
                }
            }
        }
        signUp(form.email, form.password, form.name, form.lastName); // Calling signUp function with form data
    };

    const { msg } = alert; // Destructuring alert message from alert state

    // JSX to render the sign-up form
    return (
        <>
            <TextWithBorders text={t('register.general_information')} /> {/* Component to render text with borders */}
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)} >
                <div className="md:flex md:flex-row md:gap-3">
                    <div className="flex flex-col md:w-full">
                        <LabelForm htmlFor="email">{t('register.email_required')}</LabelForm> {/* Label for email */}
                        <InputForm
                            {...register('email')}
                            name="email"
                            type="email"
                            placeholder={t('register.email_required')}
                            error={errors.email} // Displaying error message for email field if any
                        />
                    </div>
                </div>
                <div className="flex flex-col md:w-full mt-4">
                    <LabelForm htmlFor="name">{t('personal.name_req')}</LabelForm> {/* Label for name */}
                    <InputForm
                        {...register('name')}
                        type="text"
                        name={'name'}
                        placeholder={t('personal.name')}
                        error={errors.name} // Displaying error message for name field if any
                    />
                </div>

                <div className="flex flex-col md:w-full mt-4">
                    <LabelForm htmlFor="lastName">{t('personal.last_name_req')}</LabelForm> {/* Label for last name */}
                    <InputForm
                        {...register('lastName')}
                        type="text"
                        name={'lastName'}
                        placeholder={t('personal.last_name')}
                        error={errors.lastName} // Displaying error message for last name field if any
                    />
                </div>

                <div className="md:flex md:flex-row md:gap-3">
                    <div className="flex flex-col mt-2 md:w-full">
                        <div className="flex items-center gap-2">
                            <LabelForm htmlFor="password">{t('register.pass_req')}</LabelForm> {/* Label for password */}
                            <div className="relative group z-10 mt-[2px]">
                                <FaRegQuestionCircle className="text-[#CDCDCD]" /> {/* Icon for password tooltip */}
                                <div className="absolute hidden group-hover:block left-4 -top-16 bg-[#121A1F] border border-gray-400 shadow-md rounded-md p-6">
                                    <p className="text-[16px] text-[#9A9A9A] w-[200px]">{t('register.pass_must')}</p> {/* Tooltip content */}
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <InputForm
                                {...register('password')}
                                type={`${showPassword ? 'text' : 'password'}`}
                                name={'password'}
                                placeholder={t('login.pass')}
                                error={errors.password} // Displaying error message for password field if any
                            />
                            <div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2 md:w-full">
                        <LabelForm htmlFor="confirmPassword">{t('register.pass_conf')}</LabelForm> {/* Label for confirm password */}
                        <div className="relative">
                            <InputForm
                                {...register('confirmPassword')}
                                type={`${showConfirmPassword ? 'text' : 'password'}`}
                                name={'confirmPassword'}
                                placeholder={t('register.pass_con')}
                                error={errors.confirmPassword} // Displaying error message for confirm password field if any
                            />
                            <div className="absolute top-[25px] right-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEye className="text-[#686868]" /> : <FaEyeSlash className="text-[#686868]" />}
                            </div>
                        </div>
                    </div>
                </div>

                <ConfirmButton
                    type="submit"
                    textButton={t('login.sign_up')} // Button text for sign-up
                    className={'text-[14px]'}
                    disabled={loading} // Disabling button if loading
                />

                <TextWithBorders text={t('register.already_account')} /> {/* Component to render text with borders */}

                <Link to='/iniciar-sesion' className="flex items-center mt-4">
                    <p className="bg-[#1B2830] text-[14px] text-[#CDCDCD] tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.log_in')}</p> {/* Link to log in page */}
                </Link>

                {msg && <Alert alert={alert} />} {/* Displaying alert message if exists */}
            </form>
        </>
    );
}
