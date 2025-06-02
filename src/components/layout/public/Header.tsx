import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import { Button, Link } from '@heroui/react';
import LogoKampus from '@/assets/logo.svg';

const HeaderLayout = () => {
	return (
		<>
			<Navbar position="static">
				<NavbarBrand>
					<img src={LogoKampus} width={50} />
					{/* <p className="font-bold text-inherit">Neolib ITBA Al-Gazali Barru</p> */}
				</NavbarBrand>
				<NavbarContent className="hidden sm:flex gap-4" justify="center">
					<NavbarItem>
						<Link color="foreground" href="#">
							Features
						</Link>
					</NavbarItem>
					<NavbarItem isActive>
						<Link aria-current="page" href="#">
							Customers
						</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color="foreground" href="#">
							Integrations
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify="end">
					<NavbarItem className="hidden lg:flex">
						<Link href="#">Login</Link>
					</NavbarItem>
					<NavbarItem>
						<Button as={Link} color="primary" href="#" variant="flat">
							Sign Up
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</>
	);
};

export default HeaderLayout;
