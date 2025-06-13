export async function downloadBebasPustaka({
	file,
	name,
}: {
	file: string;
	name: string;
}) {
	const blob = new Blob([file], { type: "application/pdf" });
	const link = document.createElement("a");
	link.href = window.URL.createObjectURL(blob);
	link.download = name;
	link.click();

	window.URL.revokeObjectURL(link.href);
}
