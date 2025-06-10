import { ApiError } from "@/types/global";
import axios, { AxiosError } from "axios";
import { AnggotaResponse } from "../types/anggota.type";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListAnggota = async ({
	token,
	type,
	page,
	keyword,
	limit,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	type: string;
	page: string;
	keyword?: string;
	limit?: string;
	onDone?: (data: AnggotaResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/anggota/${type}s?page=${page}${
				keyword ? `&keyword=${keyword}` : ""
			}${limit ? `&limit=${limit}` : ""}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log("Response Data:", response.data);

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

export { getListAnggota };
