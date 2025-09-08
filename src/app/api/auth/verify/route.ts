import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 外部API設定
const API_BASE_URL = 'https://api.valiondrive.com';
const API_USERNAME = 'admin';
const API_PASSWORD = 'admin123';
const API_ENVIRONMENT = 'portfolio_db';

// Basic認証ヘッダーを作成
const basicAuth = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'トークンが見つかりません' }, { status: 401 });
    }

    // JWTトークンを検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;

    // 外部APIからユーザー情報を取得
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio-profiles/${API_ENVIRONMENT}?user_id=${decoded.userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const apiData = await response.json();
        if (apiData.success && apiData.data) {
          // 外部APIからの完全なプロフィール情報を返す
          return NextResponse.json({ user: apiData.data });
        }
      }
      
      // APIから取得できない場合は、JWTトークンの情報を返す
      const userProfile = {
        id: decoded.userId,
        name: decoded.name || 'ユーザー',
        email: decoded.email || 'user@example.com',
        role: decoded.role || 'user',
        avatar_url: decoded.avatar_url || '',
        bio: decoded.bio || '',
        phone: decoded.phone || '',
        website: decoded.website || '',
        location: decoded.location || '',
        birth_date: decoded.birth_date || '',
        github_url: decoded.github_url || '',
        linkedin_url: decoded.linkedin_url || '',
        created_at: decoded.created_at || new Date().toISOString(),
        updated_at: decoded.updated_at || new Date().toISOString()
      };

      return NextResponse.json({ user: userProfile });
    } catch (apiError) {
      console.error('External API error:', apiError);
      
      // APIエラーの場合はJWTトークンから情報を返す
      const userProfile = {
        id: decoded.userId,
        name: decoded.name || 'ユーザー',
        email: decoded.email || 'user@example.com',
        role: decoded.role || 'user',
        avatar_url: decoded.avatar_url || '',
        bio: decoded.bio || '',
        phone: decoded.phone || '',
        website: decoded.website || '',
        location: decoded.location || '',
        birth_date: decoded.birth_date || '',
        github_url: decoded.github_url || '',
        linkedin_url: decoded.linkedin_url || '',
        created_at: decoded.created_at || new Date().toISOString(),
        updated_at: decoded.updated_at || new Date().toISOString()
      };

      return NextResponse.json({ user: userProfile });
    }
  } catch (error) {
    console.error('Verification error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: '無効なトークンです' }, { status: 401 });
    }
    
    return NextResponse.json({ message: '認証に失敗しました' }, { status: 500 });
  }
}
