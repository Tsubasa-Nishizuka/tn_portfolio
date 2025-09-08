import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { SQLiteAdapter } from './adapters/sqlite-adapter';
import { PostgreSQLAPIAdapter } from './adapters/postgresql-api-adapter';
import { DatabaseAdapter } from './adapters/database-adapter';

// データベース設定
const DB_TYPE = process.env.DB_TYPE || 'sqlite'; // 'sqlite' or 'postgresql-api'

// アダプター選択
function createDatabaseAdapter(): DatabaseAdapter {
  switch (DB_TYPE) {
    case 'postgresql-api':
      return new PostgreSQLAPIAdapter();
    case 'sqlite':
    default:
      return new SQLiteAdapter();
  }
}

// ユーザー型定義
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'master';
  created_at?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'master';
}

export class UserService {
  private adapter: DatabaseAdapter;

  constructor() {
    this.adapter = createDatabaseAdapter();
  }

  // メールでユーザー検索
  async findByEmail(email: string): Promise<User | null> {
    return await this.adapter.findUserByEmail(email);
  }

  // IDでユーザー検索
  async findById(id: number): Promise<User | null> {
    return await this.adapter.findUserById(id);
  }

  // ユーザー作成
  async createUser(userData: CreateUserData): Promise<User | null> {
    // パスワードハッシュ化
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword,
    };

    return await this.adapter.createUser(userWithHashedPassword);
  }

  // パスワード検証
  verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  // ユーザー認証（PostgreSQL API対応）
  async authenticateUser(email: string, password: string): Promise<User | null> {
    if (this.adapter instanceof PostgreSQLAPIAdapter) {
      // PostgreSQL API の場合は専用メソッドを使用
      return await this.adapter.authenticateUser(email, password);
    } else {
      // SQLite の場合は従来の方法
      const user = await this.findByEmail(email);
      if (!user) return null;
      
      const isPasswordValid = this.verifyPassword(password, user.password);
      return isPasswordValid ? user : null;
    }
  }

  // ユーザープロフィール取得（PostgreSQL API対応）
  async getUserProfile(userId: number): Promise<any> {
    if (this.adapter instanceof PostgreSQLAPIAdapter) {
      return await this.adapter.getUserProfile(userId);
    }
    // SQLite用の実装は必要に応じて追加
    return null;
  }

  // ユーザープロフィール更新（PostgreSQL API対応）
  async updateUserProfile(userId: number, profileData: any): Promise<any> {
    if (this.adapter instanceof PostgreSQLAPIAdapter) {
      return await this.adapter.updateUserProfile(userId, profileData);
    }
    // SQLite用の実装は必要に応じて追加
    return null;
  }

  // ユーザー更新
  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    // パスワードが含まれている場合はハッシュ化
    if (updates.password) {
      updates.password = bcrypt.hashSync(updates.password, 10);
    }
    
    return await this.adapter.updateUser(id, updates);
  }

  // ユーザー削除
  async deleteUser(id: number): Promise<boolean> {
    return await this.adapter.deleteUser(id);
  }

  // 接続クローズ
  async close(): Promise<void> {
    await this.adapter.close();
  }

  // デバッグ情報
  getAdapterType(): string {
    if (this.adapter instanceof PostgreSQLAPIAdapter) {
      return 'PostgreSQL API';
    } else if (this.adapter instanceof SQLiteAdapter) {
      return 'SQLite';
    }
    return 'Unknown';
  }
}

// シングルトンインスタンス
let userService: UserService;

export default function getUserService(): UserService {
  if (!userService) {
    userService = new UserService();
  }
  return userService;
}

// 従来のgetDatabase関数との互換性維持
export function getDatabase() {
  return getUserService();
}
