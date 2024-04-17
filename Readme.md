# Vulnerabilitodo(仮名)
## 概要
セキュリティミニキャンプ教材用脆弱ToDoアプリ

## 環境構築
1. （Node.js環境が整っていない場合）`node_install.sh`を実行
2. `init.sh`を実行

## 実行
1. `start.sh`を実行でフロントエンドとバックエンドが両方立ち上がる
2. http://<hostname>:4200 がフロントエンド、http://<hostname>:3000 がバックエンド

## テスト用ユーザー情報
- username: `test_user`
- password: `test_password`

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