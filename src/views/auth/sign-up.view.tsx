import { useEffect } from "react"
import { useLocation } from 'react-router-dom';
import SignUp from "./sign-up-form.view"
import MailConfirmation from "./mail-confirmation-form.view"
import trackterra from '../../assets/trackterra.png'
import { useSignUpForm } from "../../reducers/sign-up-form.reducer";


export default () => {
	const { step, updateStep } = useSignUpForm()
	const location = useLocation()

	useEffect(() => {
		const query = new URLSearchParams(location.search);
		const stepQuery = query.get('step');

		if(stepQuery) {
			updateStep(parseInt(stepQuery))
		}
	}, [])


  return (
    <div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:gap-60 lg:items-center lg:mt-5">
			<div className="lg:w-5/12">
				<div className='flex items-center justify-center'>
					<img className='h-[200px] w-[200px] text-center' src={trackterra} />
				</div>
				{step === 1 && <SignUp />}
				{step === 2 && <MailConfirmation />}
			</div>
    </div>
  )
}
