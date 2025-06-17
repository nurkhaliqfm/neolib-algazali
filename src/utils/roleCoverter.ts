export const roleConverter = (key: number) => {
	switch (key) {
		case 2:
			return "MAHASISWA";
		case 3:
			return "UMUM";
		// case 4:
		// 	return "DOSEN";
		default:
			return "DOSEN";
		// default:
		// 	return undefined;
	}
};
