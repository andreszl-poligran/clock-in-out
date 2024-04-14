import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { Auth } from 'aws-amplify';
import { useTranslation } from "react-i18next";
import Sidebar from "../components/Sidebar.component";
import NavBar from "../components/nav-bar/navbar.component";
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { useMenu } from "../reducers/menu.reducer";
import { useAuth } from "../reducers/auth.reducer";

export default () => {
	const { i18n } = useTranslation();
	const { signOut } = useAuth()
	const { active, updateMenuActive } = useMenu()

	useEffect(() => {
		if(!window) return
		if(window.innerWidth > 1024) {
			updateMenuActive(false)
		}
	}, [])

	useEffect(() => {
		i18n.changeLanguage('es');
	}, [])

	useEffect(() => {
		const authUser = async () => {
			try {
				const session = await Auth.currentSession();
				localStorage.setItem('token', session.getAccessToken().getJwtToken())
				localStorage.setItem('iDtoken', session.getIdToken().getJwtToken())
				
				setInterval(async () => {
					const cognitoUser = await Auth.currentAuthenticatedUser();
					const { refreshToken } = cognitoUser.getSignInUserSession();
					cognitoUser.refreshSession(refreshToken, (err: Error, session: CognitoUserSession) => {
						if(err) {
							signOut()
						}
						localStorage.setItem('token', session.getAccessToken().getJwtToken())
						localStorage.setItem('iDtoken', session.getIdToken().getJwtToken())
					})
				}, 1000 * 60 * 170)
			} catch (error) {
				signOut()
			}
		}
		authUser()
	}, [])

	return (
		<>
			<main className="flex min-h-screen bg-[#CDCDCD]">
				<div className={`${active ? 'fixed top-0 left-0 z-50 lg:static' : 'hidden'} lg:block lg:z-0`}>
					<Sidebar />
				</div>
				<div className={`${active ? 'lg:max-w-[calc(100vw-256px)]' : 'lg:max-w-[calc(100vw-60px)]'} w-full min-h-screen`} >
					<div 
						className={`${active ? 'fixed top-0 left-[256px] bg-gray-800 opacity-80 z-50 min-h-screen w-full' : 'hidden'} lg:hidden`} 
						onClick={() => updateMenuActive(false)}
					></div>
					<NavBar />
					<Outlet />
				</div>
			</main>
		</>
	)
}
