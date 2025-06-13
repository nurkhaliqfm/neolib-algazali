import { ApiError } from "@/types/global";
import {
	StatistikResponse,
	StatistikTransaksiResponse,
} from "@/types/statistik";
import axios, { AxiosError } from "axios";
import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";

const { VITE_SERVER_BASE_URL } = import.meta.env;

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
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (onDone) onDone(response.data);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ApiError>;
			if (axiosError.response?.status === 401) {
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const getDataStatistikTransaksi = async ({
	token,
	onDone,
}: {
	token: string | null | undefined;
	onDone?: (data: StatistikTransaksiResponse[]) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/statistik/transaksi`,
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
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

const getDataLatestTransaksi = async ({
	token,
	onDone,
}: {
	token: string | null | undefined;
	onDone?: (data: TransaksiDetailResponse[]) => void | undefined;
}) => {
	try {
		const response = await axios.get(
			`${VITE_SERVER_BASE_URL}/admin/statistik/transaksi/latest`,
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
				localStorage.removeItem("authData");
				window.location.reload();
			}
		}
		throw error;
	}
};

export { getDataStatistik, getDataStatistikTransaksi, getDataLatestTransaksi };
