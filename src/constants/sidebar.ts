import {
	HiOutlineFingerPrint,
	HiOutlineFolderOpen,
	HiOutlineHome,
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
				url: 'dashboard',
				icon: HiOutlineHome,
			},
		],
	},
	{
		tag: 'Application',
		item: [
			{
				key: 'koleksi',
				title: 'Koleksi',
				url: 'koleksi',
				icon: HiOutlineFolderOpen,
			},
			{
				key: 'transaksi',
				title: 'Transaksi',
				url: 'transaksi',
				icon: HiOutlineWallet,
			},
		],
	},
	{
		tag: 'Usar Management',
		item: [
			{
				key: 'anggota',
				title: 'Data Anggota',
				url: 'anggota',
				icon: HiOutlineUserGroup,
			},
			{
				key: 'password',
				title: 'Ubah Password',
				url: 'password',
				icon: HiOutlineFingerPrint,
			},
		],
	},
];
