import { ApiError } from '@/types/global';
import { StatistikResponse } from '@/types/statistik';
import axios, { AxiosError } from 'axios';

const { VITE_SERVER_BASE_URL, VITE_DEFAULT_TOKEN_OAUTH2 } = import.meta.env;

const getDataStatistik = async ({
	token,
	onDone,
}: {
	token: string | null | undefined;
	onDone?: (data: StatistikResponse) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/statistik/repository`,
			{
				headers: {
					Authorization: `Bearer ${
						token === '' ? VITE_DEFAULT_TOKEN_OAUTH2 : token
					}`,
				},
			}
		);

		if (onDone) onDone(response.data);

		// return response.data.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (axiosError.response?.status === 401) {
				localStorage.removeItem('authData');
				window.location.reload();
			}
		}
		throw error;
	}
};

export { getDataStatistik };
