import AppRoutes from '@/router/routes';
import {
	HiOutlineAcademicCap,
	HiOutlineBookOpen,
	HiOutlineDocumentText,
	HiOutlineFingerPrint,
	HiOutlineChartPie,
	HiOutlineUserGroup,
	HiOutlineWallet,
} from 'react-icons/hi2';

export const SIDEBAR_LIST = [
	{
		tag: null,
		item: [
			{
				key: 'dashboard',
				title: 'Dashboard',
				url: AppRoutes.AdminDashboard.path,
				icon: HiOutlineChartPie,
			},
		],
	},
	{
		tag: 'Koleksi',
		item: [
			{
				key: 'jurnal',
				title: 'Jurnal',
				url: AppRoutes.AdminKoleksiJurnal.path,
				icon: HiOutlineDocumentText,
			},
			{
				key: 'ejurnal',
				title: 'E-Journal',
				url: AppRoutes.AdminKoleksiEjurnal.path,
				icon: HiOutlineDocumentText,
			},
			{
				key: 'buku',
				title: 'Buku',
				url: AppRoutes.AdminKoleksiBuku.path,
				icon: HiOutlineBookOpen,
			},
			{
				key: 'ebook',
				title: 'E-Book',
				url: AppRoutes.AdminKoleksiEbook.path,
				icon: HiOutlineBookOpen,
			},
			{
				key: 'skripsi',
				title: 'Skripsi',
				url: AppRoutes.AdminKoleksiSkripsi.path,
				icon: HiOutlineAcademicCap,
			},
		],
	},
	{
		tag: 'Pengguna',
		item: [
			{
				key: 'transaksi',
				title: 'Transaksi',
				url: AppRoutes.AdminTransaksi.path,
				icon: HiOutlineWallet,
			},
			{
				key: 'anggota',
				title: 'Data Anggota',
				url: AppRoutes.AdminAnggota.path,
				icon: HiOutlineUserGroup,
			},
			{
				key: 'password',
				title: 'Ubah Password',
				url: AppRoutes.AdminPassword.path,
				icon: HiOutlineFingerPrint,
			},
		],
	},
];
