# ベースイメージの作成
FROM node:16-bullseye-slim

# package.jsonをコピー
COPY ["package.json", "./"]
# パッケージをインストール
# コンテナのサイズ縮小のため、--productionコマンドかつcache削除
RUN yarn install --production --frozen-lockfile \
  && yarn cache clean

# package.json内で、"nodemon"でアプリを起動している。
# yarn install --productionコマンドで、devDependencies packageが
# installされていないので、ここで追加でinstallする必要がある
RUN yarn add nodemon

# ファイルを全部作業用ディレクトリにコピー
COPY . .
# コンテナを起動する際に実行されるコマンド
ENTRYPOINT [ "yarn", "start" ]