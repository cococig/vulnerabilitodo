# Vulnerabilitodo
## 概要
セキュアコーディング教材用脆弱ToDoアプリ

## 環境構築
### VSCode devcontainerを使う場合
1. devcontainerを使って開発コンテナを作成
2. `init.sh`を実行

### Dockerfileを直接使う場合
1. プロジェクトのルートにあるDockerfileを使ってコンテナを作成
2. `init.sh`を実行後、推奨される拡張機能をインストール
3. `apt install sqlite3`を実行
4. (必須ではないが推奨)[@angular/cli](https://www.npmjs.com/package/@angular/cli)と[@nestjs/cli](https://www.npmjs.com/package/@nestjs/cli)をグローバルインストールしておく

### Dockerを使用しない場合
1. （Node.js環境が整っていない場合）`node_install.sh`を実行
 - [Volta](https://volta.sh/)がインストールされる
2. `init.sh`を実行

### Raspberry Piの場合
1. `init_raspberrypi.sh`を実行

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