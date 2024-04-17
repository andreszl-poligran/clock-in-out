import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Alert from "../../components/alert.component";
import TextWithBorders from '../../components/auth/text-with-borders.component';
import InputForm from '../../components/forms/input-form.component';
import ConfirmButton from '../../components/forms/confirm-button';
import { useSignUpForm } from '../../reducers/sign-up-form.reducer';

// Component for confirming user sign-up with verification code
export default () => {
  // Hooks for managing state and accessing translation
  const { form, clearForm } = useSignUpForm(); // Custom hook for sign-up form state
  const { t } = useTranslation(); // Translation hook
  const location = useLocation(); // Accessing the current location
  const navigate = useNavigate(); // Navigation hook for redirection

  // State variables
  const [email, setEmail] = useState(''); // State for user email
  const [code, setCode] = useState(''); // State for verification code
  const [alert, setAlert] = useState<AlertType>({ msg: '', error: false }); // State for alert messages

  // Effect hook to set initial email state
  useEffect(() => {
    const query = new URLSearchParams(location.search); // Extracting query parameters from URL
    const emailQuery = query.get('email'); // Getting the email from query parameter

    // Setting email state based on query parameter or form state
    if (emailQuery) {
      setEmail(emailQuery); // If email query parameter exists, set email state
    } else {
      setEmail(form.email); // If email query parameter does not exist, set email state from form state
    }
  }, []);

  // Function to verify user account with verification code
  const verifyAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Preventing default form submission behavior
    if (code === '') {
      setAlert({ msg: t('mail_confirmation.code_field'), error: true }); // Setting alert message if verification code is empty
      return;
    }

    // Async function to confirm sign-up using Amplify Auth
    async function confirmSignUp(username: string, code: string) {
      try {
        await Auth.confirmSignUp(username, code, { forceAliasCreation: false }); // Confirming sign-up with provided verification code
        clearForm(); // Clearing sign-up form state
        navigate('/iniciar-sesion'); // Redirecting to sign-in page after successful confirmation
      } catch (error) {
        if (error instanceof Error) {
          setAlert({ msg: error.message, error: true }); // Setting alert message if an error occurs during confirmation
          setTimeout(() => {
            setAlert({ msg: '', error: false }); // Clearing alert message after 3 seconds
          }, 3000);
        }
      }
    }
    confirmSignUp(email, code); // Calling the confirmSignUp function with user email and verification code
  };

  // Function to resend confirmation code
  const noCode = () => {
    // Async function to resend confirmation code using Amplify Auth
    async function resendConfirmationCode(username: string) {
      try {
        await Auth.resendSignUp(username); // Resending confirmation code for the provided username (email)
        setAlert({ msg: t('mail_confirmation.code_resent'), error: false }); // Setting success alert message
        setTimeout(() => {
          setAlert({ msg: '', error: false }); // Clearing alert message after 3 seconds
        }, 3000);
      } catch (err) {
        console.log('error resending code: ', err); // Logging error if resending confirmation code fails
      }
    }
    resendConfirmationCode(email); // Calling the resendConfirmationCode function with user email
  };

  const { msg } = alert; // Destructuring alert message from alert state

  // JSX to render the confirmation form
  return (
    <>
      <TextWithBorders text={t('mail_confirmation.confirmation')} /> {/* Component to render text with borders */}
      <p className='text-center text-[#CDCDCD] mt-4'>{t('mail_confirmation.enter')} {email}</p> {/* Text to display user email */}
      <form onSubmit={verifyAccount}> {/* Form for verifying account */}
        <InputForm
          name='code'
          type="text"
          placeholder={t('mail_confirmation.confirmation_code')}
          value={code}
          onChange={e => setCode(e.target.value)} // Input field for entering verification code
        />

        <div>
          <ConfirmButton
            type='submit'
            textButton={t('mail_confirmation.verify')} // Button to verify account with entered verification code
          />
          <button 
            type='button'
            className='bg-gray-800 mt-4 border border-[#364752] text-[#CDCDCD] p-3 rounded-lg w-full text-center uppercase font-semibold tracking-widest'
            onClick={noCode} // Button to resend confirmation code
          >
            <p>{t('mail_confirmation.havent')}</p> {/* Text to resend confirmation code */}
          </button>
        </div>
      </form>

      {msg && <Alert alert={alert} />} {/* Displaying alert message if exists */}
    </>
  );
};
