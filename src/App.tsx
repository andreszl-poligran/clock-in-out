import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { I18nextProvider } from "react-i18next";
import { Amplify } from 'aws-amplify';

import SignIn from './views/auth/sign-in.view'
import SingUp from './views/auth/sign-up.view'
import ForgetPassword from './views/auth/forget-password.view'
import AuthLayout from './layouts/auth.layout'
import MainLayout from './layouts/dashboard.layout'
import LoadingFront from './loading-front'
import FailedToLoad from './failed-to-load'
import awsConfig from './awsexports'
import hostInstance from './i18n'

Amplify.configure(awsConfig)

export default () => {
	const ClockInOut = lazy(() => import("./views/clock-in-out/clock-in-out.view").catch(() => {return { default: FailedToLoad }}));
	const CheckInsOuts = lazy(() => import("./views/clock-in-out/check-ins-outs.view").catch(() => {return { default: FailedToLoad }}));
    
	return (
		<I18nextProvider i18n={hostInstance}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<AuthLayout />}>
						<Route path="/" element={<Navigate to="/iniciar-sesion" />} />
						<Route path='iniciar-sesion' element={<SignIn />} />
						<Route path='registrarse' element={<SingUp />} />
						<Route path='recuperar-contrasena' element={<ForgetPassword />} />
					</Route>

					<Route path='/' element={<MainLayout />}>
						<Route path={"/iniciar-sesion" }element={<Navigate to="/iniciar-sesion" />} />
						<Route path="/marcar-entrada-salida/*" element={
								<Suspense fallback={<LoadingFront />}>
									<ClockInOut />
								</Suspense>
							}
						/>
						<Route path="/consultar-entradas-y-salidas/*" element={
								<Suspense fallback={<LoadingFront />}>
									<CheckInsOuts />
								</Suspense>
							}
						/>
						<Route path='/*' element={<Navigate to='/marcar-entrada-salida' />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</I18nextProvider>
	)
}