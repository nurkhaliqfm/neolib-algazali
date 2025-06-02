import { Outlet } from 'react-router-dom';
import HeaderLayout from './Header';
import FooterLayout from './Footer';

const BaseLayout = () => {
	return (
		<main className="flex min-h-screen bg-primary-foreground">
			<div className="flex flex-col flex-1 lg:ml-0 overflow-x-hidden">
				<HeaderLayout />
				<div className="flex-1 max-w-5xl mx-auto w-full p-6">
					<Outlet />
				</div>
				<FooterLayout />
			</div>
		</main>
	);
};

export default BaseLayout;
