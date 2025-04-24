const AppRoutes = {
	//NOTE: Admin Route
	AdminDashboard: { path: '/admin/dashboard', label: 'Dashboard' },
	AdminKoleksi: { path: '/admin/koleksi', label: 'Koleksi' },
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
