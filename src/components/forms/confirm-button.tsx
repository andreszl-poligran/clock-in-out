import { useTranslation } from 'react-i18next'
import { twMerge as tm } from 'tailwind-merge'
import { FaSearch } from 'react-icons/fa'

type ConfirmButtonProps = React.ComponentPropsWithoutRef<'button'> & {
	loading?: boolean,
	textButton?: string | React.ReactNode,
	className?: string,
	useIcon?: boolean
}

const ConfirmButton = ({loading = false, textButton = '', className, useIcon=false, ...props}: ConfirmButtonProps) => {
  const {t} = useTranslation()
  
  if(textButton == '') {
    textButton = t('forms.confirm')
  }
  
  return (
    <button
			disabled={loading}
			className={tm(
				'py-3 w-full mt-4 rounded-lg bg-[#6391EB] uppercase font-bold text-white text-[16px] tracking-widest',
				className,
				!loading && 'hover:bg-[#1c9151]'
			)}
			{...props}
    >
			{loading ? t('forms.loading') : textButton}
			{ useIcon?  (<div className='flex justify-center items-center'><FaSearch className="text-center text-white-900 text-[24px]" /> </div>  ) : null }
    </button>
  )
}

export default ConfirmButton;

