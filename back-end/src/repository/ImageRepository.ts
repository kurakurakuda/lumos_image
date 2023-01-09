import { ImageEntity } from '../entity/ImageEntity';
import datasource from './config/datasource';

const repo = datasource.getRepository(ImageEntity);

export const findImages = async () => {
  try {
    return await repo.find({
      order: {
        createdDateTs: 'DESC'
      }
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

export const insertImageMetaData = async (
  id: string,
  path: string,
  fileType: string
) => {
  try {
    return await repo.save(new ImageEntity(id, path, fileType));
  } catch (err) {
    console.log('insertImageMetaData');
    console.log(err);
    throw Error;
  }
};

export const findImageById = async (id: string) => {
  try {
    return await repo.findOneBy({
      id: id
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};
