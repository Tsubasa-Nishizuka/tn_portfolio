import { DatabaseAdapter, User } from './database-adapter';

interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export class PostgreSQLAPIAdapter implements DatabaseAdapter {
  private baseURL = 'http://api.valiondrive.com';
  private auth = 'Basic YWRtaW46YWRtaW4xMjM='; // admin:admin123
  
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': this.auth,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText}`);
        return null;
      }
      
      const result: APIResponse<T> = await response.json();
      
      if (!result.success) {
        console.error('API returned error:', result.error || result.message);
        return null;
      }
      
      return result.data || null;
    } catch (error) {
      console.error('PostgreSQL API request error:', error);
      return null;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const response = await this.makeRequest<User[]>('/portfolio-users/portfolio_db', {
      method: 'GET',
    });
    
    if (!response || !Array.isArray(response)) return null;
    
    // emailでフィルタリング
    const user = response.find(u => u.email === email);
    if (!user) return null;
    
    // APIレスポンスのフィールドマッピング
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: (user as any).password_hash, // password_hash -> password
      role: user.role as 'user' | 'admin' | 'master'
    };
  }

  async findUserById(id: number): Promise<User | null> {
    const response = await this.makeRequest<User[]>('/portfolio-users/portfolio_db', {
      method: 'GET',
    });
    
    if (!response || !Array.isArray(response)) return null;
    
    const user = response.find(u => u.id === id);
    if (!user) return null;
    
    // APIレスポンスのフィールドマッピング
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: (user as any).password_hash, // password_hash -> password
      role: user.role as 'user' | 'admin' | 'master'
    };
  }

  async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    const response = await this.makeRequest<any>('/portfolio-users/portfolio_db', {
      method: 'POST',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        email_verified: false,
      }),
    });
    
    if (!response) return null;
    
    // 作成されたユーザーを返す（フィールドマッピング）
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      password: response.password_hash,
      role: response.role
    };
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    // password -> password_hash マッピング
    const apiUpdates = { ...updates };
    if (updates.password) {
      (apiUpdates as any).password_hash = updates.password;
      delete apiUpdates.password;
    }
    
    const response = await this.makeRequest<any>('/portfolio-users/portfolio_db', {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        ...apiUpdates,
      }),
    });
    
    if (!response) return null;
    
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      password: response.password_hash,
      role: response.role
    };
  }

  async deleteUser(id: number): Promise<boolean> {
    const response = await this.makeRequest<{ deleted?: boolean }>('/portfolio-users/portfolio_db', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    
    return response?.deleted === true;
  }

  async close(): Promise<void> {
    // HTTP接続のため特に処理不要
  }

  // ログイン認証（API仕様書対応・修正版）
  async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      const response = await this.makeRequest<any>('/portfolio-auth/portfolio_db', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          device_name: 'Next.js Portfolio App'
        }),
      });
      
      if (!response) return null;
      
      // APIレスポンスのユーザー情報を標準形式に変換
      const user: User = {
        id: response.id,
        name: response.name,
        email: response.email,
        password: response.password_hash || '', // password_hashが存在しない場合は空文字
        role: response.role as 'user' | 'admin' | 'master'
      };
      
      // ログイン履歴を記録
      await this.recordLoginAttempt(email, true);
      
      return user;
    } catch (error) {
      console.error('Authentication error:', error);
      
      // 失敗ログを記録
      await this.recordLoginAttempt(email, false, error?.toString());
      
      return null;
    }
  }

  // ログイン履歴記録
  private async recordLoginAttempt(email: string, success: boolean, failureReason?: string): Promise<void> {
    try {
      await this.makeRequest('/portfolio-login-attempts/portfolio_db', {
        method: 'POST',
        body: JSON.stringify({
          email,
          success,
          failure_reason: failureReason,
          ip_address: '127.0.0.1',
          user_agent: 'Next.js Portfolio App',
        }),
      });
    } catch (error) {
      console.error('Login attempt recording error:', error);
    }
  }

  // ユーザープロフィール取得
  async getUserProfile(userId: number): Promise<any> {
    return await this.makeRequest(`/portfolio-profiles/portfolio_db?user_id=${userId}`, {
      method: 'GET',
    });
  }

  // ユーザープロフィール更新
  async updateUserProfile(userId: number, profileData: any): Promise<any> {
    return await this.makeRequest('/portfolio-profiles/portfolio_db', {
      method: 'PUT',
      body: JSON.stringify({
        user_id: userId,
        ...profileData,
      }),
    });
  }
}
