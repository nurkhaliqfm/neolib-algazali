import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@heroui/navbar';
import { Button, Link } from '@heroui/react';
import LogoKampus from '@/assets/logo.svg';
import AppRoutes from '@/router/routes';
import {
	HiOutlineHome,
	HiOutlineSquares2X2,
	HiOutlineXMark,
} from 'react-icons/hi2';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const HeaderLayout = () => {
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const location = useLocation();
	const currentPathLocation = location.pathname;
	console.log(currentPathLocation);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isAuthenticated = !!localStorage.getItem('oauthData');
	const isTokenExpired = user ? Date.now() >= user.expires_in : true;

	const routeNavbarList = [
		{
			label: 'Jurnal',
			key: 'jurnal',
			route: AppRoutes.KoleksiJurnal.path,
		},
		{
			label: 'E-Jurnal',
			key: 'ejurnal',
			route: AppRoutes.KoleksiEjurnal.path,
		},
		{
			label: 'Buku',
			key: 'buku',
			route: AppRoutes.KoleksiBuku.path,
		},
		{
			label: 'E-Book',
			key: 'ebook',
			route: AppRoutes.KoleksiEbook.path,
		},
		{
			label: 'Skripsi',
			key: 'skripsi',
			route: AppRoutes.KoleksiSkripsi.path,
		},
	];

	return (
		<>
			<Navbar
				isBordered
				isBlurred
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={setIsMenuOpen}
				position="static"
				className="bg-primary-foreground">
				<NavbarMenuToggle
					icon={
						isMenuOpen ? (
							<HiOutlineXMark size={60} />
						) : (
							<HiOutlineSquares2X2 size={60} />
						)
					}
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>

				<NavbarBrand className="hidden sm:flex gap-4">
					<img src={LogoKampus} width={50} />
				</NavbarBrand>

				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem
						isActive={currentPathLocation === '/'}
						key={`header-navbar-home`}>
						<Link
							color={currentPathLocation === '/' ? 'primary' : 'foreground'}
							href={AppRoutes.Home.path}>
							Home
						</Link>
					</NavbarItem>
					{routeNavbarList.map((item) => {
						return (
							<NavbarItem
								isActive={currentPathLocation === item.route}
								key={`header-navbar-${item.key}`}>
								<Link
									color={
										currentPathLocation === item.route
											? 'primary'
											: 'foreground'
									}
									href={item.route}>
									{item.label}
								</Link>
							</NavbarItem>
						);
					})}
				</NavbarContent>

				<NavbarContent justify="end">
					{!isAuthenticated || isTokenExpired ? (
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href={AppRoutes.Login.path}
								variant="light">
								<HiOutlineHome /> Login
							</Button>
						</NavbarItem>
					) : (
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href={AppRoutes.AdminDashboard.path}
								variant="flat">
								<HiOutlineHome /> Dashboard
							</Button>
						</NavbarItem>
					)}
				</NavbarContent>

				<NavbarMenu>
					<NavbarMenuItem
						isActive={currentPathLocation === '/'}
						key={`toggle-navbar-home`}>
						<Link
							color={currentPathLocation === '/' ? 'primary' : 'foreground'}
							href={AppRoutes.Home.path}>
							Home
						</Link>
					</NavbarMenuItem>
					{routeNavbarList.map((item) => {
						return (
							<NavbarMenuItem
								isActive={currentPathLocation === item.route}
								key={`toggle-navbar-${item.key}`}>
								<Link
									color={
										currentPathLocation === item.route
											? 'primary'
											: 'foreground'
									}
									href={item.route}>
									{item.label}
								</Link>
							</NavbarMenuItem>
						);
					})}
				</NavbarMenu>
			</Navbar>
		</>
	);
};

export default HeaderLayout;
