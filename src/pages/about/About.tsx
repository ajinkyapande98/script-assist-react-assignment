import { FC } from 'react';
import { Container, Title, Text, List, ThemeIcon, Card } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const About: FC = () => {
  return (
    <Container size="md" py="xl">
      <Title order={1} mb="md">About This Todo App</Title>
      
      <Card shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Text size="lg" mb="md">
          This Todo application was built as part of a junior front-end developer assignment
          using modern React technologies and best practices.
        </Text>
        
        <Text>
          The application demonstrates the following skills and technologies:
        </Text>
        
        <List
          spacing="sm"
          size="md"
          mt="md"
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>React with TypeScript for type safety</List.Item>
          <List.Item>Zustand for state management with persistence</List.Item>
          <List.Item>Mantine UI library for beautiful, accessible components</List.Item>
          <List.Item>React Router for navigation</List.Item>
          <List.Item>Responsive design that works on mobile and desktop</List.Item>
          <List.Item>Form validation and error handling</List.Item>
        </List>
      </Card>
      
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={2} mb="md">Features</Title>
        
        <List
          spacing="sm"
          size="md"
        >
          <List.Item>Add, edit, and delete todos</List.Item>
          <List.Item>Mark todos as completed</List.Item>
          <List.Item>Persistent storage using local storage</List.Item>
          <List.Item>Responsive design that works on all devices</List.Item>
          <List.Item>Accessible UI with keyboard navigation support</List.Item>
        </List>
      </Card>
    </Container>
  );
};

export default About; 