import ImageDto from './ImageDto';

class ImageListDto {
  images: ImageDto[];

  constructor(images: ImageDto[]) {
    this.images = images;
  }
}

export default ImageListDto;
