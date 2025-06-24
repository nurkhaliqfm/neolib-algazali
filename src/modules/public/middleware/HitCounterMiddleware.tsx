import { Outlet } from "react-router-dom";
import { hitCounter } from "../service/publicService";

const HitCounterMiddleware = () => {
	try {
		hitCounter({
			onDone: () => {},
			onError: (error) => {
				console.log("Error Request Counter", error);
			},
		});
	} catch (error) {
		console.log("Error Request Counter", error);
	}

	return <Outlet />;
};

export default HitCounterMiddleware;
