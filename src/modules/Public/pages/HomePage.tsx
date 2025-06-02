import CarouselBanner from '../components/CarouselBanner';

function HomePage() {
	return (
		<section className="px-6">
			<CarouselBanner />
			<section>Body</section>
			<section>Rekomendasi Repository</section>
			<section>List Rekomendasi</section>
			<section>Publikasi Jurnal</section>
		</section>
	);
}

export default HomePage;
