import { twMerge as tm } from 'tailwind-merge'
import { FaRegQuestionCircle } from 'react-icons/fa'

type SectionInfoProps = {
	title: string,
	tooltipTitle: string,
	tooltipText: string,
	sectionText: string,
	className: string,
	children: React.ReactNode
}

const SectionInfo = ({title, tooltipTitle, tooltipText, sectionText, className, children}: SectionInfoProps) => {

  return (
    <div className={tm(
			'text-[#686868] dark:text-[#CACACA]',
			className,
			sectionText && 'pb-4 border-b-2 border-b-[#9A9A9A] dark:border-b-[#1B2830]'
    )}>
        <div className={`${sectionText ? 'text-[32px]' : 'text-[24px]'} flex items-center gap-3 font-bold`}>
					<h1 className='line-clamp-1'>{title}</h1>
					<div className="relative group z-10 mt-[2px]">
						<FaRegQuestionCircle className="w-5 h-5 mt-1" />
						<div 
							className={`${sectionText
								? 'absolute -left-36 top-8 lg:left-5 lg:-top-16'
								: 'fixed left-10 top-32 lg:left-44 lg:top-28'} hidden group-hover:block bg-[#E6E6E6] dark:bg-[#121A1F] border border-gray-400 shadow-md rounded-md p-6`
							}
						>
							<div className="flex items-center gap-2">
								<FaRegQuestionCircle className="w-6 h-6 text-[#686868] dark:text-[#CACACA]" />
								<h1 className="text-[26px]">{tooltipTitle}</h1>
							</div>
							{tooltipText && (
								<p className="text-[16px] text-[#9A9A9A] w-[250px]">
									{tooltipText}
								</p>
							)}
							{children}
						</div>
					</div>
        </div>
        {sectionText && (
					<p className="text-[#7E7E7E] text-[14px]">
						{sectionText}
					</p>
        )}
    </div>
  )
}

export default SectionInfo;
