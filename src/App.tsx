import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MantineProvider, AppShell } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import { Header } from './components/Header';

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<AppShell
				padding="md"
				header={<Header />}
				styles={(theme) => ({
					main: {
						backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					},
				})}
			>
				<Outlet />
			</AppShell>
		</MantineProvider>
	);
}
