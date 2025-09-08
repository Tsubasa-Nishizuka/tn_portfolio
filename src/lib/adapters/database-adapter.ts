// データベースアダプター（将来の移行を簡単にするため）

export interface DatabaseAdapter {
  findUserByEmail(email: string): Promise<User | null>;
  createUser(userData: CreateUserData): Promise<User>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  getUserStats(): Promise<UserStats>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'master';
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'master';
}

export interface UserStats {
  total: number;
  byRole: {
    user: number;
    admin: number;
    master: number;
  };
}
