class ImageDto {
  id: string;
  createdDateTs: string;

  constructor(id: string, createdDateTs: string) {
    this.id = id;
    this.createdDateTs = createdDateTs;
  }
}

export default ImageDto;
