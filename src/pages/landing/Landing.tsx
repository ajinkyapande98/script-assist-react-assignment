import { FC } from 'react';
import { Container, Title, Text, Space, Group, Badge } from "@mantine/core";
import { Todo } from '../../components/Todo';
import { useTodoStore } from '../../store/todoStore';

const Landing: FC = () => {
	const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoStore();
	
	return (
		<Container size="md" py="xl">
			<Group position="apart" mb="lg">
				<div>
					<Title order={1}>Todo App</Title>
					<Text color="dimmed">Manage your tasks efficiently</Text>
				</div>
				<Badge size="lg" variant="filled" color="blue">
					{todos.filter(todo => !todo.completed).length} pending
				</Badge>
			</Group>
			
			<Todo 
				todos={todos}
				addTodo={addTodo}
				toggleTodo={toggleTodo}
				deleteTodo={deleteTodo}
				editTodo={editTodo}
			/>
		</Container>
	);
};

export default Landing;

