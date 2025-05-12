export const moneyConverter = (money: string | undefined) => {
	if (!money) return "Rp. -";

	const number = Number(money);
	return number?.toLocaleString("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
};
