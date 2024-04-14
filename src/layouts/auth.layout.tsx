import { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next'
import hostInstance from '../i18n.js'

export default() => {
    const { i18n } = useTranslation();
    useEffect(() => {
			i18n.changeLanguage('es');
    }, [])

	return (
		<>
			<main className="flex justify-center px-5 -mt-5 mx-auto md:w-3/4 lg:w-full lg:bg-center min-h-screen">
				<I18nextProvider i18n={hostInstance}>
					<Outlet />
				</I18nextProvider>
			</main>  
		</>
	)
}
