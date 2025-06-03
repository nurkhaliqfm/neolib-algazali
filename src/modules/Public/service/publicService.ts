import { RepositoryDetailResponse } from '@/modules/admin/koleksi/types/koleksi.type';
import { ApiError } from '@/types/global';
import axios, { AxiosError } from 'axios';

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListRekomendasiRepository = async ({
	onDone,
	onError,
}: {
	onDone?: (data: RepositoryDetailResponse[]) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/public/repository/rekomendasi`
		);

		if (onDone) onDone(response.data.repository);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem('authData');
				window.location.reload();
			}
		}
		throw error;
	}
};

export { getListRekomendasiRepository };
