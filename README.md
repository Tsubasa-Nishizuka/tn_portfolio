# 🚀 TN Portfolio - フルスタック認証・AI統合ポートフォリオ

Next.js 15 + TypeScript + PostgreSQL で構築した、本格的な認証・AI機能統合ポートフォリオサイトです。

## 📋 サイト概要

このサイトは、モダンなフルスタック開発の技術力を実証するポートフォリオプラットフォームです。エンタープライズレベルの認証システム、AI統合チャットボット、柔軟なデータベースアーキテクチャを組み合わせて構築されており、スケーラビリティと保守性を重視した設計になっています。

### 🤖 AI Chatbot 機能（実装済み）

本サイトには **2段階のインテリジェントChatbot** が統合されています：

1. **ドキュメント検索フェーズ**: ユーザーの質問を解析し、関連するドキュメントを自動選択
2. **回答生成フェーズ**: 選択されたドキュメントを基に、Google Gemini が文脈に沿った回答を生成

- **RAG（検索拡張生成）**: `/public/docs/` 内のドキュメントベースの正確な回答
- **ストリーミング応答**: リアルタイムでの回答表示（SSE使用）
- **コンテキスト保持**: 会話履歴を考慮した対話
- **モバイル最適化**: Android/iOS キーボード対応、レスポンシブUI

> 注意（AIに関する表記）
>
> - 本サイトに実装済みのAI機能は「ドキュメント検索型ChatBot（Gemini API + RAG）」です。
> - `/public/docs/` 内のドキュメント（技術仕様、開発アイデア等）を基に回答を生成します。
> - その他のAI機能（営業AI、分析AI等）は「実装可能な技術デモ」として紹介しており、要件に応じて開発可能です。

## ✨ 主要機能

- 🔐 **多段階認証**: 3種類の登録フォーム（user/admin/master）
- 🎭 **ロールベース認証**: 役割に応じたダッシュボード・権限制御
- 🛡️ **セキュリティ**: JWT + HttpOnly Cookie + サーバーサイド検証
- 🗄️ **フレキシブルDB**: PostgreSQL（本番）/ SQLite・MySQL 切り替え対応
- 🤖 **AI統合**: Gemini API + RAG による高度なチャットボット
- 🎨 **モダンUI**: Tailwind CSS + レスポンシブ + ダークモード

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 15**: App Router, Server Components, Turbopack
- **TypeScript**: 完全型安全性、エディタサポート
- **Tailwind CSS**: ユーティリティファースト、カスタムテーマ
- **React Hooks**: カスタムフック（useAuth等）

### バックエンド・認証
- **API Routes**: RESTful API, サーバーサイドロジック
- **JWT認証**: bcryptjs ハッシュ化, HttpOnly Cookie
- **アダプターパターン**: DB抽象化層によるスケーラブル設計

### データベース（柔軟な選択肢）
- **本番環境**: PostgreSQL (Contabo VPS / AWS RDS / Azure Database)
- **開発環境**: SQLite (ローカル開発用)
- **代替オプション**: MySQL, MariaDB (アダプター切り替えで対応可能)

### AI・外部サービス
- **Google Generative AI**: Gemini Pro モデル
- **Server-Sent Events (SSE)**: リアルタイムストリーミング
- **ドキュメント検索**: カスタムインデックス + セマンティック検索

## 🎯 技術選定理由

### なぜ Next.js 15？
- **パフォーマンス**: Turbopack による高速ビルド
- **SEO対応**: SSR/SSG のハイブリッド対応
- **開発体験**: Hot Reload, TypeScript統合

### なぜ PostgreSQL？
- **拡張性**: 大規模データ対応、複雑なクエリサポート
- **信頼性**: ACID準拠、トランザクション整合性
- **互換性**: 各種クラウドプロバイダーでサポート

### なぜアダプターパターン？
- **柔軟性**: DB変更時のコード修正最小化
- **テスタビリティ**: モックDB での単体テスト容易
- **スケーラビリティ**: 将来的な分散DB対応

## 🔄 代替可能・追加可能技術

### データベース代替案
```bash
# SQLite (開発・小規模)
DATABASE_TYPE=sqlite

# MySQL (従来型RDBMS)  
DATABASE_TYPE=mysql

# PostgreSQL (推奨)
DATABASE_TYPE=postgresql
````

## 🚀 セットアップ

```bash
# 依存関係インストール
yarn install

# 環境変数設定
cp .env.example .env.local

# .env.local に以下の環境変数を設定してください
# DATABASE_TYPE=postgresql  # または sqlite/mysql
# NEXTAUTH_SECRET=your-secret-key
# NEXTAUTH_URL=http://localhost:3000
# GEMINI_API_KEY=your-gemini-api-key  # Google Gemini API キー（Chatbot 利用時に必須）

# データベース初期化（SQLiteの場合）
yarn db:init

# 開発サーバー起動
yarn dev

# 本番ビルド
yarn build
```

> **注意**: AI Chatbot 機能を利用するには、Google AI Studio（Google Generative AI）から取得した `GEMINI_API_KEY` の設定が必要です。`.env.local` に `GEMINI_API_KEY` が設定されていない場合、Chatbot は機能しません。