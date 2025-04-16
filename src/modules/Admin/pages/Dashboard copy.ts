import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	Input,
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
} from "@heroui/react";
import Logo from "@/assets/logo.svg";
import Profile from "@/assets/profile.jpg";
import { CiSearch } from "react-icons/ci";

function App() {
	const isLogin = false;

	return (
		<main className="w-full h-screen overflow-y-hidden pb-16 bg-red-50">
			<Navbar className="bg-red-50">
				<NavbarContent justify="start">
					<NavbarBrand className="mr-4">
						<img src={Logo} width={50} />
						<div className="leading-4 ml-2">
							<p className="hidden sm:block leading-5 text-lg font-bold text-inherit">
								Perpustakaan
							</p>
							<p className="hidden sm:block text-xs font-bold text-inherit">
								ITBA Al-Gazali Barru
							</p>
						</div>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent as="div" className="items-center" justify="end">
					<Input
						classNames={{
							base: "max-w-full sm:max-w-[20rem] h-10",
							mainWrapper: "h-full",
							input: "text-small",
							inputWrapper:
								"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
						}}
						placeholder="Type to search..."
						size="sm"
						startContent={<CiSearch size={24} />}
						type="search"
					/>

					{isLogin && (
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								<Avatar
									isBordered
									as="button"
									className="transition-transform"
									color="default"
									name="Admin Perpustakaan"
									size="sm"
									src={Profile}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label="Profile Actions" variant="flat">
								<DropdownItem key="profile" className="h-14 gap-2">
									<p className="font-semibold">Signed in as</p>
									<p className="font-semibold">Admin Perpustakaan</p>
								</DropdownItem>
								<DropdownItem key="home">Home</DropdownItem>
								<DropdownItem key="dashboard">Dashboard</DropdownItem>
								<DropdownItem key="logout" color="danger">
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)}
				</NavbarContent>
			</Navbar>

			<section className="flex h-full flex-col items-center justify-center max-w-[90rem] mx-auto p-8 pt-4">
				<div className="mb-4">Navigation</div>
				<div className="w-full h-full bg-orange- text-center shadow-sm p-8 rounded-3xl">
					Main Content
				</div>
			</section>
		</main>
	);
}

export default App;
