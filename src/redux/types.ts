export interface OAuthData {
	expires_in: number | null;
	access_token: string | null;
	name: string | null;
	role: string | null;
}

export interface SetTokenAction {
	type: 'oauth/setToken';
	payload: {
		expires_in: number;
		access_token: string;
		name: string;
		role: string;
	};
}

export interface ClearTokenAction {
	type: 'oauth/clearToken';
}

export type AuthActionTypes = SetTokenAction | ClearTokenAction;
