import { ImageEntity } from '../entity/ImageEntity';
import datasource from './config/datasource';

const repo = datasource.getRepository(ImageEntity);

export const insertImageMetaData = async (
  id: string,
  path: string,
  fileType: string
) => {
  try {
    return await repo.save(new ImageEntity(id, path, fileType));
  } catch (err) {
    console.log('Failed to insert meta data');
    console.error(err);
    throw Error;
  }
};
