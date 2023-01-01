import IImageListDto from 'dto/interface/IImageListDto';
import IImageDto from 'dto/interface/IImageDto';
import React, { useEffect, useState } from 'react';
import '../css/imageList.css';

const ImageList = () => {
  const [images, setImages] = useState<IImageDto[] | undefined>(undefined);

  useEffect(() => {
    if (!images) {
      fetch('http://localhost:8000/images', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (result: Response) => {
          const json = (await result.json()) as IImageListDto;
          setImages(json.images);
        })
        .catch(_ => {
          // eslint-disable-next-line no-alert
          void alert('データ取得に失敗しました');
          setImages([]);
        });
    }
  });

  const imageListTile = (id: string, date: string) => (
    <div key={id} className="list-tile">
      {date}
    </div>
  );

  const imageListTiles = (entities: IImageDto[]): JSX.Element[] =>
    entities.map(e => imageListTile(e.id, e.createdDateTs));

  return (
    <div className="image-list">
      {images ? imageListTiles(images) : <div />}
    </div>
  );
};

export default ImageList;
