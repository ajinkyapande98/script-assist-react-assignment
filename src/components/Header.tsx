import { FC } from 'react';
import { 
  Header as MantineHeader, 
  Container, 
  Group, 
  Title, 
  Button, 
  Burger, 
  Drawer, 
  Stack,
  useMantineTheme,
  createStyles,
  MediaQuery,
  Avatar,
  Menu,
  Text,
  Box,
  ActionIcon,
  useMantineColorScheme,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconLogout, IconUser, IconSun, IconMoon, IconBrandGithub } from '@tabler/icons-react';
import { useAuthStore } from '../store/authStore';

const useStyles = createStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    zIndex: 100,
  },
  active: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.blue[7],
  },
  logo: {
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 700,
    fontSize: '1.5rem',
  },
  colorToggle: {
    color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
  }
}));

export const Header: FC = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Completed', path: '/completed' },
    { label: 'Star Wars', path: '/starwars' },
  ];
  
  const items = links.map((link) => (
    <Button
      key={link.label}
      component={Link}
      to={link.path}
      variant={isActive(link.path) ? 'light' : 'subtle'}
      className={cx({ [classes.active]: isActive(link.path) })}
      radius="md"
    >
      {link.label}
    </Button>
  ));
  
  return (
    <MantineHeader height={60} className={classes.header}>
      <Container sx={{ height: '100%' }}>
        <Group position="apart" sx={{ height: '100%' }}>
          <Box component={Link} to="/" className={classes.logo}>
            <Group spacing="xs">
              <Title order={3}>Todo App</Title>
            </Group>
          </Box>
          
          <Group spacing="sm">
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Group spacing={5}>{items}</Group>
            </MediaQuery>
            
            <Tooltip label={isDark ? 'Light mode' : 'Dark mode'} position="bottom">
              <ActionIcon 
                variant="subtle" 
                onClick={() => toggleColorScheme()} 
                size="lg"
                className={classes.colorToggle}
              >
                {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="View source code" position="bottom">
              <ActionIcon
                component="a" 
                href="https://github.com/ajinkyapande98/script-assist-react-assignment" 
                target="_blank"
                variant="subtle"
                size="lg"
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
            </Tooltip>
            
            {isAuthenticated ? (
              <Menu position="bottom-end" shadow="md" width={200}>
                <Menu.Target>
                  <Avatar 
                    color="blue" 
                    radius="xl" 
                    sx={{ cursor: 'pointer' }}
                  >
                    {user?.username.charAt(0).toUpperCase()}
                  </Avatar>
                </Menu.Target>
                
                <Menu.Dropdown>
                  <Menu.Label>
                    <Text size="sm">Signed in as</Text>
                    <Text weight={500}>{user?.username}</Text>
                  </Menu.Label>
                  <Menu.Divider />
                  <Menu.Item 
                    icon={<IconLogout size={14} />} 
                    onClick={handleLogout}
                    color="red"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="filled"
                radius="md"
              >
                Login
              </Button>
            )}
            
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
          </Group>
        </Group>
      </Container>
      
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        zIndex={1000000}
      >
        <Stack spacing="md">
          {links.map((link) => (
            <Button
              key={link.label}
              component={Link}
              to={link.path}
              variant={isActive(link.path) ? 'light' : 'subtle'}
              onClick={closeDrawer}
              fullWidth
              radius="md"
            >
              {link.label}
            </Button>
          ))}
          
          <Group position="center" my="md">
            <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
              <ActionIcon 
                variant="outline" 
                onClick={() => toggleColorScheme()} 
                size="lg"
                className={classes.colorToggle}
              >
                {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
              </ActionIcon>
            </Tooltip>
          </Group>
          
          {isAuthenticated ? (
            <Button
              onClick={() => {
                handleLogout();
                closeDrawer();
              }}
              color="red"
              fullWidth
              leftIcon={<IconLogout size={16} />}
              radius="md"
            >
              Logout ({user?.username})
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              onClick={closeDrawer}
              fullWidth
              radius="md"
            >
              Login
            </Button>
          )}
        </Stack>
      </Drawer>
    </MantineHeader>
  );
}; 