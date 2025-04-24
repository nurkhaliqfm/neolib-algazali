import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '../ui/sidebar';
import HeaderLayout from './Header';
import { AppSidebar } from './Sidebar';

const DashboardLayout = () => {
	return (
		<main className="w-screen">
			<SidebarProvider defaultOpen>
				<section className="flex w-full">
					<AppSidebar />
					<SidebarInset>
						<HeaderLayout />
						<section className="w-full p-4">
							<Outlet />
						</section>
					</SidebarInset>
				</section>
			</SidebarProvider>
		</main>
	);
};

export default DashboardLayout;
