import { User } from '../types';

// This is a mock user database for demonstration purposes
// In a real application, this would be stored in a secure database
export const users: Record<string, User & { password: string }> = {
  'user1': {
    id: 'user1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123'
  }
};

export const findUserByEmail = (email: string) => {
  return Object.values(users).find(user => user.email === email);
};

export const validateUser = (email: string, password: string) => {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const createUser = (email: string, password: string, name: string): User => {
  const id = `user${Object.keys(users).length + 1}`;
  const newUser = { id, email, name, password };
  users[id] = newUser;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};