import { DatabaseAdapter, User } from './database-adapter';
import mysql from 'mysql2/promise';

export class PlanetScaleAdapter implements DatabaseAdapter {
  private connection: mysql.Connection | null = null;

  private async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        ssl: {
          rejectUnauthorized: true
        }
      });
    }
    return this.connection;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const conn = await this.getConnection();
      const [rows] = await conn.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      
      const users = rows as any[];
      if (users.length === 0) return null;
      
      const user = users[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role as 'user' | 'admin' | 'master'
      };
    } catch (error) {
      console.error('PlanetScale findUserByEmail error:', error);
      return null;
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      const conn = await this.getConnection();
      const [rows] = await conn.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      
      const users = rows as any[];
      if (users.length === 0) return null;
      
      const user = users[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role as 'user' | 'admin' | 'master'
      };
    } catch (error) {
      console.error('PlanetScale findUserById error:', error);
      return null;
    }
  }

  async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    try {
      const conn = await this.getConnection();
      const [result] = await conn.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [user.name, user.email, user.password, user.role]
      );
      
      const insertResult = result as any;
      const newUser: User = {
        id: insertResult.insertId,
        ...user
      };
      
      return newUser;
    } catch (error) {
      console.error('PlanetScale createUser error:', error);
      return null;
    }
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    try {
      const conn = await this.getConnection();
      
      // 動的にUPDATE文を構築
      const fields = Object.keys(updates);
      const values = Object.values(updates);
      
      if (fields.length === 0) {
        return this.findUserById(id);
      }
      
      const setClause = fields.map(field => `${field} = ?`).join(', ');
      
      await conn.execute(
        `UPDATE users SET ${setClause} WHERE id = ?`,
        [...values, id]
      );
      
      return this.findUserById(id);
    } catch (error) {
      console.error('PlanetScale updateUser error:', error);
      return null;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const conn = await this.getConnection();
      const [result] = await conn.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      
      const deleteResult = result as any;
      return deleteResult.affectedRows > 0;
    } catch (error) {
      console.error('PlanetScale deleteUser error:', error);
      return false;
    }
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}
