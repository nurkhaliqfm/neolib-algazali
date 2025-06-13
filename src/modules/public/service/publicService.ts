import { RepositoryDetailResponse } from "@/modules/admin/koleksi/types/koleksi.type";
import { ApiError } from "@/types/global";
import axios, { AxiosError } from "axios";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListRekomendasiRepository = async ({
	limit,
	repos,
	onDone,
	onError,
}: {
	limit?: string;
	repos?: string;
	onDone?: (data: RepositoryDetailResponse[]) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/public/repository/rekomendasi?${
				limit ? `limit=${limit}` : ""
			}${limit && repos ? "&" : ""}${repos ? `repos=${repos}` : ""}`
		);

		if (onDone) onDone(response.data.repository);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.response?.data.error || axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

export { getListRekomendasiRepository };
