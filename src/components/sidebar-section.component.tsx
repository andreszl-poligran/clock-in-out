import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import { useMenu } from "../reducers/menu.reducer";

type SidebarSectionProps = {
    showEfData?: boolean,
    path: string,
    sectionName: string,
    icon: JSX.Element
}

const SidebarSection = ({showEfData, path, sectionName, icon}: SidebarSectionProps) => {
	const { active, updateMenuActive } = useMenu()
	const location = useLocation()

	const validatePath = (path: string) => {
		if(location.pathname.includes(path)) {
			return true
		}
		return false
	}

	const closeSidebar = () => {
		if(!window) return
		if(window.innerWidth < 1024) {
			updateMenuActive(false)
		}
	}

  return (
    <div 
			className={`
				${(showEfData !== undefined) && !showEfData && 'hidden'} ${active && 'px-7'}
				${validatePath(path) && 'bg-gradient-to-l from-[#FFFFFF] to-[#ffffff7f] border-l-2 text-[#6391EB] border-l-[#6391EB]'}
				${validatePath(path) && active && 'rounded-r-lg' }
			`}
    >
			<Link 
				onClick={closeSidebar}
				to={path}
				className={`${active ? 'flex items-center gap-3' : 'block'} hover:text-[#6391EB] dark:hover:text-[#6391EB]`}
			>
				{icon}
				<p className={`${active ? 'block' : 'hidden'}`}>{sectionName}</p>
			</Link>
    </div>
  )
}

export default SidebarSection;
