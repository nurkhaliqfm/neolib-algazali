import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';
import Error from '../modules/Error';
import Admin from '../modules/admin';
import BaseLayout from '@/components/layout/Base';
import Public from '@/modules/Public';
import Auth from '@/modules/Auth';
import AuthMiddleware from '@/modules/Auth/middleware/AuthMiddleware';
import ProtectedRoutes from '@/modules/Auth/middleware/ProtectedRoutes';
import AuthorizedRoute from '@/modules/Auth/middleware/AuthorizedRoute';

function App() {
	return (
		<Routes>
			{/* NOTE: Error Route */}
			<Route path={AppRoutes.Error.path} element={<Error.ErrorPage />} />
			<Route path="*" element={<Navigate to={AppRoutes.Error.path} />} />

			{/* NOTE: Forbidden Route  */}
			<Route
				path={AppRoutes.Forbidden.path}
				element={<Error.ForbiddenPage />}
			/>
			{/* NOTE: Login Route */}
			<Route path={AppRoutes.Login.path} element={<Auth.LoginPage />} />

			{/* NOTE: ADMIN Route */}
			<Route element={<AuthMiddleware />}>
				<Route path="/admin" element={<ProtectedRoutes />}>
					<Route
						path={AppRoutes.AdminDashboard.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.DashboardPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminKoleksiJurnal.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.KoleksiPage.KoleksiJurnalPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminKoleksiEjurnal.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.KoleksiPage.KoleksiEjurnalPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminKoleksiBuku.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.KoleksiPage.KoleksBukuiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminKoleksiEbook.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.KoleksiPage.KoleksiEbookPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminKoleksiSkripsi.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.KoleksiPage.KoleksiSkripsiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminTransaksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.TransaksiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminAnggota.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.AnggotaPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminPassword.path}
						element={
							<AuthorizedRoute
								allowedRoles={['Admin']}
								page={<Admin.PasswordPage />}
							/>
						}
					/>
				</Route>
			</Route>

			<Route element={<BaseLayout />}>
				<Route path={AppRoutes.Home.path} element={<Public.HomePage />} />
			</Route>
		</Routes>
	);
}

export default App;
