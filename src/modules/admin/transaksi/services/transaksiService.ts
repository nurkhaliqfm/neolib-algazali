import { ApiError, ApiResponse } from "@/types/global";
import axios, { AxiosError } from "axios";
import {
	TransaksiDetailResponse,
	TransaksiResponse,
} from "../types/transaksi.type";
import axiosPrivate from "@/utils/axiosPrivate";

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
		const response = await axiosPrivate.get(
			`/transaksi/list?page=${page}${keyword ? `&keyword=${keyword}` : ""}${
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

const getDetailTransaksi = async ({
	token,
	transaksi,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	transaksi: string;
	onDone?: (data: TransaksiDetailResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(
			`/transaksi/detail?transaksi=${transaksi}`,
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

const createTransaksi = async ({
	token,
	data,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	data: {
		user: number;
		repos: number;
		type: "JURNAL" | "EJURNAL" | "BUKU" | "EBOOK" | "SKRIPSI";
	};
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.post(`/transaksi/create`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Transaksi peminjaman created successfully",
			});
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

const updateTransaksi = async ({
	token,
	data,
	slug,
	transaksi,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	data: {
		user: number;
		repos: number;
		type: "JURNAL" | "EJURNAL" | "BUKU" | "EBOOK" | "SKRIPSI";
	};
	slug: "update" | "returned" | "extended";
	transaksi: number;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.patch(
			`/transaksi/${slug}?transaksi=${transaksi}`,
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Transaksi peminjaman update successfully",
			});
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

const deleteTransaksi = async ({
	token,
	transaksi,
	onDone,
	onError,
}: {
	token: string | null | undefined;
	transaksi: number;
	onDone?: (data: ApiResponse) => void | undefined;
	onError?: (data: ApiError) => void | undefined;
}) => {
	try {
		const response = await axiosPrivate.get(
			`/transaksi/delete?transaksi=${transaksi}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (onDone)
			onDone({
				status: response.status,
				message:
					response.data.message || "Transaksi peminjaman successfully deleted",
			});
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

export {
	getListTransaksi,
	createTransaksi,
	getDetailTransaksi,
	updateTransaksi,
	deleteTransaksi,
};
