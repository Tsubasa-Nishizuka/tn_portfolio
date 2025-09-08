// Supabaseアダプターの実装例
// npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { DatabaseAdapter, User, CreateUserData, UserStats } from './database-adapter';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export class SupabaseAdapter implements DatabaseAdapter {
  private supabase;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) return null;
    return data as User;
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const { data, error } = await this.supabase
      .from('users')
      .insert({
        ...userData,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await this.supabase
      .from('users')
      .select('id, name, email, role, created_at');
    
    if (error) throw new Error(error.message);
    return data as User[];
  }

  async getUserStats(): Promise<UserStats> {
    const { data, error } = await this.supabase
      .from('users')
      .select('role');
    
    if (error) throw new Error(error.message);
    
    const total = data.length;
    const byRole = {
      user: data.filter(u => u.role === 'user').length,
      admin: data.filter(u => u.role === 'admin').length,
      master: data.filter(u => u.role === 'master').length,
    };

    return { total, byRole };
  }
}

/*
Supabase セットアップ手順:

1. https://supabase.com でプロジェクト作成
2. SQL Editor で以下を実行:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'master')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

3. .env.local に追加:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

4. 使用方法:
import { SupabaseAdapter } from '@/lib/adapters/supabase-adapter';
const db = new SupabaseAdapter();
*/
