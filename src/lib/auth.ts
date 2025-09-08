import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// JWT シークレット（環境変数から取得、なければデフォルト値）
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export interface JWTPayload {
  userId: number;
  email: string;
  role: 'user' | 'admin' | 'master';
  name: string;
}

// JWTトークン生成
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// JWTトークン検証
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

// リクエストからトークンを取得
export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Cookieからも取得を試みる
  const token = request.cookies.get('auth-token')?.value;
  return token || null;
}

// 認証チェック（ミドルウェア用）
export function authenticate(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  
  return verifyToken(token);
}

// 認証コード・マスターキーの検証
export const AUTH_CODES = {
  ADMIN: 'ADMIN2024',
  MASTER: 'MASTER2024'
};

export function validateAdminCode(code: string): boolean {
  return code === AUTH_CODES.ADMIN;
}

export function validateMasterKey(key: string): boolean {
  return key === AUTH_CODES.MASTER;
}
