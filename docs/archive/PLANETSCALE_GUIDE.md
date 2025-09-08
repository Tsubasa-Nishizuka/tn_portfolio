# 🚀 PlanetScale移行ガイド（Yarn版）

## なぜPlanetScaleがポートフォリオに最適か？

### ✨ **技術的アピールポイント**
1. **本格的な分散MySQL**: VitessによるスケーラブルDBエンジン
2. **GitOpsワークフロー**: DB変更をブランチで管理
3. **NoSQL並みの使いやすさ**: ORM不要のシンプルSQL
4. **エンタープライズ級**: YouTube、Slackが使用
5. **ゼロダウンタイム**: スキーマ変更が本番稼働中でも可能

## 🛠️ セットアップ手順（Yarn版）

### ステップ1: PlanetScaleアカウント作成
```bash
# PlanetScale CLIインストール（オプション）
brew install planetscale/tap/pscale
pscale auth login
```

### ステップ2: データベース作成
```bash
# CLIで作成
pscale database create tn-portfolio

# またはWebUIで作成
# https://app.planetscale.com
```

### ステップ3: パッケージインストール（Yarn）
```bash
yarn add mysql2
yarn add -D @types/mysql2
```

### ステップ4: 環境変数設定
.env.local に追加:
```
# PlanetScale接続情報
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=tn-portfolio

# 開発環境ではローカルDB継続使用
NODE_ENV=development
```

### ステップ5: テーブル作成
PlanetScale Consoleで:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin', 'master') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔄 段階的移行戦略

### フェーズ1: 環境分離
```typescript
// src/lib/database.ts
import { SQLiteAdapter } from './adapters/sqlite-adapter';
import { PlanetScaleAdapter } from './adapters/planetscale-adapter';

export class UserService {
  private db: SQLiteAdapter | PlanetScaleAdapter;
  
  constructor() {
    // 環境に応じて切り替え
    this.db = process.env.NODE_ENV === 'production' 
      ? new PlanetScaleAdapter()
      : new SQLiteAdapter();
  }
}
```

### フェーズ2: デプロイ前移行
1. 本番環境変数設定
2. PlanetScaleにテストデータ投入
3. Vercel/Netlifyデプロイ

### フェーズ3: 完全移行
- SQLiteアダプターを削除
- PlanetScaleのみに統一

## 💰 コスト比較

| サービス | 無料枠 | 料金/月 | スケール |
|---------|-------|---------|---------|
| **PlanetScale** | 1DB + 1GB | $29〜 | 世界規模 |
| Supabase | 500MB | $25〜 | 世界規模 |
| Railway | 512MB | $5〜 | 限定的 |

## 🎯 ポートフォリオでアピールできる技術

1. **Vitess**: YouTubeが開発したDB技術
2. **MySQL分散**: 水平スケーリング対応
3. **GitOpsワークフロー**: DB変更をGitで管理
4. **サーバーレス**: オートスケーリング
5. **エッジ最適化**: グローバル分散

## 📋 面接での説明例

> 「認証システムでは、開発環境はSQLiteで高速開発を行い、本番環境はPlanetScaleのVitessクラスターを使用しています。これにより、YouTubeやSlackと同じスケーラブルなアーキテクチャを実現しつつ、開発体験も最適化しました。」

## ⚡ 実装のベストプラクティス

1. **接続プーリング**: mysql2のprompiseプールを活用
2. **エラーハンドリング**: 詳細なログ出力
3. **型安全性**: TypeScriptでスキーマ定義
4. **テスト**: 開発環境でSQLiteテスト実行
