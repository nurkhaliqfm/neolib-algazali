import { ApiError, ApiResponse } from "@/types/global";
import axios, { AxiosError } from "axios";
import {
	RepositoryBuku,
	RepositoryDetailResponse,
	RepositoryEbook,
	RepositoryEjurnal,
	RepositoryJurnal,
	RepositoryRequest,
	RepositoryResponse,
	RepositorySkripsi,
} from "../types/koleksi.type";
import { RepositoryItemKey } from "@/types/repository";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListRepository = async ({
	token,
	type,
	page,
	keyword,
	isPublic,
	limit,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	page: string;
	isPublic: boolean;
	keyword?: string;
	limit?: string;
	onDone?: (data: RepositoryResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	const baseUrl = isPublic
		? `${VITE_SERVER_BASE_URL}/public`
		: `${VITE_SERVER_BASE_URL}/admin/repository`;
	try {
		const response = await axios.get(
			`${baseUrl}/${type}s?page=${page}${keyword ? `&keyword=${keyword}` : ""}${
				limit ? `&limit=${limit}` : ""
			}`,
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
			if (onError)
				onError({
					status: axiosError.response?.status || 500,
					error: axiosError.message,
				});
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

export { getListRepository };
