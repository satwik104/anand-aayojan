/**
 * In-memory user storage (for development)
 * Replace with actual database in production
 */

export interface User {
  id: string;
  email: string;
  password: string; // In real app, this should be hashed
  name: string;
  createdAt: string;
}

// In-memory storage
const users: User[] = [];

export const userModel = {
  create: (user: User): User => {
    users.push(user);
    return user;
  },

  findByEmail: (email: string): User | undefined => {
    return users.find(u => u.email === email);
  },

  findById: (id: string): User | undefined => {
    return users.find(u => u.id === id);
  },
};
