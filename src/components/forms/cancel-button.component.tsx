import { twMerge as tm } from 'tailwind-merge'

type CancelButtonProps = React.ComponentPropsWithoutRef<'button'> & {
	textButton?: string | React.ReactNode,
	className?: string
}

const CancelButton = ({textButton = 'Confirm', className, ...props}: CancelButtonProps) => {
  return (
    <button
			className={tm(
				'py-3 w-full mt-4 rounded-lg bg-[#1B2830] hover:bg-[#263944] dark:bg-[#1B2830] dark:hover:bg-[#263944] uppercase font-bold text-white dark:text-[#CDCDCD] text-[16px] tracking-widest',
				className,
			)}
			{...props}
    >
			{textButton}
    </button>
  )
}

export default CancelButton;

