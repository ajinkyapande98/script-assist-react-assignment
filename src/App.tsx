import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider, AppShell, ColorSchemeProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { theme } from './theme';
import './App.scss';
import { Header } from './components/Header';

export default function App() {
	const { pathname } = useLocation();
	const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
		key: 'color-scheme',
		defaultValue: 'light',
	});

	const toggleColorScheme = () => {
		setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider 
				theme={{ ...theme, colorScheme }} 
				withGlobalStyles 
				withNormalizeCSS
			>
				<AppShell
					className="app-shell"
					padding="md"
					header={<Header />}
					styles={(theme) => ({
						main: {
							backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
							paddingTop: '80px',
						},
					})}
				>
					<div className="page-container fade-in">
						<Outlet />
					</div>
				</AppShell>
				<Notifications position="top-right" limit={5} />
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
