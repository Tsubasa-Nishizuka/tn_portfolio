# データベース移行ガイド

## 🚀 クラウドデータベースへの移行手順

### 1. Supabaseを使用する場合

#### ステップ1: Supabaseプロジェクト作成
1. https://supabase.com でアカウント作成
2. 新しいプロジェクトを作成
3. データベースのパスワードを設定

#### ステップ2: テーブル作成
SQL Editorで以下を実行:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin', 'master')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### ステップ3: 環境変数設定
.env.local に追加:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

#### ステップ4: パッケージインストール
```bash
npm install @supabase/supabase-js
```

#### ステップ5: コード変更
src/lib/database.ts で:
```typescript
// SQLiteからSupabaseに切り替え
import { SupabaseAdapter } from './adapters/supabase-adapter';

export class UserService {
  private db: SupabaseAdapter;
  
  constructor() {
    this.db = new SupabaseAdapter();
  }
  
  // メソッドをasync/awaitに変更
  async findByEmail(email: string) {
    return await this.db.findUserByEmail(email);
  }
}
```

### 2. データ移行

#### 既存データのエクスポート
```bash
# SQLiteからデータをエクスポート
sqlite3 data/portfolio.db ".dump" > backup.sql
```

#### 手動でデータを移行
1. 既存ユーザーをCSVで出力
2. Supabaseにインポート

### 3. 段階的移行

#### フェーズ1: 並行運用
- SQLiteとクラウドDBを並行運用
- 新規ユーザーはクラウドDBに保存

#### フェーズ2: 完全移行
- 全ユーザーをクラウドDBに移行
- SQLiteを停止

## ⚠️ 注意事項

1. **バックアップ**: 移行前に必ずデータをバックアップ
2. **テスト**: 開発環境で十分にテスト
3. **ダウンタイム**: 移行時のサービス停止時間を最小限に
4. **ロールバック**: 問題発生時の復旧手順を準備

## 💡 推奨移行タイミング

- ユーザー数が100人を超えたら
- 本番デプロイ前
- データ損失リスクを避けたいとき
