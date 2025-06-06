import { Outlet } from 'react-router-dom';
import HeaderLayout from './Header';
import FooterLayout from './Footer';

const BaseLayout = () => {
	return (
		<>
			<HeaderLayout />
			<main className="flex min-h-screen bg-primary-foreground">
				<div className="flex flex-col flex-1 lg:ml-0 overflow-x-hidden">
					<div className="flex-1 max-w-5xl mx-auto w-full">
						<Outlet />
					</div>
					<FooterLayout />
				</div>
			</main>
		</>
	);
};

export default BaseLayout;
