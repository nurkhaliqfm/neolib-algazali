import LogoKampus from '@/assets/logo.svg';
import AppRoutes from '@/router/routes';
import { Link } from '@heroui/react';

const FooterLayout = () => {
	return (
		<section className="flex flex-col bg-primary/20">
			<div className="max-w-5xl p-2 mx-auto w-full px-6">
				<div className="flex flex-col items-center md:justify-between md:flex-row border-b-2 border-primary-800/10 py-4 px-2 mt-10">
					<div className="flex flex-col md:flex-row items-center gap-x-4">
						<img src={LogoKampus} className="w-52 md:w-24" />
						<section className="leading-4 text-center md:text-start">
							<h2 className="font-bold text-primary-900 text-2xl md:text-lg md:leading-6">
								Perpustakaan
							</h2>
							<p className="text-sm text-primary-900 font-medium">
								ITBA Al-Gazali Barru
							</p>
						</section>
					</div>
					<div className="flex gap-x-2 mt-4 md:mt-0 h-full">
						<Link
							color="foreground"
							className="font-light text-xs sm:text-base hidden sm:inline"
							href={AppRoutes.Home.path}>
							Home
						</Link>
						<Link
							color="foreground"
							className="font-light text-xs sm:text-base"
							href={AppRoutes.KoleksiJurnal.path}>
							Jurnal
						</Link>
						<Link
							color="foreground"
							className="font-light text-xs sm:text-base"
							href={AppRoutes.KoleksiEjurnal.path}>
							E-jurnal
						</Link>
						<Link
							color="foreground"
							className="font-light text-xs sm:text-base"
							href={AppRoutes.KoleksiBuku.path}>
							Buku
						</Link>
						<Link
							color="foreground"
							className="font-light text-xs sm:text-base"
							href={AppRoutes.KoleksiEbook.path}>
							E-Book
						</Link>
						<Link
							color="foreground"
							className="font-light text-xs sm:text-base"
							href={AppRoutes.KoleksiSkripsi.path}>
							Skripsi
						</Link>
					</div>
				</div>
				<div className="flex justify-center py-4 mb-1 items-center">
					<p className="text-xs font-light">
						<span>copyright © 2025. </span>
						<span className="hidden sm:inline">ITBA Al-Gazali Barru - </span>
						<span>111FMLabs</span>.
					</p>
				</div>
			</div>
			<div className="w-full bg-primary-900 h-5"></div>
		</section>
	);
};

export default FooterLayout;
