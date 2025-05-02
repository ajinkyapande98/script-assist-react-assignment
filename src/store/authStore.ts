import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock users for demo
const MOCK_USERS = [
  { username: 'demo', password: 'password' },
  { username: 'test', password: 'test123' }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (username: string, password: string) => {
        // In a real app, you would make an API call here
        const user = MOCK_USERS.find(
          u => u.username === username && u.password === password
        );
        
        if (user) {
          set({
            user: { username: user.username },
            isAuthenticated: true
          });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
); 