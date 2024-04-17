import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SignUp from "./sign-up-form.view";
import MailConfirmation from "./mail-confirmation-form.view";
import trackterra from '../../assets/trackterra.png';
import { useSignUpForm } from "../../reducers/sign-up-form.reducer";

// Component for sign-up flow
export default () => {
    const { step, updateStep } = useSignUpForm(); // Hook for sign-up form step management
    const location = useLocation(); // Hook for accessing the current location

    // Effect hook to update sign-up step based on query parameter
    useEffect(() => {
        const query = new URLSearchParams(location.search); // Creating URLSearchParams object from location search
        const stepQuery = query.get('step'); // Getting 'step' query parameter value

        if(stepQuery) {
            updateStep(parseInt(stepQuery)); // Updating sign-up step based on query parameter
        }
    }, [location, updateStep]); // Dependency array with location and updateStep function

    // JSX to render the sign-up flow
    return (
        <div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:gap-60 lg:items-center lg:mt-5">
            <div className="lg:w-5/12">
                <div className='flex items-center justify-center'>
                    <img className='h-[200px] w-[200px] text-center' src={trackterra} /> {/* Trackterra logo */}
                </div>
                {step === 1 && <SignUp />} {/* Render sign-up form if step is 1 */}
                {step === 2 && <MailConfirmation />} {/* Render mail confirmation form if step is 2 */}
            </div>
        </div>
    );
}
