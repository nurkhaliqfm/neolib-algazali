import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Button, Link } from '@heroui/react';
import LogoKampus from '@/assets/logo.svg';
import AppRoutes from '@/router/routes';
import { HiOutlineHome } from 'react-icons/hi2';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const HeaderLayout = () => {
	const user = useTypedSelector((state) => state.oauth.oauthData);
	const isAuthenticated = !!localStorage.getItem('oauthData');
	const isTokenExpired = user ? Date.now() >= user.expires_in : true;

	return (
		<>
			<Navbar position="static" className="bg-primary-foreground">
				<NavbarBrand>
					<img src={LogoKampus} width={50} />
				</NavbarBrand>
				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem isActive>
						<Link href={AppRoutes.Home.path}>Home</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							Jurnal
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							E-Jurnal
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							Buku
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							E-Book
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							Skripsi
						</Link>
					</NavbarItem>
				</NavbarContent>

				<NavbarContent justify="end">
					{!isAuthenticated || isTokenExpired ? (
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href={AppRoutes.Login.path}
								variant="bordered">
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
			</Navbar>
		</>
	);
};

export default HeaderLayout;
