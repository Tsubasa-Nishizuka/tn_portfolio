# Portfolio API 仕様書 - 取引先向け

**作成日**: 2025年9月7日  
**API URL**: `http://api.valiondrive.com`  
**認証方式**: Basic認証 (username: admin, password: admin123)  
**データベース環境**: `portfolio_db`

---

## ⚠️ 重要な注意事項

### 既知の制限事項
1. **GETパラメータの制限**: URLクエリパラメータ（`?key=value`）は一部のエンドポイントで正常に処理されない場合があります
2. **システム設定API**: `updated_by`フィールドはスキーマの問題により省略することを推奨します
3. **メール認証**: ユーザー登録後は必ずメール認証を有効化してからログインしてください

---

## 🔐 認証情報

```bash
# Basic認証ヘッダー
Authorization: Basic YWRtaW46YWRtaW4xMjM=

# または cURLでの指定方法
curl -u admin:admin123 [URL]
```

---

## 📋 全エンドポイント一覧

| No | エンドポイント | 機能 | 必須フィールド | メソッド |
|----|----------------|------|----------------|----------|
| 1 | `/portfolio-auth/portfolio_db` | 認証（ログイン/ログアウト） | email, password | POST/DELETE |
| 2 | `/portfolio-users/portfolio_db` | ユーザー管理 | name, email, password | GET/POST/PUT |
| 3 | `/portfolio-profiles/portfolio_db` | プロフィール管理 | user_id | GET/PUT |
| 4 | `/portfolio-sessions/portfolio_db` | セッション管理 | user_id | GET/DELETE |
| 5 | `/portfolio-auth-codes/portfolio_db` | 認証コード管理 | role, code | GET/POST/PUT/DELETE |
| 6 | `/portfolio-password-reset/portfolio_db` | パスワードリセット | email/token | GET/POST/PUT |
| 7 | `/portfolio-settings/portfolio_db` | システム設定 | key, value | GET/POST/PUT/DELETE |
| 8 | `/portfolio-login-attempts/portfolio_db` | ログイン履歴 | email, success | GET/POST/DELETE |

---

## 🚀 1. 認証エンドポイント (`portfolio-auth`)

### ログイン
```bash
# 【必須フィールド】email, password
# 【オプション】device_name
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",      # 【必須】ユーザーメールアドレス
    "password": "password123",        # 【必須】パスワード
    "device_name": "WebApp"          # 【オプション】デバイス名
  }' \
  "http://api.valiondrive.com/portfolio-auth/portfolio_db"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Login successful",
#   "data": {
#     "id": 1,
#     "name": "ユーザー名",
#     "email": "user@example.com",
#     "role": "user",
#     "refresh_token": "abcd1234...",    # セッショントークン
#     "expires_at": "2025-09-08 12:00:00"
#   }
# }
```

### ログアウト
```bash
# 【必須フィールド】refresh_token
curl -X DELETE -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "abcd1234..."    # 【必須】ログイン時取得したトークン
  }' \
  "http://api.valiondrive.com/portfolio-auth/portfolio_db"
```

---

## 👤 2. ユーザー管理エンドポイント (`portfolio-users`)

### ユーザー登録
```bash
# 【必須フィールド】name, email, password
# 【オプション】auth_code（権限昇格用）
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "新規ユーザー",           # 【必須】ユーザー名
    "email": "new@example.com",      # 【必須】メールアドレス（重複不可）
    "password": "password123",       # 【必須】パスワード
    "auth_code": "ADMIN2025"        # 【オプション】管理者権限コード
  }' \
  "http://api.valiondrive.com/portfolio-users/portfolio_db"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "User registered successfully",
#   "data": {
#     "user_id": 5,
#     "role": "admin"    # auth_codeにより権限が設定される
#   }
# }
```

### ユーザー一覧取得
```bash
# 全ユーザー取得（パラメータなし推奨）
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-users/portfolio_db"

# ⚠️ 注意: クエリパラメータは現在サポートに制限があります
# 推奨: パラメータなしで全データを取得してクライアント側でフィルタリング

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Users retrieved successfully",
#   "data": [
#     {
#       "id": 1,
#       "name": "ユーザー名",
#       "email": "user@example.com",
#       "role": "user",               # user/admin/master
#       "is_active": true,
#       "email_verified": true,
#       "created_at": "2025-09-07T12:00:00Z",
#       "last_login": "2025-09-07T15:30:00Z"
#     }
#   ]
# }
```

### ユーザー情報更新
```bash
# 【必須フィールド】id
# 【オプション】name, is_active, email_verified, role
curl -X PUT -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,                        # 【必須】更新対象ユーザーID
    "name": "更新後の名前",          # 【オプション】新しい名前
    "is_active": true,              # 【オプション】アカウント有効/無効
    "email_verified": true,         # 【オプション】メール認証状態
    "role": "admin"                 # 【オプション】権限変更
  }' \
  "http://api.valiondrive.com/portfolio-users/portfolio_db"
```

---

## 📝 3. プロフィール管理エンドポイント (`portfolio-profiles`)

### プロフィール取得
```bash
# ⚠️ 注意: user_idパラメータは現在制限があります
# 推奨: POSTリクエストでuser_idをボディに含める代替方法を検討

# 現在のエンドポイント（パラメータに制限あり）
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-profiles/portfolio_db?user_id=1"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Profile retrieved successfully",
#   "data": {
#     "id": 1,
#     "name": "ユーザー名",
#     "email": "user@example.com",
#     "role": "user",
#     "avatar_url": "https://example.com/avatar.jpg",
#     "bio": "自己紹介文",
#     "phone": "090-1234-5678",
#     "website": "https://mysite.com",
#     "location": "東京都",
#     "birth_date": "1990-01-01",
#     "github_url": "https://github.com/username",
#     "linkedin_url": "https://linkedin.com/in/username"
#   }
# }
```

### プロフィール更新
```bash
# 【必須フィールド】user_id
# 【オプション】avatar_url, bio, phone, website, location, birth_date, github_url, linkedin_url
curl -X PUT -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,                                    # 【必須】対象ユーザーID
    "bio": "フルスタックエンジニアです",               # 【オプション】自己紹介
    "website": "https://myportfolio.com",           # 【オプション】ウェブサイト
    "location": "東京都渋谷区",                      # 【オプション】居住地
    "github_url": "https://github.com/myusername",  # 【オプション】GitHubプロフィール
    "linkedin_url": "https://linkedin.com/in/me"   # 【オプション】LinkedInプロフィール
  }' \
  "http://api.valiondrive.com/portfolio-profiles/portfolio_db"
```

---

## 🔑 4. セッション管理エンドポイント (`portfolio-sessions`)

### セッション一覧取得
```bash
# ⚠️ 注意: user_idパラメータは現在制限があります
# 推奨: 全セッション取得後にクライアント側でフィルタリング

# 現在のエンドポイント（パラメータに制限あり）
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-sessions/portfolio_db?user_id=1"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Sessions retrieved successfully",
#   "data": [
#     {
#       "id": 1,
#       "ip_address": "192.168.1.100",
#       "user_agent": "Mozilla/5.0...",
#       "device_name": "WebApp",
#       "expires_at": "2025-09-08T12:00:00Z",
#       "is_revoked": false,
#       "created_at": "2025-09-07T12:00:00Z"
#     }
#   ]
# }
```

### セッション無効化
```bash
# 【必須フィールド】session_id
curl -X DELETE -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": 1    # 【必須】無効化するセッションID
  }' \
  "http://api.valiondrive.com/portfolio-sessions/portfolio_db"
```

---

## 🎫 5. 認証コード管理エンドポイント (`portfolio-auth-codes`)

### 認証コード一覧取得
```bash
# 全認証コード取得
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-auth-codes/portfolio_db"

# 特定認証コード取得
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-auth-codes/portfolio_db?id=1"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Auth codes retrieved successfully",
#   "data": [
#     {
#       "id": 1,
#       "role": "admin",                    # user/admin/master
#       "code": "ADMIN2025TEST",
#       "description": "管理者用コード",
#       "max_uses": 10,                     # 最大使用回数
#       "current_uses": 3,                  # 現在の使用回数
#       "is_active": true,
#       "expires_at": "2025-12-31T23:59:59Z",
#       "created_at": "2025-09-01T00:00:00Z"
#     }
#   ]
# }
```

### 認証コード作成
```bash
# 【必須フィールド】role, code
# 【オプション】description, max_uses, expires_at
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin",                        # 【必須】付与する権限（user/admin/master）
    "code": "ADMIN2025NEW",                 # 【必須】認証コード文字列
    "description": "新規管理者用コード",     # 【オプション】説明
    "max_uses": 5,                         # 【オプション】最大使用回数（デフォルト: 1）
    "expires_at": "2025-12-31T23:59:59Z"   # 【オプション】有効期限
  }' \
  "http://api.valiondrive.com/portfolio-auth-codes/portfolio_db"
```

### 認証コード更新
```bash
# 【必須フィールド】id
# 【オプション】is_active, max_uses, description, expires_at
curl -X PUT -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,                               # 【必須】更新対象のコードID
    "is_active": false,                    # 【オプション】有効/無効切り替え
    "max_uses": 20,                        # 【オプション】最大使用回数変更
    "description": "更新後の説明"          # 【オプション】説明変更
  }' \
  "http://api.valiondrive.com/portfolio-auth-codes/portfolio_db"
```

### 認証コード削除
```bash
# 【必須フィールド】id
curl -X DELETE -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1    # 【必須】削除するコードID
  }' \
  "http://api.valiondrive.com/portfolio-auth-codes/portfolio_db"
```

---

## 🔐 6. パスワードリセットエンドポイント (`portfolio-password-reset`)

### パスワードリセット要求
```bash
# 【必須フィールド】email
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"    # 【必須】リセット対象のメールアドレス
  }' \
  "http://api.valiondrive.com/portfolio-password-reset/portfolio_db"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Password reset token generated",
#   "data": {
#     "token": "abcd1234567890abcdef..."    # パスワードリセット用トークン（1時間有効）
#   }
# }
```

### パスワード更新
```bash
# 【必須フィールド】token, new_password
curl -X PUT -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abcd1234567890abcdef...",    # 【必須】リセット用トークン
    "new_password": "newpassword123"       # 【必須】新しいパスワード
  }' \
  "http://api.valiondrive.com/portfolio-password-reset/portfolio_db"

# 【注意】
# - トークンは1時間で有効期限切れ
# - パスワード更新後、全セッションが無効化される
# - 再度ログインが必要
```

### パスワードリセット履歴取得
```bash
# 全履歴取得
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-password-reset/portfolio_db"

# 特定ユーザーの履歴取得
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-password-reset/portfolio_db?user_id=1"
```

---

## ⚙️ 7. システム設定エンドポイント (`portfolio-settings`)

### システム設定取得
```bash
# 全設定取得
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-settings/portfolio_db"

# 特定設定取得
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-settings/portfolio_db?key=maintenance_mode"

# 【レスポンス例】
# {
#   "success": true,
#   "message": "System settings retrieved successfully",
#   "data": [
#     {
#       "key": "maintenance_mode",
#       "value": "false",
#       "description": "メンテナンスモードフラグ",
#       "updated_by": "admin",
#       "created_at": "2025-09-01T00:00:00Z",
#       "updated_at": "2025-09-07T12:00:00Z"
#     }
#   ]
# }
```

### システム設定更新/作成
```bash
# 【必須フィールド】key, value
# 【オプション】description
# ⚠️ 注意: updated_byフィールドはスキーマの問題により省略してください
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "key": "maintenance_mode",             # 【必須】設定キー
    "value": "true",                       # 【必須】設定値
    "description": "メンテナンスモード"    # 【オプション】説明
  }' \
  "http://api.valiondrive.com/portfolio-settings/portfolio_db"

# 【注意】
# - 同じキーが存在する場合は更新、存在しない場合は新規作成
# - PUT メソッドでも同様の動作
# - updated_byフィールドはデータベースのスキーマ問題により使用不可
```

### システム設定削除
```bash
# 【必須フィールド】key
curl -X DELETE -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "key": "maintenance_mode"    # 【必須】削除する設定キー
  }' \
  "http://api.valiondrive.com/portfolio-settings/portfolio_db"
```

---

## 📊 8. ログイン試行履歴エンドポイント (`portfolio-login-attempts`)

### ログイン試行履歴取得
```bash
# 全履歴取得（推奨）
curl -X GET -u admin:admin123 \
  "http://api.valiondrive.com/portfolio-login-attempts/portfolio_db"

# ⚠️ 注意: クエリパラメータは現在制限があります
# フィルタ付き取得は現在サポートに制限があります
# 推奨: 全データを取得してクライアント側でフィルタリング

# 【利用可能なフィルタ（制限あり）】
# - email: 特定ユーザーの履歴
# - success: true（成功）/false（失敗）
# - ip_address: 特定IPアドレスからの試行
# - limit: 取得件数（デフォルト: 50）
# - offset: オフセット（デフォルト: 0）

# 【レスポンス例】
# {
#   "success": true,
#   "message": "Login attempts retrieved successfully",
#   "data": [
#     {
#       "id": 1,
#       "email": "user@example.com",
#       "ip_address": "192.168.1.100",
#       "user_agent": "Mozilla/5.0...",
#       "success": false,
#       "failure_reason": "Invalid password",
#       "response_time_ms": 150,
#       "created_at": "2025-09-07T12:00:00Z"
#     }
#   ]
# }
```

### ログイン試行記録（手動）
```bash
# 【必須フィールド】email, success
# 【オプション】ip_address, user_agent, failure_reason, response_time_ms
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",           # 【必須】試行したメールアドレス
    "success": false,                      # 【必須】成功/失敗
    "failure_reason": "Invalid password",  # 【オプション】失敗理由
    "response_time_ms": 150,              # 【オプション】レスポンス時間（ミリ秒）
    "ip_address": "192.168.1.100",        # 【オプション】IPアドレス
    "user_agent": "Mozilla/5.0..."        # 【オプション】ユーザーエージェント
  }' \
  "http://api.valiondrive.com/portfolio-login-attempts/portfolio_db"

# 【注意】
# - 通常はログイン時に自動記録される
# - 手動記録は管理目的やテスト時に使用
```

### 古いログイン履歴削除
```bash
# 【オプション】days（デフォルト: 30日）
curl -X DELETE -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "days": 90    # 【オプション】保持期間（日数）
  }' \
  "http://api.valiondrive.com/portfolio-login-attempts/portfolio_db"

# 【例】
# days: 30 → 30日以上古い履歴を削除
# days: 90 → 90日以上古い履歴を削除
```

---

## 🔄 統合利用例

### 完全な認証フロー（修正版）
```bash
# 1. ユーザー登録
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{"name":"新規ユーザー","email":"new@example.com","password":"password123","auth_code":"ADMIN2024SECURE"}' \
  "http://api.valiondrive.com/portfolio-users/portfolio_db"

# 2. 登録されたユーザーIDを確認後、メール認証の有効化（管理者操作）
# ⚠️ 重要: ステップ1で返されたuser_idを使用してください
curl -X PUT -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{"id":"登録時に返されたuser_id","email_verified":true}' \
  "http://api.valiondrive.com/portfolio-users/portfolio_db"

# 3. ログイン（メール認証後）
curl -X POST -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{"email":"new@example.com","password":"password123","device_name":"WebApp"}' \
  "http://api.valiondrive.com/portfolio-auth/portfolio_db"

# 4. プロフィール更新
curl -X PUT -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{"user_id":"登録時のuser_id","bio":"プロフィールです","website":"https://example.com"}' \
  "http://api.valiondrive.com/portfolio-profiles/portfolio_db"

# 5. ログアウト
curl -X DELETE -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"ログイン時に取得したトークン"}' \
  "http://api.valiondrive.com/portfolio-auth/portfolio_db"
```

---

## ⚠️ 重要な注意事項

### 現在の制限事項
- **GETパラメータ**: URLクエリパラメータ（`?key=value`）は一部のエンドポイントで正常に処理されません
- **システム設定API**: `updated_by`フィールドはデータベーススキーマの問題により使用できません
- **メール認証**: ユーザー登録後は必ずメール認証を有効化してからログインしてください
- **ユーザーID**: 登録時に返されるuser_idを正確に記録し、後続の操作で使用してください

### セキュリティ
- **Basic認証**は必須です（username: admin, password: admin123）
- **HTTPS**での利用を強く推奨します
- **refresh_token**は適切に管理してください

### データ形式
- リクエスト: `Content-Type: application/json`
- レスポンス: JSON形式
- 日時形式: ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)

### エラーハンドリング
```json
// エラーレスポンス例
{
  "success": false,
  "message": "Missing required fields: email, password"
}
```

### 権限レベル
- **user**: 一般ユーザー
- **admin**: 管理者
- **master**: マスター管理者

### レート制限
- 現在は設定されていませんが、将来的に実装予定
- 大量のリクエストを送信する場合は事前にご相談ください

---

## 📞 サポート

API利用に関するご質問やトラブルシューティングについては、開発チームまでお問い合わせください。

**最終更新**: 2025年9月7日
