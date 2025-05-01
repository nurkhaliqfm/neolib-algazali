import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
	const isAuthenticated = !!localStorage.getItem("oauthData");
	if (!isAuthenticated) {
		return <Navigate to={"/login"} />;
	}
	return <Outlet />;
};

export default AuthMiddleware;
