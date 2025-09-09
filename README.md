# 🚀 TN Portfolio - 認証システム付きポートフォリオ

Next.js 15 + TypeScript で構築した、本格的な認証機能付きポートフォリオサイトです。

> 注意（AIに関する表記）
>
> - 本サイトにおけるAI機能の実装は「説明用のChatBot（GeminiによるQ&A）」のみです。
> - Docsに記載のAIサービス/エージェントは「実装可能な技術の紹介」であり、当サイトに搭載済みであることを意味しません。
> - 実装をご要望の場合は要件に応じて開発可能です。

## ✨ 主要機能

- 🔐 **多段階認証**: 3種類の登録フォーム（user/admin/master）
- 🎭 **ロールベース認証**: 役割に応じたダッシュボード
- 🛡️ **セキュリティ**: JWT + サーバーサイド検証
- 🗄️ **スケーラブルDB**: SQLite ⇄ PlanetScale 切り替え対応
- 🎨 **モダンUI**: Tailwind CSS + レスポンシブデザイン

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 15, TypeScript, Tailwind CSS
- **認証**: JWT, bcryptjs, HttpOnly Cookies
- **データベース**: SQLite (開発) / PlanetScale (本番)
- **アーキテクチャ**: アダプターパターン, サーバーサイドAPI

## 🚀 セットアップ

```bash
# 依存関係インストール
yarn install

# 開発サーバー起動
yarn dev

# 本番ビルド
yarn build
```

## 📖 ドキュメント

詳細な移行手順やセットアップは **[DATABASE_COMPLETE_GUIDE.md](./DATABASE_COMPLETE_GUIDE.md)** をご覧ください。

## 🎯 ポートフォリオハイライト

- **YouTubeレベルの技術**: Vitess (PlanetScale) 採用
- **エンタープライズ設計**: アダプターパターンでDB切り替え
- **セキュリティファースト**: サーバーサイド認証
- **型安全性**: 完全TypeScript対応

## 📂 プロジェクト構成

```
src/
├── app/                 # App Router
├── lib/
│   ├── adapters/       # DBアダプター
│   ├── auth.ts         # JWT認証
│   └── database.ts     # ユーザーサービス
└── hooks/              # カスタムフック
```

---

**🌟 面接で語れる技術力を実装済み！**
