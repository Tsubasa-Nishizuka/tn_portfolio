// データベースアダプター（将来の移行を簡単にするため）

export interface DatabaseAdapter {
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
  createUser(userData: CreateUserData): Promise<User | null>;
  updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
  close(): Promise<void>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'master';
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'master';
}

// Optionally used by some adapters. Keep exported for future use.
export interface UserStats {
  total: number;
  byRole: { user: number; admin: number; master: number };
}
