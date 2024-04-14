import { forwardRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { twMerge as tm } from 'tailwind-merge'
import { useTranslation } from 'react-i18next';

type SelectFormProps = {
	children: ReactNode,
	name: string,
	className?: string,
	value?: string,
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
	error?: FieldError
}

const SelectForm = forwardRef<HTMLSelectElement, SelectFormProps>(({children, name, className, error, ...props}, ref) => {
	const {t} = useTranslation()

  return (
    <>
			<select
				ref={ref}
				name={name}
				id={name}
				className={tm(
					`${error ? 'border-red-500 dark:border-red-500' : 'border-[#9A9A9A] dark:border-[#364752]'} border text-[#686868] dark:text-[#CACACA] outline-none bg-transparent p-3 rounded-lg placeholder:text-[#686868] w-full cursor-pointer`,
					className
				)}
				{...props}
			>
				{children}
			</select>
			{error && <p className="text-red-500 text-[12px]">{t(`${error.message}`)}</p>}
    </>
  )
})

export default SelectForm;