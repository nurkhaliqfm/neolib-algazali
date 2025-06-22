import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Navigate, Outlet } from "react-router-dom";
import { refresh } from "../services/oauthService";
import { useDispatch } from "react-redux";
import { OAuthData } from "@/redux/types";
import { clearOAuthData, setOAuthData } from "../oauthSlice";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

const AuthMiddleware = () => {
	const dispatch = useDispatch();
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const isAuthenticated = !!localStorage.getItem("oauthData");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuthToken = async () => {
			if (!user || !isAuthenticated) {
				setLoading(false);
				return;
			}

			const isTokenExpired = Date.now() >= user.expires_in;

			if (isTokenExpired) {
				try {
					refresh(user.access_token).then((oauthData: OAuthData) => {
						dispatch(setOAuthData(oauthData));
					});
				} catch (error) {
					console.log("error Request refresh", error);
					dispatch(clearOAuthData());
					return <Navigate to={"/login"} />;
				}
			} else {
				setLoading(false);
			}
		};

		checkAuthToken();
	}, [user, isAuthenticated, dispatch]);

	if (loading)
		return (
			<section className="flex items-center justify-center h-screen">
				<div className="bg-white rounded-xl shadow-md z-50">
					<Spinner className="m-4" label="Loading..." />
				</div>
			</section>
		);
	if (!user || !localStorage.getItem("oauthData"))
		return <Navigate to="/login" />;

	return <Outlet />;
};

export default AuthMiddleware;
