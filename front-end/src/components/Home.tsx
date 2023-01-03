import IUploadDto from 'dto/interface/IUploadDto';
import React, { useState, useRef } from 'react';
import '../css/home.css';
import Canvas from './canvas/Canvas';
import Lumos from './canvas/sketch/Lumos';
import NoImage from './canvas/sketch/NoImage';
import Sketch from './canvas/sketch/Sketch';

const Home = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const uploadRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    uploadRef.current?.click();
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImage(undefined);
    const reader = new FileReader();
    const fileObject: File = e.target.files[0];
    reader.onload = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      // onChangeは連続で同じファイルを選択すると発火しないので、
      // この操作を追加して、発火するようにする
      // ブラウザが、直前のファイル情報を持っており、そこで判断している模様
      e.target.value = '';
    };
    reader.readAsDataURL(fileObject);
  };

  const onImageClear = () => {
    setImage(undefined);
  };

  const UploadDtoBuilder = (data: string): IUploadDto => ({
    fileType: 'png',
    contents: data
  });

  const saveImage = () => {
    if (!image) {
      // eslint-disable-next-line no-alert
      void alert('画像をアップロードしてください');
      return;
    }
    const data = Sketch.getBase64String();

    fetch('http://localhost:8000/images', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(UploadDtoBuilder(data))
    })
      .then(r => {
        if (!r.ok) {
          throw Error();
        }
        // eslint-disable-next-line no-alert
        void alert('画像の保存に成功しました');
      })
      .catch(_ => {
        // eslint-disable-next-line no-alert
        void alert('画像の保存に失敗しました');
      });
  };

  return (
    <div className="home">
      <Canvas sketch={image ? Lumos.sketch(image) : NoImage.sketch()} />
      <div className="btn-area">
        <div>
          <button
            type="button"
            className="btn clear-btn"
            onClick={onImageClear}
          >
            クリア
          </button>
        </div>
        <div>
          <input
            hidden
            ref={uploadRef}
            type="file"
            accept="image/png"
            onChange={onImageUpload}
          />
          <button
            type="button"
            className="btn upload-btn"
            onClick={onUploadButtonClick}
          >
            アップロード
          </button>
          <button type="button" className="btn save-btn" onClick={saveImage}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
