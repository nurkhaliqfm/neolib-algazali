const AppRoutes = {
	//NOTE: Admin Route
	AdminDashboard: { path: '/admin/dashboard', label: 'Dashboard' },
	AdminKoleksiJurnal: { path: '/admin/koleksi-jurnal', label: 'Koleksi' },
	AdminKoleksiEjurnal: { path: '/admin/koleksi-ejurnal', label: 'Koleksi' },
	AdminKoleksiBuku: { path: '/admin/koleksi-buku', label: 'Koleksi' },
	AdminKoleksiEbook: { path: '/admin/koleksi-ebook', label: 'Koleksi' },
	AdminKoleksiSkripsi: { path: '/admin/koleksi-skripsi', label: 'Koleksi' },
	AdminAnggota: { path: '/admin/anggota', label: 'Anggota' },
	AdminPassword: { path: '/admin/password', label: 'Password' },
	AdminTransaksi: { path: '/admin/transaksi', label: 'Transaksi' },

	// NOTE: Initial Route
	Home: { path: '/', label: 'E-Library ITB Al-Gazali Barru' },

	// NOTE: Others Route
	Error: { path: '/error', label: 'Error Page' },
	Forbidden: { path: '/forbidden', label: 'Forbidden Page' },
};

export default AppRoutes;
