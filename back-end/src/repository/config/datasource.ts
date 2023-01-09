import * as dotenv from 'dotenv';
import { ImageEntity } from '../../entity/ImageEntity';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

const tryCount = 5;

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ImageEntity],
  timezone: 'Z'
};

const datasource = new DataSource(options);

datasource
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch(err => {
    console.error(`Data Source initialization error`, err);
  });

for (let i = 0; i < tryCount; i += 1) {
  void new Promise(resolve => setTimeout(resolve, 2 ** i * 1000)).then(() => {
    if (datasource.isInitialized) {
      return;
    }
    datasource
      .initialize()
      .then(() => {
        console.log(`Data Source has been initialized`);
      })
      .catch(err => {
        console.error(`Data Source initialization error`, err);
      });
  });
}

export default datasource;
