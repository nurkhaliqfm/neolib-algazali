import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./router/AppRouter";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<StrictMode>
			<Provider store={store}>
				<ToastContainer
					newestOnTop
					pauseOnHover={false}
					closeOnClick
					stacked
					draggablePercent={20}
					pauseOnFocusLoss={false}
				/>
				<HeroUIProvider>
					<AppRouter />
				</HeroUIProvider>
			</Provider>
		</StrictMode>
	</BrowserRouter>
);
