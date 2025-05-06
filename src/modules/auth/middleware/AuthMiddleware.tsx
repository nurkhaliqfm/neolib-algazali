import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Navigate, Outlet } from 'react-router-dom';
import { refresh } from '../services/oauthService';
import { useDispatch } from 'react-redux';
import { OAuthData } from '@/redux/types';
import { clearOAuthData, setOAuthData } from '../oauthSlice';

const AuthMiddleware = () => {
	const dispatch = useDispatch();
	const user = useTypedSelector((state) => state.oauth.oauthData);

	if (user) {
		const isAuthenticated = !!localStorage.getItem('oauthData');
		const isTokenExpired = Date.now() >= user.expires_in;

		if (!isAuthenticated) {
			return <Navigate to={'/login'} />;
		} else if (isTokenExpired) {
			refresh(user.access_token)
				.then((oauthData: OAuthData) => {
					dispatch(setOAuthData(oauthData));
				})
				.catch(() => {
					dispatch(clearOAuthData());
					return <Navigate to={'/login'} />;
				});
		}
	} else {
		return <Navigate to={'/login'} />;
	}

	return <Outlet />;
};

export default AuthMiddleware;
