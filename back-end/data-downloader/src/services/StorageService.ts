import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const dir = process.env.STORAGE_DIR;
export const buildImagePath = (fileName: string) => `${dir}${fileName}`;

export const download = async (path: string) => {
  try {
    return await fs.promises.readFile(path, {
      encoding: 'base64'
    });
  } catch (err) {
    console.log('Failed to download image');
    console.error(err);
    throw Error;
  }
};
