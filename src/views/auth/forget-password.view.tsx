import { useState } from "react"
import SendCode from "./send-code-form.view"
import NewPassword from "./new-password-form.view"
import trackterra from '../../assets/trackterra.png'

export default () => {
	const [ step, setStep ] = useState(1)
	const [ email, setEmail ] = useState('')

  return (
    <div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:gap-60 lg:items-center lg:mt-5">
      <div className="lg:w-5/12">
        <div className='flex items-center justify-center'>
          <img className='h-[200px] w-[200px] text-center' src={trackterra} />
        </div>
        {step === 1 ? <SendCode setStep={setStep} email={email} setEmail={setEmail} /> : ''}
        {step === 2 ? <NewPassword setStep={setStep} email={email} setEmail={setEmail} /> : ''}
      </div>
    </div>
  )
}

