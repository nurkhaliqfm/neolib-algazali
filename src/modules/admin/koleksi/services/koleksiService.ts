import { ApiError } from '@/types/global';
import axios, { AxiosError } from 'axios';
import { RepositoryResponse } from '../types/koleksi.type';

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListRepository = async ({
	token,
	type,
	page,
	onDone,
}: {
	token: string | null | undefined;
	type: string;
	page: string;
	onDone?: (data: RepositoryResponse) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/repository/${type}s?page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone) onDone(response.data);
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

export { getListRepository };
