import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./routes";
import Error from "./modules/Error";
import Admin from "./modules/Admin";

function App() {
	return (
		<Routes>
			<Route
				path={AppRoutes.Dashboard.path}
				element={<Admin.DashboardPage />}
			/>

			{/* NOTE: Error Route */}
			<Route path={AppRoutes.Error.path} element={<Error.ErrorPage />} />
			<Route path="*" element={<Navigate to={AppRoutes.Error.path} />} />

			{/* NOTE: Forbidden Route  */}
			<Route
				path={AppRoutes.Forbidden.path}
				element={<Error.ForbiddenPage />}
			/>

			{/* <Route element={<ResultLayout />}>
				<Route
					path={AppRoutes.ResultLocation.path}
					element={<Result.LocationPage />}
				/>
				<Route
					path={AppRoutes.ResultVenue.path}
					element={<Result.VenuePage />}
				/>
				<Route
					path={AppRoutes.ResultPertandingan.path}
					element={<Result.PertandingaPoolPage />}
				/>
				<Route
					path={AppRoutes.ResultPertandinganSwiss.path}
					element={<Result.PertandingaSwissPage />}
				/>
				<Route
					path={AppRoutes.ResultPertandinganGugur.path}
					element={<Result.PertandingaGugurPage />}
				/>
				<Route
					path={AppRoutes.ResultPertandinganFinal.path}
					element={<Result.PertandingaFinalPage />}
				/>
			</Route> */}

			{/* <Route element={<DashboardLayout />}>
				<Route
					path={AppRoutes.Dashboard.path}
					element={<AuthorizedRoute page={<User.DashboardPage />} />}
				/>
			</Route> */}
		</Routes>
	);
}

export default App;
