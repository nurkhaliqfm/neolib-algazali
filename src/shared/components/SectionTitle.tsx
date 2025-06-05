import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

export const SectionTitleContent = ({
	title,
	description,
	icon,
}: {
	icon: IconType;
	title: string;
	description?: string;
}) => {
	const Icon = icon;
	return (
		<div className="flex items-center gap-x-3">
			<div className="hidden sm:inline rounded-full bg-primary/10">
				<Icon size={35} className="text-primary-800 m-3" />
			</div>
			<div>
				<p className="text-primary-800 text-2xl font-medium">{title}</p>
				<span
					className={cn(
						"text-primary-800 text-sm font-light",
						!description ? "hidden" : ""
					)}>
					{description}
				</span>
			</div>
		</div>
	);
};
