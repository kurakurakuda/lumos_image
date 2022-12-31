import bodyParser from 'body-parser';
import express from 'express';
import { router as imageRouter } from './routers/ImageRouter';

const app = express();
const port = process.env.PORT || '8000';

// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use('/images', imageRouter);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
