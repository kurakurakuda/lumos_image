import { ImageEntity } from '../entity/ImageEntity';

class ImageDto {
  id: string;
  createdDateTs: string;

  constructor(entity: ImageEntity) {
    this.id = entity.id;
    this.createdDateTs = entity.createdDateTs;
  }
}

export default ImageDto;
