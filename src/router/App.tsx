import { Navigate, Route, Routes } from 'react-router-dom';
import AppRoutes from './routes';
import Error from '../modules/Error';
import Admin from '../modules/admin';
import DashboardLayout from '../components/layout/Dashboard';
import BaseLayout from '@/components/layout/Base';
import Public from '@/modules/Public';

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
					path={AppRoutes.AdminKoleksiJurnal.path}
					element={<Admin.KoleksiPage.KoleksiJurnalPage />}
				/>
				<Route
					path={AppRoutes.AdminKoleksiEjurnal.path}
					element={<Admin.KoleksiPage.KoleksiEjurnalPage />}
				/>
				<Route
					path={AppRoutes.AdminKoleksiBuku.path}
					element={<Admin.KoleksiPage.KoleksBukuiPage />}
				/>
				<Route
					path={AppRoutes.AdminKoleksiEbook.path}
					element={<Admin.KoleksiPage.KoleksiEbookPage />}
				/>
				<Route
					path={AppRoutes.AdminKoleksiSkripsi.path}
					element={<Admin.KoleksiPage.KoleksiSkripsiPage />}
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

			<Route element={<BaseLayout />}>
				<Route path={AppRoutes.Home.path} element={<Public.HomePage />} />
			</Route>
		</Routes>
	);
}

export default App;
