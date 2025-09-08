import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 外部API設定
const API_BASE_URL = 'https://api.valiondrive.com';
const API_USERNAME = 'admin';
const API_PASSWORD = 'admin123';
const API_ENVIRONMENT = 'portfolio_db';

// Basic認証ヘッダーを作成
const basicAuth = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, adminCode, masterKey } = body;

    // 入力検証
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // パスワード長チェック
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'パスワードは8文字以上で入力してください' },
        { status: 400 }
      );
    }

    // 外部APIにユーザー登録リクエスト
    try {
      const signupData: any = {
        name,
        email,
        password
      };

      // ロール別の認証コード追加
      if (role === 'admin' && adminCode) {
        signupData.auth_code = adminCode;
      }
      if (role === 'master' && masterKey) {
        signupData.auth_code = masterKey;
      }

      const signupResponse = await fetch(`${API_BASE_URL}/portfolio-users/${API_ENVIRONMENT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (signupResponse.ok) {
        const apiData = await signupResponse.json();
        
        if (apiData.success && apiData.data) {
          const userData = apiData.data;
          
          // メール認証を自動的に有効化
          const verifyResponse = await fetch(`${API_BASE_URL}/portfolio-users/${API_ENVIRONMENT}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: userData.user_id,
              email_verified: true
            }),
          });

          if (!verifyResponse.ok) {
            console.warn('Email verification failed, but user was created');
          }

          // 自動ログイン処理
          const loginResponse = await fetch(`${API_BASE_URL}/portfolio-auth/${API_ENVIRONMENT}`, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              device_name: 'WebApp'
            }),
          });

          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            
            if (loginData.success && loginData.data) {
              const loginUserData = loginData.data;

              // JWTトークンを生成（内部管理用）
              const tokenData = {
                userId: loginUserData.id,
                name: loginUserData.name,
                email: loginUserData.email,
                role: loginUserData.role,
                refresh_token: loginUserData.refresh_token,
                expires_at: loginUserData.expires_at
              };

              const token = jwt.sign(tokenData, process.env.JWT_SECRET || 'your-secret-key', {
                expiresIn: '24h'
              });

              // レスポンス作成
              const response = NextResponse.json(
                {
                  message: 'ユーザー登録が完了し、ログインしました',
                  user: {
                    id: loginUserData.id,
                    name: loginUserData.name,
                    email: loginUserData.email,
                    role: loginUserData.role
                  }
                },
                { status: 201 }
              );

              // HttpOnlyクッキーでJWTを設定
              response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24時間
              });

              return response;
            }
          }

          // ログインに失敗した場合でも、登録は成功しているので成功レスポンス
          return NextResponse.json(
            {
              message: 'ユーザー登録が完了しました。ログインページからログインしてください。',
              user: {
                id: userData.user_id,
                email: email,
                role: userData.role
              }
            },
            { status: 201 }
          );
        }
      }

      // 外部APIからのエラーレスポンス処理
      const errorData = await signupResponse.json();
      return NextResponse.json(
        { message: errorData.message || 'ユーザー登録に失敗しました' },
        { status: signupResponse.status }
      );

    } catch (apiError) {
      console.error('External API signup error:', apiError);
      return NextResponse.json(
        { message: '登録サービスに接続できませんでした。しばらく後でお試しください。' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
