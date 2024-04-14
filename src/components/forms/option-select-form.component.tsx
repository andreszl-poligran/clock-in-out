import { twMerge as tm } from 'tailwind-merge'

type OptionSelectFormProps = {
	value: string | number,
	className?: string,
	children: React.ReactNode
}

const OptionSelectForm = ({value, className, children}: OptionSelectFormProps) => {
  return (
    <option 
			value={value} 
			className={tm(
				'bg-[#E6E6E6] dark:bg-[#121A1F] text-[#686868] dark:text-[#CACACA]',
				className
			)}
    >
			{children}
    </option>
  )
}

export default OptionSelectForm;
