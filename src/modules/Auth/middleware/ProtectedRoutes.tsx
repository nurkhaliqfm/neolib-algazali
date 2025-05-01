import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import PageLayout from "@/components/layout/Page";
import AppRoutes from "@/routes";

const ProtectedRoutes = () => {
	const role = useTypedSelector((state) => state.oauth.oauthData?.role);
	const location = useLocation();

	if (location.pathname === "/") {
		switch (role) {
			case "User":
				return <Navigate to={AppRoutes.DashboardUser.path} />;
			case "Admin":
				return <Navigate to={AppRoutes.DashboardAdmin.path} />;
			case "Office":
				return <Navigate to={AppRoutes.DashboardOffice.path} />;
			default:
				return <Navigate to={AppRoutes.Error.path} />;
		}
	}

	return <PageLayout />;
};

export default ProtectedRoutes;
