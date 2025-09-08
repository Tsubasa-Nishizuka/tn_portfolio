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
    const { email, password, device_name } = body;

    // 入力検証
    if (!email || !password) {
      return NextResponse.json(
        { message: 'メールアドレスとパスワードが必要です' },
        { status: 400 }
      );
    }

    // 外部APIにログインリクエスト
    try {
      const loginResponse = await fetch(`${API_BASE_URL}/portfolio-auth/${API_ENVIRONMENT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          device_name: device_name || 'WebApp'
        }),
      });

      if (loginResponse.ok) {
        const apiData = await loginResponse.json();
        
        if (apiData.success && apiData.data) {
          const userData = apiData.data;
          
          // JWTトークンを生成（内部管理用）
          const tokenData = {
            userId: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            refresh_token: userData.refresh_token,
            expires_at: userData.expires_at
          };

          const token = jwt.sign(tokenData, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '24h'
          });

          // レスポンス作成
          const response = NextResponse.json(
            { 
              message: 'ログインしました',
              user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                role: userData.role
              }
            },
            { status: 200 }
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

      // 外部APIからのエラーレスポンス処理
      const errorData = await loginResponse.json();
      return NextResponse.json(
        { message: errorData.message || 'ログインに失敗しました' },
        { status: loginResponse.status }
      );

    } catch (apiError) {
      console.error('External API login error:', apiError);
      
      // 外部APIエラーの場合、フォールバック認証を試行
      return NextResponse.json(
        { message: 'ログインサービスに接続できませんでした。しばらく後でお試しください。' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
