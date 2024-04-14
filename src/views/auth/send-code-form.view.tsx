import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../../components/alert.component"
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next'
import ConfirmButton from "../../components/forms/confirm-button";
import TextWithBorders from "../../components/auth/text-with-borders.component";
import LabelForm from "../../components/forms/label-form.component";
import InputForm from "../../components/forms/input-form.component";

type SendCodeProps = {
    setStep: (step: number) => void,
    email: string,
    setEmail: (email: string) => void
}

const SendCode = ({setStep, email, setEmail}: SendCodeProps) => {

    const { t } = useTranslation()
    const [ alert, setAlert ] = useState<AlertType>({msg: '', error: false})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(email === '') {
            return setAlert({msg: t('forms.email_required'), error: true})
        }

        async function sendEmail(username: string) {
            try {
                await Auth.forgotPassword(username);
                setStep(2)
            } catch (error) {
                if(error instanceof Error) {
                    console.log('Error:', error);
                    setAlert({msg: `${error.message}`, error: true})
                }
            }
        }
        sendEmail(email)
    }

    const { msg } = alert

  return (
    <>
        <TextWithBorders text={t('recover_pass.recover')} />
        
        <form 
            className="mt-4"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col">
                <LabelForm htmlFor="email" >{t('register.email_required')}</LabelForm>
                <InputForm
                    name="email"
                    type="email"
                    placeholder={t('login.email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            
            <ConfirmButton
                type="submit"
                textButton={t('recover_pass.continue')}
            />

            <Link to='/iniciar-sesion' className="flex items-center mt-4">
                <p className="bg-[#1B2830] text-[14px] text-white tracking-widest uppercase font-semibold p-3 rounded-lg w-full text-center hover:bg-[#2e4250] cursor-pointer">{t('login.log_in')}</p>
            </Link>

            {msg && <Alert alert={alert} />}

        </form>
    </>
  )
}

export default SendCode;