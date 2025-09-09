import { DatabaseAdapter, User, CreateUserData } from './database-adapter';
import Database from 'better-sqlite3';
import path from 'path';

export class SQLiteAdapter implements DatabaseAdapter {
  private db: Database.Database;

  constructor() {
    const dbPath = path.join(process.cwd(), 'data', 'portfolio.db');
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const row = this.db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    return row ? this.mapUser(row) : null;
  }

  async findUserById(id: number): Promise<User | null> {
    const row = this.db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
    return row ? this.mapUser(row) : null;
  }

  async createUser(userData: CreateUserData): Promise<User | null> {
    const stmt = this.db.prepare(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(userData.name, userData.email, userData.password, userData.role);
    const created = this.db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid as number) as any;
    return created ? this.mapUser(created) : null;
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    for (const [k, v] of Object.entries(updates)) {
      fields.push(`${k} = ?`);
      values.push(v);
    }
    if (fields.length === 0) return await this.findUserById(id);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    this.db.prepare(sql).run(...values, id);
    return await this.findUserById(id);
  }

  async deleteUser(id: number): Promise<boolean> {
    const info = this.db.prepare('DELETE FROM users WHERE id = ?').run(id);
    return info.changes > 0;
  }

  async close(): Promise<void> {
    this.db.close();
  }

  private mapUser(row: any): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
      role: row.role,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
