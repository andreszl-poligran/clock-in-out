import { useEffect } from 'react'
import { Link, Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next'
import hostInstance from '../i18n.js'
import { FaHome } from 'react-icons/fa';

export default() => {
    const { i18n } = useTranslation();
    useEffect(() => {
			i18n.changeLanguage('es');
    }, [])

	return (
		<>
			<main className="flex justify-center px-5 -mt-5 mx-auto md:w-3/4 lg:w-full lg:bg-center min-h-screen">
				<div className="fixed left-0 top-5 ml-0 mb-4">
					<Link to={'/'}>
						<button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg rounded-l-none">
							<FaHome className="mr-2" />
							<span className="font-bold">Ir al sitio web</span>
						</button>
					</Link>
				</div>

				<I18nextProvider i18n={hostInstance}>
					<Outlet />
				</I18nextProvider>
			</main>  
		</>
	)
}
