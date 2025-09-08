import { DatabaseAdapter, User } from './database-adapter';
import Database from 'better-sqlite3';
import path from 'path';

export class SQLiteAdapter implements DatabaseAdapter {
  private db: Database.Database;

  constructor() {
    const dbPath = process.env.NODE_ENV === 'production' 
      ? path.join(process.cwd(), 'data', 'portfolio.db')
      : path.join(process.cwd(), 'data', 'portfolio.db');
    
    this.db = new Database(dbPath);
    this.initTable();
  }

  private initTable() {
    const createTable = this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'master'))
      )
    `);
    createTable.run();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as any;
      return user || null;
    } catch (error) {
      console.error('SQLite findUserByEmail error:', error);
      return null;
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
      const user = stmt.get(id) as any;
      return user || null;
    } catch (error) {
      console.error('SQLite findUserById error:', error);
      return null;
    }
  }

  async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    try {
      const stmt = this.db.prepare(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
      );
      const result = stmt.run(user.name, user.email, user.password, user.role);
      
      const newUser: User = {
        id: result.lastInsertRowid as number,
        ...user
      };
      
      return newUser;
    } catch (error) {
      console.error('SQLite createUser error:', error);
      return null;
    }
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    try {
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      
      if (fields.length === 0) {
        return this.findUserById(id);
      }
      
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const stmt = this.db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`);
      
      stmt.run(...values, id);
      return this.findUserById(id);
    } catch (error) {
      console.error('SQLite updateUser error:', error);
      return null;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
      const result = stmt.run(id);
      return result.changes > 0;
    } catch (error) {
      console.error('SQLite deleteUser error:', error);
      return false;
    }
  }

  async close(): Promise<void> {
    this.db.close();
  }
}
