import { RepositoryItemKey } from '@/types/repository';
import { useParams } from 'react-router-dom';

const KoleksiPage = () => {
	const { koleksi } = useParams<{ koleksi: RepositoryItemKey }>();

	return <div>Koleksi {koleksi} Page</div>;
};

export default KoleksiPage;
