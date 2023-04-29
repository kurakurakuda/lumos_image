class ContentDto {
  id: string;
  fileType: string;
  contents: string;

  constructor(id: string, fileType: string, contents: string) {
    this.id = id;
    this.fileType = fileType;
    this.contents = contents;
  }
}

export default ContentDto;
