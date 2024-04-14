import { twMerge as tm } from 'tailwind-merge'

type TextWithBordersProps = {
	text: string
	className?: string
}

const TextWithBorders = ({text, className}: TextWithBordersProps) => {
  return (
		<div>
			<div className="flex items-center mt-4">
				<p className="border-t-2 border-[#39484C] flex-1"></p>
				<p className={tm('text-[#686868] text-[14px] text-center mx-3', className)}>{text}</p>
				<p className="border-t-2 border-[#39484C] flex-1"></p>
			</div>
		</div>
  )
}

export default TextWithBorders
