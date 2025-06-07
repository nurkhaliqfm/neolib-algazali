import { ApiError } from "@/types/global";
import axios, { AxiosError } from "axios";
import { TransaksiResponse } from "../types/transaksi.type";

const { VITE_SERVER_BASE_URL } = import.meta.env;

const getListTransaksi = async ({
	token,
	page,
	keyword,
	limit,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	page: string;
	keyword?: string;
	limit?: string;
	onDone?: (data: TransaksiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/transaksi/list?page=${page}${
				keyword ? `&keyword=${keyword}` : ""
			}${limit ? `&limit=${limit}` : ""}`,
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

export { getListTransaksi };
