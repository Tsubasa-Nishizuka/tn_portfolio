# データベース選択肢

## 🌐 クラウドデータベース（推奨）

### Vercel + PlanetScale (MySQL)
- 無料枠: 1GB, 1億リクエスト/月
- 自動スケーリング
- 簡単デプロイ

### Vercel + Supabase (PostgreSQL)
- 無料枠: 500MB, 50,000リクエスト/月
- リアルタイム機能
- 認証機能内蔵

### Vercel + Neon (PostgreSQL)
- 無料枠: 512MB, 100時間/月
- サーバーレスPostgreSQL
- 自動スケーリング

### Firebase (NoSQL)
- 無料枠: Firestore 1GBストレージ, 50,000ドキュメント読み取り/日
- リアルタイム同期
- 認証機能内蔵

### MongoDB Atlas (NoSQL)
- 無料枠: 512MBストレージ, 100,000リクエスト/月
- ドキュメント指向データベース
- グローバル分散

### Railway + PostgreSQL
- 無料枠: $5/月クレジット
- 簡単セットアップ
- 自動バックアップ

### Google Cloud SQL (PostgreSQL/MySQL)
- 無料枠: なし（従量課金）
- マネージドサービス
- 高可用性

### AWS RDS (PostgreSQL/MySQL/Oracle/SQL Server)
- 無料枠: 750時間/月（12ヶ月）
- フルマネージド
- マルチAZ対応

### Azure Database (PostgreSQL/MySQL/SQL Server)
- 無料枠: 750時間/月（12ヶ月）
- ハイブリッド対応
- セキュリティ強化

### CockroachDB (PostgreSQL互換)
- 無料枠: 5GB, 1ノード
- 分散SQLデータベース
- 高可用性

### Gcore Cloud Database (PostgreSQL/MySQL)
- 無料枠: なし（従量課金）
- グローバル展開
- 高性能

## 🏠 自前サーバー

### Contabo VPS + PostgreSQL/MySQL
- コスト: €4.99/月〜
- 完全コントロール
- カスタム設定可能

### Xサーバー + MySQL
- コスト: ¥1,100/月〜
- 日本のレンタルサーバー
- 簡単セットアップ

### Hetzner VPS + PostgreSQL/MySQL
- コスト: €3.79/月〜
- 安価で高性能
- ヨーロッパ拠点

### OVH VPS + PostgreSQL/MySQL
- コスト: €3.99/月〜
- スケーラブル
- グローバル拠点

### DigitalOcean VPS + PostgreSQL/MySQL
- コスト: $6/月〜
- ドロップレット形式
- 簡単デプロイ

### Vultr VPS + PostgreSQL/MySQL
- コスト: $2.50/月〜
- 高速SSD
- グローバル展開

### Linode VPS + PostgreSQL/MySQL
- コスト: $5/月〜
- Akamai提供
- 高可用性

## 🗂️ ストレージオプション

### Cloudflare R2
- コスト: 最初の10GB無料、$0.015/GB/月
- S3互換API
- グローバルCDN

### AWS S3
- 無料枠: 5GB, 20,000リクエスト/月
- 標準オブジェクトストレージ
- 高耐久性

### Google Cloud Storage
- 無料枠: 5GB, 1GBダウンロード/月
- マルチリージョン
- 自動階層化

### Azure Blob Storage
- 無料枠: 5GB, 2万トランザクション/月
- ホット/クール/アーカイブ層
- セキュリティ統合

## 📊 比較表

| サービス | DB種類 | 無料枠 | セットアップ | 推奨度 |
|----------|--------|--------|--------------|--------|
| PlanetScale | MySQL | 1GB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Supabase | PostgreSQL | 500MB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Neon | PostgreSQL | 512MB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Firebase | NoSQL | Firestore 1GBストレージ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| MongoDB Atlas | NoSQL | 512MBストレージ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Railway | PostgreSQL | $5/月 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Google Cloud SQL | PostgreSQL/MySQL | なし | ⭐⭐ | ⭐⭐⭐⭐ |
| AWS RDS | PostgreSQL/MySQL | 750h/月 | ⭐⭐ | ⭐⭐⭐⭐ |
| Azure Database | PostgreSQL/MySQL | 750h/月 | ⭐⭐ | ⭐⭐⭐⭐ |
| Contabo VPS | PostgreSQL/MySQL | なし | ⭐⭐⭐ | ⭐⭐⭐ |
| Xサーバー | MySQL | なし | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Hetzner VPS | PostgreSQL/MySQL | なし | ⭐⭐⭐ | ⭐⭐⭐ |
| OVH VPS | PostgreSQL/MySQL | なし | ⭐⭐⭐ | ⭐⭐⭐ |
| DigitalOcean VPS | PostgreSQL/MySQL | なし | ⭐⭐⭐ | ⭐⭐⭐ |
| Vultr VPS | PostgreSQL/MySQL | なし | ⭐⭐⭐ | ⭐⭐⭐ |
| Linode VPS | PostgreSQL/MySQL | なし | ⭐⭐⭐ | ⭐⭐⭐ |
| SQLite | ファイル | 無制限 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Cloudflare R2 | オブジェクト | 10GB | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| AWS S3 | オブジェクト | 5GB | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Google Cloud Storage | オブジェクト | 5GB | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Azure Blob Storage | オブジェクト | 5GB | ⭐⭐⭐ | ⭐⭐⭐⭐ |
