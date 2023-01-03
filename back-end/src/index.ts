import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { router as imageRouter } from './routers/ImageRouter';

const app = express();
const port = process.env.PORT || '8000';

// to support JSON-encoded bodies
app.use(bodyParser.json({ limit: '100mb' }));
// to support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true
  })
);
app.use(
  cors({
    origin: '*', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
  })
);
app.use('/images', imageRouter);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
