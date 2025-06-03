const AppRoutes = {
	//NOTE: Admin Route
	AdminDashboard: {
		path: '/admin/dashboard',
		label: 'Dashboard Admin E-Library | ITB Al-Gazali Barru',
	},

	AdminKoleksi: {
		path: '/admin/koleksi/:koleksi',
		label: 'Admin Koleksi E-Librar | ITB Al-Gazali Barru',
	},
	AdminKoleksiJurnal: {
		path: '/admin/koleksi/jurnal',
		label: 'Admin Koleksi Jurnal E-library | ITB Al-Gazali Barru',
	},
	AdminKoleksiEjurnal: {
		path: '/admin/koleksi/ejurnal',
		label: 'Admin Koleksi E-jurnal E-library | ITB Al-Gazali Barru',
	},
	AdminKoleksiBuku: {
		path: '/admin/koleksi/buku',
		label: 'Admin Koleksi Buku E-library | ITB Al-Gazali Barru',
	},
	AdminKoleksiEbook: {
		path: '/admin/koleksi/ebook',
		label: 'Admin Koleksi Ebook E-library | ITB Al-Gazali Barru',
	},
	AdminKoleksiSkripsi: {
		path: '/admin/koleksi/skripsi',
		label: 'Admin Koleksi Skripsi E-library | ITB Al-Gazali Barru',
	},

	AdminDetailKoleksi: {
		path: '/admin/koleksi/:koleksi/detail',
		label: 'Admin Detial Koleksi E-Library | ITB Al-Gazali Barru',
	},

	AdminEditKoleksi: {
		path: '/admin/koleksi/:koleksi/edit',
		label: 'Admin Edit Koleksi E-Library | ITB Al-Gazali Barru',
	},

	AdminCreateKoleksi: {
		path: '/admin/koleksi/:koleksi/create',
		label: 'Admin Tambah Koleksi E-Library | ITB Al-Gazali Barru',
	},

	AdminAnggota: { path: '/admin/anggota', label: 'Anggota' },
	AdminPassword: { path: '/admin/password', label: 'Password' },
	AdminTransaksi: { path: '/admin/transaksi', label: 'Transaksi' },

	// NOTE: Initial Route
	Home: { path: '/', label: 'Home E-Library | ITB Al-Gazali Barru' },
	Koleksi: {
		path: '/koleksi/:koleksi',
		label: 'Koleksi E-Library | ITB Al-Gazali Barru',
	},
	KoleksiDetail: {
		path: '/koleksi/detail/:koleksi',
		label: 'Koleksi Detail E-Library | ITB Al-Gazali Barru',
	},
	KoleksiJurnal: {
		path: '/koleksi/jurnal',
		label: 'Koleksi Jurnal E-Library | ITB Al-Gazali Barru',
	},
	KoleksiEjurnal: {
		path: '/koleksi/ejurnal',
		label: 'Koleksi E-Jurnal E-Library | ITB Al-Gazali Barru',
	},
	KoleksiBuku: {
		path: '/koleksi/buku',
		label: 'Koleksi Buku E-Library | ITB Al-Gazali Barru',
	},
	KoleksiEbook: {
		path: '/koleksi/ebook',
		label: 'Koleksi E-Book E-Library | ITB Al-Gazali Barru',
	},
	KoleksiSkripsi: {
		path: '/koleksi/skripsi',
		label: 'Koleksi Skripsi E-Library | ITB Al-Gazali Barru',
	},

	// NOTE: Others Route
	Login: { path: '/login', lable: 'Login | ITB Al-Gazali Barru' },
	Error: { path: '/error', label: 'Error | ITB Al-Gazali Barru' },
	Forbidden: { path: '/forbidden', label: 'Forbidden | ITB Al-Gazali Barru' },
};

export default AppRoutes;
