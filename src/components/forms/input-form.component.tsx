import { forwardRef } from 'react';
import { twMerge as tm } from 'tailwind-merge'
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type InputFormProps = React.ComponentPropsWithoutRef<'input'> & {
	className?: string,
	error?: FieldError,
}

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(({className, error, ...props}, ref) => {
	const { t } = useTranslation()

  return (
    <>
			<input
				ref={ref}
				className={tm(
					`${error ? 'border-red-500 dark:border-red-500' : 'border-[#9A9A9A] dark:border-[#364752]'} border text-[#686868] dark:text-[#CACACA] outline-none bg-transparent p-3 rounded-lg placeholder:text-[#686868] w-full mt-2`,
					className
				)}
				{...props}
			/>
			{error && <p className="text-red-500 text-[12px]">{t(`${error.message}`)}</p>}
    </>
  )
})

export default InputForm;
