import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

// データベースファイルのパス
const getDbPath = () => {
  if (process.env.NODE_ENV === 'production') {
    // 本番環境: 永続化されるディレクトリ
    return process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'portfolio.db');
  } else {
    // 開発環境: プロジェクトのdataディレクトリ
    return path.join(process.cwd(), 'data', 'portfolio.db');
  }
};

const dbPath = getDbPath();

// データベース接続
let db: Database.Database;

function getDatabase() {
  if (!db) {
    // データディレクトリが存在しない場合は作成
    const fs = require('fs');
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    
    db = new Database(dbPath);
    
    // テーブル作成
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'master')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // デモアカウントを作成（存在しない場合のみ）
    const hashedPassword = bcrypt.hashSync('password123', 10);
    
    const insertUser = db.prepare(`
      INSERT OR IGNORE INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `);

    insertUser.run('デモユーザー', 'user@demo.com', hashedPassword, 'user');
    insertUser.run('デモ管理者', 'admin@demo.com', hashedPassword, 'admin');
    insertUser.run('デモマスター', 'master@demo.com', hashedPassword, 'master');

    console.log(`データベース初期化完了: ${dbPath}`);
  }
  
  return db;
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

export class UserService {
  private db: Database.Database;

  constructor() {
    this.db = getDatabase();
  }

  // メールアドレスでユーザーを検索
  findByEmail(email: string): User | undefined {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  }

  // ユーザー作成
  create(userData: {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'master';
  }): User {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    
    const stmt = this.db.prepare(`
      INSERT INTO users (name, email, password, role) 
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(userData.name, userData.email, hashedPassword, userData.role);
    
    const newUser = this.db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as User;
    return newUser;
  }

  // パスワード検証
  verifyPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  // 全ユーザー取得（管理者用）
  findAll(): User[] {
    const stmt = this.db.prepare('SELECT id, name, email, role, created_at FROM users');
    return stmt.all() as User[];
  }

  // ユーザー数カウント（統計用）
  getUserStats(): { total: number; byRole: { user: number; admin: number; master: number } } {
    const total = this.db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
    
    const byRole = {
      user: (this.db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('user') as { count: number }).count,
      admin: (this.db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin') as { count: number }).count,
      master: (this.db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('master') as { count: number }).count,
    };

    return { total: total.count, byRole };
  }

  // データベース情報を取得（デバッグ用）
  getDbInfo(): { path: string; size: number; tables: string[] } {
    const fs = require('fs');
    const stats = fs.statSync(dbPath);
    
    const tables = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as { name: string }[];
    
    return {
      path: dbPath,
      size: stats.size,
      tables: tables.map(t => t.name)
    };
  }
}

export default getDatabase;
