import { ReactNode } from 'react'
import { twMerge as tm } from 'tailwind-merge'

type LabelFormProps = {
	children: ReactNode,
	htmlFor: string,
	className?: string
}

const LabelForm = ({children, htmlFor, className, ...props}: LabelFormProps) => {
  return (
    <label 
			htmlFor={htmlFor} 
			className={tm(
				"text-[#686868] dark:text-[#CACACA] text-[14px]",
				className
			)}
			{...props}
    >
			{children}
    </label>
  )
}

export default LabelForm;
