import { useRef } from 'react'
import { FaBars } from 'react-icons/fa'
import { useMenu } from '../../reducers/menu.reducer'

const NavBar = () => {
	const {updateMenuActive } = useMenu()
	const headerRef = useRef<HTMLDivElement>(null);

	return (
		<div className="w-full bg-gradient-to-l from-[#F2F2F2] dark:from-[#151E24] to-transparent flex items-center justify-between h-[58px] px-4 sm:px-6 border-b-2 border-b-[#B2BBB6] dark:border-b-[#202D34] text-[#686868] dark:text-[#BCBCBC]" ref={headerRef}>
			<div className='flex items-center justify-between w-full gap-2 md:gap-7'>
				<div className='flex items-center gap-3'>
					<FaBars className='w-5 h-5 block lg:hidden cursor-pointer' onClick={() => updateMenuActive(true)} />
				</div>
			</div>
		</div>
	)
}

export default NavBar;