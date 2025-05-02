import { FC, useState } from 'react';
import { 
  Container, 
  Paper, 
  Title, 
  TextInput, 
  PasswordInput, 
  Button, 
  Text, 
  Group, 
  Alert
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuthStore } from '../../store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';

const Login: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length > 0 ? null : 'Username is required'),
      password: (value) => (value.length > 0 ? null : 'Password is required'),
    },
  });
  
  const handleSubmit = async (values: { username: string; password: string }) => {
    setError(null);
    setLoading(true);
    
    try {
      const success = await login(values.username, values.password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password. Try demo/password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  // If already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <Container size="xs" py="xl">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} mb="md" ta="center">
          Welcome to Todo App
        </Title>
        
        <Text color="dimmed" size="sm" ta="center" mb="xl">
          Please log in to manage your tasks
        </Text>
        
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
            {error}
          </Alert>
        )}
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="Your username"
            {...form.getInputProps('username')}
            mb="md"
          />
          
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            mb="xl"
          />
          
          <Group position="apart">
            <Text size="xs" color="dimmed">
              Try: demo / password
            </Text>
            <Button type="submit" loading={loading}>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 