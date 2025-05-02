import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import About from './pages/about/About';
import Completed from './pages/completed/Completed';
import Login from './pages/login/Login';
import StarWarsList from './pages/starwars/StarWarsList';
import StarWarsDetail from './pages/starwars/StarWarsDetail';
import { ProtectedRoute } from './components/ProtectedRoute';

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <ProtectedRoute><Landing /></ProtectedRoute>
			},
			{
				path: '/about',
				element: <About />
			},
			{
				path: '/completed',
				element: <ProtectedRoute><Completed /></ProtectedRoute>
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/starwars',
				element: <ProtectedRoute><StarWarsList /></ProtectedRoute>
			},
			{
				path: '/starwars/:id',
				element: <ProtectedRoute><StarWarsDetail /></ProtectedRoute>
			}
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
