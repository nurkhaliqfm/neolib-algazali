import { useTypedSelector } from "@/hooks/useTypedSelector";

const CreateKoleksiPage = () => {
	const user = useTypedSelector((state) => state.oauth.oauthData);

	return <>This is Create Koleksi Page {user?.name} </>;
};

export default CreateKoleksiPage;
