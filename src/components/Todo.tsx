import { FC, useState } from 'react';
import { 
  Box, 
  TextInput, 
  Button, 
  Group, 
  Paper, 
  Title, 
  ActionIcon, 
  Text,
  Checkbox,
  Stack,
  Divider
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash, IconEdit } from '@tabler/icons-react';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoProps {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const Todo: FC<TodoProps> = ({ 
  todos, 
  addTodo, 
  toggleTodo, 
  deleteTodo,
  editTodo 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const addForm = useForm({
    initialValues: {
      todoText: '',
    },
    validate: {
      todoText: (value) => (value.trim().length > 0 ? null : 'Todo cannot be empty'),
    },
  });

  const editForm = useForm({
    initialValues: {
      editText: '',
    },
    validate: {
      editText: (value) => (value.trim().length > 0 ? null : 'Todo cannot be empty'),
    },
  });

  const handleSubmit = (values: { todoText: string }) => {
    addTodo(values.todoText.trim());
    addForm.reset();
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    editForm.setValues({ editText: text });
  };

  const handleEdit = (id: string) => {
    if (editForm.validate().hasErrors) return;
    editTodo(id, editForm.values.editText.trim());
    setEditingId(null);
  };

  return (
    <Box>
      <Paper shadow="xs" p="md" withBorder mb="md">
        <form onSubmit={addForm.onSubmit(handleSubmit)}>
          <Title order={3} mb="md">Add New Todo</Title>
          <Group spacing="sm">
            <TextInput
              placeholder="What needs to be done?"
              style={{ flex: 1 }}
              {...addForm.getInputProps('todoText')}
            />
            <Button type="submit">Add</Button>
          </Group>
        </form>
      </Paper>

      <Paper shadow="xs" p="md" withBorder>
        <Title order={3} mb="md">Todo List</Title>
        {todos.length === 0 ? (
          <Text color="dimmed" align="center">No todos yet. Add your first task above!</Text>
        ) : (
          <Stack spacing="xs">
            {todos.map((todo) => (
              <Paper key={todo.id} shadow="xs" p="sm" withBorder>
                {editingId === todo.id ? (
                  <Group position="apart">
                    <TextInput
                      style={{ flex: 1 }}
                      {...editForm.getInputProps('editText')}
                    />
                    <Group spacing="xs">
                      <Button size="xs" onClick={() => handleEdit(todo.id)}>Save</Button>
                      <Button size="xs" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                    </Group>
                  </Group>
                ) : (
                  <Group position="apart">
                    <Group>
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <Text 
                        style={{ 
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'gray' : 'inherit'
                        }}
                      >
                        {todo.text}
                      </Text>
                    </Group>
                    <Group spacing="xs">
                      <ActionIcon 
                        color="blue" 
                        onClick={() => startEditing(todo.id, todo.text)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        color="red" 
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                )}
              </Paper>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
}; 