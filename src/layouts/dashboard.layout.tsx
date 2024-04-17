import { useNavigate, Outlet } from "react-router-dom"; // Import hooks from react-router-dom for navigation
import { useEffect } from "react"; // Import useEffect hook from React
import { Auth } from 'aws-amplify'; // Import Auth from AWS Amplify for authentication
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next for internationalization
import Sidebar from "../components/Sidebar.component"; // Import Sidebar component
import NavBar from "../components/nav-bar/navbar.component"; // Import NavBar component
import { useMenu } from "../reducers/menu.reducer"; // Import custom hook for menu state management
import { useAuth } from "../reducers/auth.reducer"; // Import custom hook for authentication state management

// Functional component definition
export default () => {
	// Initialize hooks and custom hooks
	const { i18n } = useTranslation(); // Translation hook
	const { signOut } = useAuth(); // Authentication hook
	const { active, updateMenuActive } = useMenu(); // Menu state management hook
	const navigate = useNavigate(); // Navigation hook

	// Effect hook to handle window resize
	useEffect(() => {
		if (!window) return; // Check if window object exists
		if (window.innerWidth > 1024) {
			updateMenuActive(false); // Update menu active state if window width is greater than 1024 pixels
		}
	}, []);

	// Effect hook to set initial language
	useEffect(() => {
		i18n.changeLanguage('es'); // Change language to Spanish
	}, []);

	// Effect hook to authenticate user and set tokens
	useEffect(() => {
		const authUser = async () => {
			try {
				const session = await Auth.currentSession(); // Get current session from AWS Amplify
				// Set tokens in local storage
				localStorage.setItem('token', session.getAccessToken().getJwtToken());
				localStorage.setItem('iDtoken', session.getIdToken().getJwtToken());
				localStorage.setItem('token', session.getAccessToken().getJwtToken());
				localStorage.setItem('iDtoken', session.getIdToken().getJwtToken());
			} catch (error) {
				await signOut(); // Sign out user in case of error
				navigate('/iniciar-sesion'); // Redirect to login page
			}
		};
		authUser(); // Call authentication function
	}, []);

	// JSX returned by the component
	return (
		<>
			<main className="flex min-h-screen bg-[#CDCDCD]">
				<div className={`${active ? 'fixed top-0 left-0 z-50 lg:static' : 'hidden'} lg:block lg:z-0`}>
					<Sidebar /> {/* Render Sidebar component */}
				</div>
				<div className={`${active ? 'lg:max-w-[calc(100vw-256px)]' : 'lg:max-w-[calc(100vw-60px)]'} w-full min-h-screen`} >
					<div 
						className={`${active ? 'fixed top-0 left-[256px] bg-gray-800 opacity-80 z-50 min-h-screen w-full' : 'hidden'} lg:hidden`} 
						onClick={() => updateMenuActive(false)}
					></div>
					<NavBar /> {/* Render NavBar component */}
					<Outlet /> {/* Render nested routes */}
				</div>
			</main>
		</>
	);
};
