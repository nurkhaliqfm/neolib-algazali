import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';
import Error from './modules/Error';
import Admin from './modules/Admin';
import DashboardLayout from './components/layout/Dashboard';

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

			{/* NOTE: ADMIN Route */}
			<Route element={<DashboardLayout />}>
				<Route
					path={AppRoutes.AdminDashboard.path}
					element={<Admin.DashboardPage />}
				/>
				<Route
					path={AppRoutes.AdminKoleksi.path}
					element={<Admin.KoleksiPage />}
				/>
				<Route
					path={AppRoutes.AdminTransaksi.path}
					element={<Admin.TransaksiPage />}
				/>
				<Route
					path={AppRoutes.AdminAnggota.path}
					element={<Admin.AnggotaPage />}
				/>
				<Route
					path={AppRoutes.AdminPassword.path}
					element={<Admin.PasswordPage />}
				/>
			</Route>

			{/* <Route element={<BaseLayout />}>
				<Route
					path={AppRoutes.Home.path}
					element={<AuthorizedRoute page={<User.DashboardPage />} />}
				/>
			</Route> */}
		</Routes>
	);
}

export default App;
