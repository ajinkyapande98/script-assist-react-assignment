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
  Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { useAuthStore } from '../store/authStore';

const useStyles = createStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  active: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[0],
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.blue[7],
  }
}));

export const Header: FC = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  
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
    >
      {link.label}
    </Button>
  ));
  
  return (
    <MantineHeader height={60} className={classes.header} mb={120}>
      <Container>
        <Group position="apart" sx={{ height: '100%' }}>
          <Box component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={3}>Todo App</Title>
          </Box>
          
          <Group>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Group spacing={5}>{items}</Group>
            </MediaQuery>
            
            {isAuthenticated ? (
              <Menu position="bottom-end" shadow="md">
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
                    <Text>Signed in as</Text>
                    <Text weight={500}>{user?.username}</Text>
                  </Menu.Label>
                  <Menu.Divider />
                  <Menu.Item 
                    icon={<IconLogout size={14} />} 
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                variant="outline"
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
        <Stack>
          {links.map((link) => (
            <Button
              key={link.label}
              component={Link}
              to={link.path}
              variant={isActive(link.path) ? 'light' : 'subtle'}
              onClick={closeDrawer}
              fullWidth
            >
              {link.label}
            </Button>
          ))}
          
          {isAuthenticated ? (
            <Button
              onClick={() => {
                handleLogout();
                closeDrawer();
              }}
              color="red"
              fullWidth
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              onClick={closeDrawer}
              fullWidth
            >
              Login
            </Button>
          )}
        </Stack>
      </Drawer>
    </MantineHeader>
  );
}; 