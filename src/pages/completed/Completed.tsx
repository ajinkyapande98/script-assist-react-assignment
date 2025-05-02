import { FC } from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  Group, 
  Checkbox, 
  ActionIcon, 
  Stack,
  Badge,
  Button
} from '@mantine/core';
import { IconTrash, IconArrowBack } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useTodoStore } from '../../store/todoStore';

const Completed: FC = () => {
  const { todos, toggleTodo, deleteTodo } = useTodoStore();
  const completedTodos = todos.filter(todo => todo.completed);
  
  return (
    <Container size="md" py="xl">
      <Group position="apart" mb="lg">
        <div>
          <Title order={1}>Completed Tasks</Title>
          <Text color="dimmed">Review and manage your completed tasks</Text>
        </div>
        <Badge size="lg" variant="filled" color="green">
          {completedTodos.length} completed
        </Badge>
      </Group>
      
      <Button 
        component={Link} 
        to="/" 
        leftIcon={<IconArrowBack size={16} />}
        variant="outline"
        mb="lg"
      >
        Back to All Tasks
      </Button>
      
      <Paper shadow="xs" p="md" withBorder>
        {completedTodos.length === 0 ? (
          <Text color="dimmed" align="center">No completed tasks yet.</Text>
        ) : (
          <Stack spacing="xs">
            {completedTodos.map((todo) => (
              <Paper key={todo.id} shadow="xs" p="sm" withBorder>
                <Group position="apart">
                  <Group>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <Text 
                      style={{ 
                        textDecoration: 'line-through',
                        color: 'gray'
                      }}
                    >
                      {todo.text}
                    </Text>
                  </Group>
                  <ActionIcon 
                    color="red" 
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default Completed; 