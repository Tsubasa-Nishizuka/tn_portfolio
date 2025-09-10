# 🗄️ データベース移行完全ガイド

## 📋 目次
1. [現在の状況](#現在の状況)
2. [なぜPlanetScaleか？](#なぜplanetscaleか)
3. [移行手順（Yarn版）](#移行手順yarn版)
4. [実装状況](#実装状況)
5. [コスト比較](#コスト比較)
6. [面接アピール](#面接アピール)

---

## 🎯 現在の状況

### ✅ **実装完了項目**
- ✅ SQLiteデータベース（3名のテストユーザー）
- ✅ データベースアダプター設計
- ✅ PlanetScaleアダプター完全実装
- ✅ SQLiteアダプター実装
- ✅ 型安全性（TypeScript）
- ✅ 環境分離対応

### 📁 **ファイル構成**
```
src/lib/adapters/
├── database-adapter.ts     # インターフェース
├── sqlite-adapter.ts       # 開発環境用
├── planetscale-adapter.ts  # 本番環境用 ✅
└── supabase-adapter.ts     # 代替案
```

### 🗄️ **利用可能なデータベース**
- **SQLite**: 開発環境用、軽量・高速
- **PostgreSQL**: 自前サーバー (Contabo VPS) で構築、ACID準拠
- **MySQL**: PlanetScale経由で分散スケーリング可能
- **NoSQL**: MongoDBなど、柔軟なデータ構造対応

---

## 🚀 なぜPlanetScaleか？

### ✨ **技術的アピールポイント**
1. **本格的な分散MySQL**: VitessによるスケーラブルDBエンジン
2. **GitOpsワークフロー**: DB変更をブランチで管理
3. **NoSQL並みの使いやすさ**: ORM不要のシンプルSQL
4. **エンタープライズ級**: YouTube、Slack、GitHubが使用
5. **ゼロダウンタイム**: スキーマ変更が本番稼働中でも可能

### 🎯 **ポートフォリオでPRできる技術**
- **Vitess**: YouTubeが開発したDB技術
- **MySQL分散**: 水平スケーリング対応
- **GitOpsワークフロー**: DB変更をGitで管理
- **サーバーレス**: オートスケーリング
- **エッジ最適化**: グローバル分散

---

## 🛠️ 移行手順（Yarn版）

### ステップ1: PlanetScaleセットアップ
```bash
# 1. アカウント作成
open https://app.planetscale.com

# 2. CLIインストール（オプション）
brew install planetscale/tap/pscale
pscale auth login

# 3. データベース作成
pscale database create tn-portfolio
```

### ステップ2: パッケージ確認
```bash
# すでにインストール済み ✅
yarn list mysql2
# mysql2@3.14.4 (型定義内蔵)
```

### ステップ3: 環境変数設定
`.env.local` に追加:
```env
# PlanetScale接続情報
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=tn-portfolio

# 開発環境ではローカルDB継続使用
NODE_ENV=development
```

### ステップ4: テーブル作成
PlanetScale Consoleで実行:
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

### ステップ5: アダプター切り替え
`src/lib/database.ts` で:
```typescript
import { SQLiteAdapter } from './adapters/sqlite-adapter';
import { PlanetScaleAdapter } from './adapters/planetscale-adapter';

export class UserService {
  private db: SQLiteAdapter | PlanetScaleAdapter;
  
  constructor() {
    // 環境に応じて自動切り替え
    this.db = process.env.NODE_ENV === 'production' 
      ? new PlanetScaleAdapter()
      : new SQLiteAdapter();
  }
}
```

---

## 📊 実装状況

### ✅ **PlanetScaleアダプター詳細**
- **ファイルサイズ**: 141行（完全実装）
- **型安全性**: TypeScript + DatabaseAdapter interface
- **接続管理**: mysql2/promise使用
- **エラーハンドリング**: 全メソッドでtry-catch
- **SSL対応**: PlanetScale必須のSSL設定

### 🚀 **実装済み機能**
1. `findUserByEmail()` - ログイン認証用
2. `findUserById()` - JWT検証用  
3. `createUser()` - ユーザー登録用
4. `updateUser()` - プロフィール更新用
5. `deleteUser()` - アカウント削除用
6. `close()` - 接続クリーンアップ用

---

## 📋 Queue機能

### 🔄 **利用可能なQueueシステム**
- **Redis**: 高速インメモリキュー、キャッシュ兼用
- **Kafka**: 大規模分散メッセージング、リアルタイム処理

### 🎯 **実装可能な機能**
- ジョブキューイング
- 非同期処理
- メッセージブローカー
- イベント駆動アーキテクチャ

---

## 💰 コスト比較

| サービス | 無料枠 | 料金/月 | スケール | おすすめ度 |
|---------|-------|---------|---------|-----------|
| **PlanetScale** | 1DB + 1GB | $29〜 | 世界規模 | ⭐⭐⭐⭐⭐ |
| Supabase | 500MB | $25〜 | 世界規模 | ⭐⭐⭐⭐ |
| Railway | 512MB | $5〜 | 限定的 | ⭐⭐⭐ |
| SQLite | 無制限 | 無料 | 単一サーバー | ⭐⭐ |

---

## 🎤 面接アピール

### 📋 **説明例**
> 「認証システムでは、開発環境はSQLiteで高速開発を行い、本番環境はPlanetScaleのVitessクラスターを使用しています。これにより、YouTubeやSlackと同じスケーラブルなアーキテクチャを実現しつつ、開発体験も最適化しました。アダプターパターンにより、将来的な他DBへの切り替えも容易です。」

### 🔧 **技術キーワード**
- Vitess（YouTube開発）
- 分散MySQL
- GitOpsワークフロー
- アダプターパターン
- 型安全性（TypeScript）
- 環境分離
- スケーラブルアーキテクチャ

---

## 🚀 次のアクション

### Option 1: 即座にPlanetScale移行 ⚡
1. PlanetScaleアカウント作成
2. 環境変数設定
3. UserService切り替え

### Option 2: 現状維持+強化 🛡️
1. 定期バックアップ設定
2. SQLite最適化
3. 本番デプロイ時に移行

### Option 3: デモ環境で検証 🧪
1. PlanetScale無料枠で検証
2. パフォーマンステスト
3. 移行判断

---

**すべての準備が完了しています！どの方向で進めますか？** 🎉
