import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const dir = process.env.STORAGE_DIR;
export const buildImagePath = (fileName: string) => `${dir}${fileName}`;

export const upload = async (path: string, contents: string) => {
  try {
    const buffer = Buffer.from(contents, 'base64');
    await fs.promises.writeFile(path, buffer);
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

export const download = async (path: string) => {
  try {
    return await fs.promises.readFile(path, {
      encoding: 'base64'
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};
