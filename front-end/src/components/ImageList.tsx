import React from 'react';
import '../css/imageList.css';

const ImageList = () => {
  const images = [
    {
      id: '0',
      createdDateTs: '2022-12-31T07:33:09.842Z'
    },
    {
      id: '1',
      createdDateTs: '2022-12-31T07:33:09.842Z'
    },
    {
      id: '2',
      createdDateTs: '2022-12-31T07:33:09.842Z'
    },
    {
      id: '3',
      createdDateTs: '2022-12-31T07:33:09.842Z'
    },
    {
      id: '4',
      createdDateTs: '2022-12-31T07:33:09.842Z'
    }
  ];

  const imageListTile = (id: string, date: string) => (
    <div key="$id" className="list-tile">
      {date}
    </div>
  );
  const imageListTiles: JSX.Element[] = [];

  images.forEach(e => {
    imageListTiles.push(imageListTile(e.id, e.createdDateTs));
  });

  return <div className="image-list">{imageListTiles}</div>;
};

export default ImageList;
