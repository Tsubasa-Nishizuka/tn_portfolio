import { DatabaseAdapter, User } from './database-adapter';

interface APIResponse<T> {
  success: boolean;
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
        console.error('API returned error:', result.error);
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
    
    // emailでフィルタリング（APIがクエリパラメータを正しく処理しない場合の対応）
    const user = response.find(u => u.email === email);
    return user || null;
  }

  async findUserById(id: number): Promise<User | null> {
    const response = await this.makeRequest<User[]>('/portfolio-users/portfolio_db', {
      method: 'GET',
    });
    
    if (!response || !Array.isArray(response)) return null;
    
    const user = response.find(u => u.id === id);
    return user || null;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User | null> {
    // まず認証コードを検証（API仕様書に基づく）
    const authCodeValid = await this.validateAuthCode(user.role);
    if (!authCodeValid) {
      console.error('Invalid auth code for role:', user.role);
      return null;
    }

    const response = await this.makeRequest<User>('/portfolio-users/portfolio_db', {
      method: 'POST',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password, // API側でハッシュ化される想定
        role: user.role,
        email_verified: false, // 初期状態は未認証
      }),
    });
    
    return response;
  }

  async updateUser(id: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
    const response = await this.makeRequest<User>('/portfolio-users/portfolio_db', {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        ...updates,
      }),
    });
    
    return response;
  }

  async deleteUser(id: number): Promise<boolean> {
    const response = await this.makeRequest<{ deleted: boolean }>('/portfolio-users/portfolio_db', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    
    return response?.deleted || false;
  }

  async close(): Promise<void> {
    // HTTP接続のため特に処理不要
  }

  // 認証コード検証（API仕様書対応）
  private async validateAuthCode(role: string): Promise<boolean> {
    try {
      const response = await this.makeRequest<any[]>('/portfolio-auth-codes/portfolio_db', {
        method: 'GET',
      });
      
      if (!response || !Array.isArray(response)) return false;
      
      // roleに対応する有効なコードが存在するかチェック
      const validCode = response.find(code => 
        code.role === role && 
        code.is_active && 
        code.current_uses < code.max_uses
      );
      
      return !!validCode;
    } catch (error) {
      console.error('Auth code validation error:', error);
      return false;
    }
  }

  // ログイン認証（API仕様書対応）
  async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      const response = await this.makeRequest<{ user: User; token?: string }>('/portfolio-auth/portfolio_db', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      if (!response || !response.user) return null;
      
      // ログイン履歴を記録
      await this.recordLoginAttempt(email, true);
      
      return response.user;
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
          ip_address: '0.0.0.0', // サーバーサイドでは取得困難
          user_agent: 'Next.js App',
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
