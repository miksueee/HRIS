import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  employeeNumber: string;
  department: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: Record<string, User & { password: string }> = {
  'hr@company.qa': {
    id: '1',
    email: 'hr@company.qa',
    name: 'Sarah Al-Thani',
    role: 'hr',
    employeeNumber: 'EMP001',
    department: 'Human Resources',
    password: 'password123',
  },
  'manager@company.qa': {
    id: '2',
    email: 'manager@company.qa',
    name: 'Mohammed Al-Rashid',
    role: 'manager',
    employeeNumber: 'EMP002',
    department: 'Engineering',
    password: 'password123',
  },
  'employee@company.qa': {
    id: '3',
    email: 'employee@company.qa',
    name: 'Fatima Hassan',
    role: 'employee',
    employeeNumber: 'EMP003',
    department: 'Engineering',
    password: 'password123',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers[email.toLowerCase()];
    if (foundUser && foundUser.password === password) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
