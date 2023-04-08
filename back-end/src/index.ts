import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import { router as imageRouter } from './routers/ImageRouter';
import { Server } from 'socket.io';
import { createTopics } from './topics/TopicProcessor';
import http from 'http';
import { startUploadResultConsumer } from './consumers/UploadResultConsumer';

const api = express();
const port = process.env.PORT || '8000';
const server = http.createServer(api);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

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

server.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

void createTopics().then(_ => {
  console.log('Topics were created');

  io.on('connect', socket => {
    console.log('a user connected');
    void startUploadResultConsumer(socket);
    console.log('a user connected 2222');
    socket.emit('foo', 'foooooooooooo');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
});
