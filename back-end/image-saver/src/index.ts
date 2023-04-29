import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { createTopics } from './topics/TopicProcessor';
import http from 'http';

const api = express();
const port = process.env.PORT || '8001';
const server = http.createServer(api);

// to support JSON-encoded bodies
api.use(bodyParser.json({ limit: '100mb' }));
// to support URL-encoded bodies
api.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true
  })
);
api.use(
  cors({
    origin: '*', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
  })
);

server.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

void createTopics().then(_ => {
  console.log('Topics were created');
});
