import express from 'express';
import { router as imageRouter } from './routers/imageRouters';

const app = express();
const port = process.env.PORT || '8000';

app.use('/images', imageRouter);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
