import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'master';
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(requiredRole?: 'user' | 'admin' | 'master') {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        // サーバーサイドでJWT認証を検証
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include', // Cookieを含める
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const user = data.user;

          // 役割チェック
          if (requiredRole && user.role !== requiredRole) {
            // 役割が合わない場合は適切なダッシュボードにリダイレクト
            if (user.role === 'master') {
              router.push('/dashboard/master');
            } else if (user.role === 'admin') {
              router.push('/dashboard/admin');
            } else {
              router.push('/dashboard/user');
            }
            return;
          }

          setAuthState({
            user,
            loading: false,
            error: null
          });
        } else {
          // 認証失敗時はローカルストレージをクリア
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          
          setAuthState({
            user: null,
            loading: false,
            error: '認証に失敗しました'
          });

          router.push('/signin');
        }
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: 'ネットワークエラーが発生しました'
        });
        router.push('/signin');
      }
    };

    verifyAuth();
  }, [requiredRole, router]);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // サーバーサイドでもクッキーをクリア
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    router.push('/');
  };

  return {
    ...authState,
    logout
  };
}
