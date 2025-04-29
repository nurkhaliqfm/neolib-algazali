import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './router/App';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StrictMode>
			<HeroUIProvider>
				<App />
			</HeroUIProvider>
		</StrictMode>
	</BrowserRouter>
);
