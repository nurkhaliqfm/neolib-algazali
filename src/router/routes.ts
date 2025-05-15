const AppRoutes = {
	//NOTE: Admin Route
	AdminDashboard: {
		path: "/admin/dashboard",
		label: "Dashboard Admin E-Library",
	},

	AdminKoleksi: {
		path: "/admin/koleksi/:koleksi",
		label: "Admin Koleksi E-Library",
	},
	AdminKoleksiJurnal: {
		path: "/admin/koleksi/jurnal",
		label: "Admin Koleksi Jurnal E-library",
	},
	AdminKoleksiEjurnal: {
		path: "/admin/koleksi/ejurnal",
		label: "Admin Koleksi E-jurnal E-library",
	},
	AdminKoleksiBuku: {
		path: "/admin/koleksi/buku",
		label: "Admin Koleksi Buku E-library",
	},
	AdminKoleksiEbook: {
		path: "/admin/koleksi/ebook",
		label: "Admin Koleksi Ebook E-library",
	},
	AdminKoleksiSkripsi: {
		path: "/admin/koleksi/skripsi",
		label: "Admin Koleksi Skripsi E-library",
	},

	AdminDetailKoleksi: {
		path: "/admin/koleksi/:koleksi/detail",
		label: "Admin Detial Koleksi E-Library",
	},

	AdminEditKoleksi: {
		path: "/admin/koleksi/:koleksi/edit",
		label: "Admin Edit Koleksi E-Library",
	},

	AdminAnggota: { path: "/admin/anggota", label: "Anggota" },
	AdminPassword: { path: "/admin/password", label: "Password" },
	AdminTransaksi: { path: "/admin/transaksi", label: "Transaksi" },

	// NOTE: Initial Route
	Home: { path: "/", label: "E-Library ITB Al-Gazali Barru" },

	// NOTE: Others Route
	Login: { path: "/login", lable: "Login Page" },
	Error: { path: "/error", label: "Error Page" },
	Forbidden: { path: "/forbidden", label: "Forbidden Page" },
};

export default AppRoutes;
