import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./routes";
import Error from "../modules/error";
import Admin from "../modules/admin";
import Shared from "../shared/pages";
import BaseLayout from "@/components/layout/public";
import Public from "@/modules/public";
import Auth from "@/modules/auth";
import AuthMiddleware from "@/modules/auth/middleware/AuthMiddleware";
import ProtectedRoutes from "@/modules/auth/middleware/ProtectedRoutes";
import AuthorizedRoute from "@/modules/auth/middleware/AuthorizedRoute";

function AppRouter() {
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
								allowedRoles={["Admin"]}
								page={<Admin.DashboardPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminKoleksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.KoleksiPage.ListKoleksiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminDetailKoleksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Shared.DetailKoleksiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminEditKoleksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.KoleksiPage.EditKoleksiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminCreateKoleksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.KoleksiPage.CreateKoleksiPage />}
							/>
						}
					/>

					<Route
						path={AppRoutes.AdminTransaksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.TransaksiPage.ListTransaksiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminCreateTransaksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.TransaksiPage.CreateTransaksiPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminEditTransaksi.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.TransaksiPage.EditTransaksiPage />}
							/>
						}
					/>

					<Route
						path={AppRoutes.AdminAnggota.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.AnggotaPage.ListAnggotaPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminCreateAnggota.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.AnggotaPage.CreateAnggotaPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminEditAnggota.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.AnggotaPage.EditAnggotaPage />}
							/>
						}
					/>
					<Route
						path={AppRoutes.AdminDetailAnggota.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.AnggotaPage.DetailAnggotaPage />}
							/>
						}
					/>

					<Route
						path={AppRoutes.AdminPassword.path}
						element={
							<AuthorizedRoute
								allowedRoles={["Admin"]}
								page={<Admin.UserPage.ResetPasswordPage />}
							/>
						}
					/>
				</Route>
			</Route>

			<Route element={<BaseLayout />}>
				<Route path={AppRoutes.Home.path} element={<Public.HomePage />} />
				<Route path={AppRoutes.Koleksi.path} element={<Public.KoleksiPage />} />
				<Route
					path={AppRoutes.KoleksiDetail.path}
					element={<Shared.DetailKoleksiPage />}
				/>
			</Route>
		</Routes>
	);
}

export default AppRouter;
