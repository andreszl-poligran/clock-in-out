import { useTranslation } from 'react-i18next'
import SidebarSection from './sidebar-section.component'
import { FaBars, FaChevronLeft } from 'react-icons/fa'
import { BiCopy, BiGitCommit } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import { connect } from 'react-redux'
import actions from '../actions'
import * as interfaces from '../interfaces';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'


function mapStateToProps(state: interfaces.redux.Store) {
	return { active: state.menu.active, };
}

const mapDispatchToProps = { ...actions.auth.functionalsActions, ...actions.menu.actions, } as const;

type MapDispatchToProps = typeof mapDispatchToProps;
type MapStateToProps = ReturnType<typeof mapStateToProps>;
interface Props extends MapStateToProps, MapDispatchToProps { }

const MyComponent: React.FC<Props> = (props) => {
	const navigate = useNavigate()
	const { t: getText } = useTranslation()
    const { active, updateMenuActive, signOut: signOutAction } = props;
		const [role, setRole] = useState('');

	const signOut = async () => {
		try {
			await signOutAction()
			navigate('/iniciar-sesion');
		} catch (err) {
			console.log(err)
		}
	}

	const showMenu = () => {
		updateMenuActive(!active)
	}

	useEffect(() => {
		Auth.currentAuthenticatedUser().then((user) => {
			setRole(user?.attributes?.profile || ' ');
		});
	}, [])

	return (
		<div className={`${active ? 'min-w-[256px]' : 'min-w-[60px]'} sticky bg-gradient-to-b from-[#E6E6E6] to-[#E6E6E6] top-0 rigth-0 border border-[#B2BBB6] rounded-r-xl h-screen`}>
			<div className='flex flex-col justify-between h-full text-[#686868] bg-white rounded-md'>
				<div>
					<div className={`${active ? 'flex h-[57px]' : 'hidden'} justify-between items-center px-7 py-4 border-b-2 border-b-[#B2BBB6]`}>
						<span className='font-semibold text-black text-[24px]'>TrackTerra</span>
						<div className='hidden lg:flex cursor-pointer' onClick={() => showMenu()}>
							<FaChevronLeft />
							<FaChevronLeft className='-ml-2' />
						</div>
					</div>
                    
					<div className={`${active ? 'hidden' : 'flex h-[57px]'} items-center justify-center cursor-pointer py-4 border-b-2 border-b-[#B2BBB6]`} onClick={() => updateMenuActive(!active)}>
						<FaBars className='w-5 h-5' />
					</div>

					<div className={`${active ? 'pr-7' : ''} py-4 text-[16px] space-y-3`}>
						<SidebarSection
							path='/marcar-entrada-salida'
							sectionName={getText('sidebar.clock_in_out')}
							icon={<BiCopy className={`${!active && 'mx-auto'} w-5 h-5`} />}
						/>

						{
							role == 'admin' ? (
								<SidebarSection
									path='/consultar-entradas-y-salidas'
									sectionName={getText('sidebar.check_ins_outs')}
									icon={<BiGitCommit className={`${!active && 'mx-auto'} w-5 h-5`} />}
								/>
							) : null
						}
						
					</div>
				</div>

				<div>
					<div className={`${active ? 'px-7' : ''} flex justify-between items-center pt-4 h-[92px] pb-9 border-t border-t-[#B2BBB6] hover:text-[#6391EB]`}>
						<button className={`${active ? 'flex items-center gap-3' : 'block mx-auto'}`} onClick={signOut}>
							<FiLogOut className={`${active ? '' : 'mx-auto'} w-5 h-5`} />
							<p className={`${active ? 'block' : 'hidden'}`}>{getText('sidebar.log_out')}</p>
						</button>
					</div>
				</div>
				
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent as any)