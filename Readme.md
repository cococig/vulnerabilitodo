# Vulnerabilitodo(仮名)
## 概要
セキュリティミニキャンプ教材用脆弱ToDoアプリ

## 環境構築
1. `npm ci`を実行
2. `backend/.env`ファイルを作成し、`DATABASE_URL="file:./dev.db"`と書き込んで保存
3. `npm run migrate`を実行し、DBを作成

## 実行
1. `npm run start`でフロントエンドとバックエンドが両方立ち上がる
2. http://localhost:4200 がフロントエンド、http://localhost:3000 がバックエンド

## 現在の主な機能と脆弱性
- ログイン機能
  - 生パスワードの保存
  - SQLインジェクション
- ToDo取得機能
  - 認証・認可不備
- ToDo新規作成機能
  - DOM Based XSS
- ToDo更新機能
  - 認証・認可不備
- ToDo削除機能
  - 認証・認可不備