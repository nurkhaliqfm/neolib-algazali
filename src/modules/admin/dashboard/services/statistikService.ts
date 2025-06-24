import { ApiError } from "@/types/global";
import {
	StatistikResponse,
	StatistikTransaksiResponse,
	StatistikVisitorResponse,
} from "@/types/statistik";
import axios, { AxiosError } from "axios";
import { TransaksiDetailResponse } from "../../transaksi/types/transaksi.type";
import axiosPrivate from "@/utils/axiosPrivate";

const getDataStatistik = async ({
	token,
	onDone,
}: {
	token: string | null | undefined;
	onDone?: (data: StatistikResponse) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(`/statistik/repository`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

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
		const response = await axiosPrivate.get(`/statistik/transaksi`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

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
		const response = await axiosPrivate.get(`/statistik/transaksi/latest`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

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

const getDataVisitor = async ({
	token,
	onDone,
}: {
	token: string | null | undefined;
	onDone?: (data: StatistikVisitorResponse[]) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(`/statistik/visitor`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

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

export {
	getDataStatistik,
	getDataStatistikTransaksi,
	getDataLatestTransaksi,
	getDataVisitor,
};
