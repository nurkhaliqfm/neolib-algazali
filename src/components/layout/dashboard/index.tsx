import { Outlet } from "react-router-dom";
import HeaderLayout from "./Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "./Sidebar";

const DashboardLayout = () => {
	return (
		<>
			<SidebarProvider defaultOpen>
				<section className="flex w-full">
					<SidebarLayout />
					<SidebarInset>
						<HeaderLayout />
						<section className="w-full">
							<Outlet />
						</section>
					</SidebarInset>
				</section>
			</SidebarProvider>
		</>
	);
};

export default DashboardLayout;
