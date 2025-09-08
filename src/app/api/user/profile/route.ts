import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 外部API設定
const API_BASE_URL = 'https://api.valiondrive.com';
const API_USERNAME = 'admin';
const API_PASSWORD = 'admin123';
const API_ENVIRONMENT = 'portfolio_db';

// Basic認証ヘッダーを作成
const basicAuth = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');

interface UserProfileData {
  name: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  website?: string;
  location?: string;
  birth_date?: string;
  github_url?: string;
  linkedin_url?: string;
}

// URLの形式をバリデーションする関数
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// 電話番号の形式をバリデーションする関数
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9\-\+\(\)\ ]+$/;
  return phoneRegex.test(phone);
}

// 日付の形式をバリデーションする関数
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// プロフィール取得 (GET)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'トークンが見つかりません' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // 外部APIからプロフィール情報を取得
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
          return NextResponse.json({ user: apiData.data });
        }
      }
      
      // APIからデータが取得できない場合は、JWTトークンから情報を返す
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
        updated_at: new Date().toISOString()
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
        updated_at: new Date().toISOString()
      };

      return NextResponse.json({ user: userProfile });
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ message: 'プロフィールの取得に失敗しました' }, { status: 500 });
  }
}

// プロフィール更新 (PUT)
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'トークンが見つかりません' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const profileData: UserProfileData = await request.json();

    // バリデーション
    if (!profileData.name || profileData.name.trim().length === 0) {
      return NextResponse.json({ message: '名前は必須です' }, { status: 400 });
    }

    if (profileData.website && !isValidUrl(profileData.website)) {
      return NextResponse.json({ message: '有効なウェブサイトURLを入力してください' }, { status: 400 });
    }

    if (profileData.avatar_url && !isValidUrl(profileData.avatar_url)) {
      return NextResponse.json({ message: '有効なアバター画像URLを入力してください' }, { status: 400 });
    }

    if (profileData.github_url && !isValidUrl(profileData.github_url)) {
      return NextResponse.json({ message: '有効なGitHub URLを入力してください' }, { status: 400 });
    }

    if (profileData.linkedin_url && !isValidUrl(profileData.linkedin_url)) {
      return NextResponse.json({ message: '有効なLinkedIn URLを入力してください' }, { status: 400 });
    }

    if (profileData.phone && !isValidPhone(profileData.phone)) {
      return NextResponse.json({ message: '有効な電話番号を入力してください' }, { status: 400 });
    }

    if (profileData.birth_date && !isValidDate(profileData.birth_date)) {
      return NextResponse.json({ message: '有効な生年月日を入力してください' }, { status: 400 });
    }

    // 外部APIにプロフィール更新を送信
    try {
      const updateData = {
        user_id: decoded.userId,
        avatar_url: profileData.avatar_url || '',
        bio: profileData.bio || '',
        phone: profileData.phone || '',
        website: profileData.website || '',
        location: profileData.location || '',
        birth_date: profileData.birth_date || '',
        github_url: profileData.github_url || '',
        linkedin_url: profileData.linkedin_url || ''
      };

      const response = await fetch(`${API_BASE_URL}/portfolio-profiles/${API_ENVIRONMENT}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const apiResponse = await response.json();
        if (apiResponse.success) {
          console.log('Profile updated successfully in external API');
        }
      } else {
        console.error('Failed to update profile in external API:', response.statusText);
      }
    } catch (apiError) {
      console.error('External API update error:', apiError);
      // APIエラーでも処理を続行（ローカルトークン更新のため）
    }

    // JWTトークンを新しい情報で更新
    const updatedUserData = {
      userId: decoded.userId,
      name: profileData.name.trim(),
      email: decoded.email,
      role: decoded.role,
      avatar_url: profileData.avatar_url || '',
      bio: profileData.bio || '',
      phone: profileData.phone || '',
      website: profileData.website || '',
      location: profileData.location || '',
      birth_date: profileData.birth_date || '',
      github_url: profileData.github_url || '',
      linkedin_url: profileData.linkedin_url || '',
      created_at: decoded.created_at,
      updated_at: new Date().toISOString()
    };

    // 新しいJWTトークンを生成
    const newToken = jwt.sign(updatedUserData, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h'
    });

    // レスポンスでCookieを更新
    const response = NextResponse.json({ 
      message: 'プロフィールが正常に更新されました',
      user: updatedUserData
    });

    response.cookies.set('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24時間
    });

    return response;
  } catch (error) {
    console.error('Profile update error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: '無効なトークンです' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      message: 'プロフィールの更新に失敗しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
