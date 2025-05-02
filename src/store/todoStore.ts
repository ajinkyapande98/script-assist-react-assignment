import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TodoItem } from '../components/Todo';

interface TodoState {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      
      addTodo: (text: string) => 
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
            },
          ],
        })),
      
      toggleTodo: (id: string) => 
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      
      deleteTodo: (id: string) => 
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      
      editTodo: (id: string, text: string) => 
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
); 