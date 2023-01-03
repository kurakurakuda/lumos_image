import IImageListDto from 'dto/interface/IImageListDto';
import IImageDto from 'dto/interface/IImageDto';
import React, { useEffect, useState } from 'react';
import '../css/imageList.css';
import IContentDto from 'dto/interface/IContentDto';
import { callDownloadApi, callGetImageListApi } from 'services/apiFetchService';

const ImageList = () => {
  const [images, setImages] = useState<IImageDto[] | undefined>(undefined);

  useEffect(() => {
    if (!images) {
      callGetImageListApi()
        .then((result: IImageListDto) => {
          setImages(result.images);
        })
        .catch(_ => {
          // eslint-disable-next-line no-alert
          void alert('データ取得に失敗しました');
          setImages([]);
        });
    }
  });

  const download = (id: string) => {
    callDownloadApi(id)
      .then((result: IContentDto) => {
        const a = document.createElement('a'); // Create <a>
        a.href = `data:image/${result.fileType};base64,${result.contents}`; // Image Base64 Goes here
        a.download = `${result.id}.${result.fileType}`; // File name Here
        a.click(); // Downloaded file
      })
      .catch(_ => {
        // eslint-disable-next-line no-alert
        void alert('ダウンロードに失敗しました');
      });
  };

  const imageListTile = (id: string, date: string) => (
    <div key={id} className="list-tile">
      <div onClick={() => download(id)} aria-hidden="true" role="button">
        {date}
      </div>
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
