import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { router as imageRouter } from './routers/ImageRouter';

import { createTopics } from './topics/TopicProcessor';

const api = express();
const port = process.env.PORT || '8000';

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
api.use('/images', imageRouter);

api.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

void createTopics().then(_ => {
  console.log('Topics were created');
});
