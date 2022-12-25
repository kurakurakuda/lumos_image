import React, { useState, useRef } from 'react';
import '../css/home.css';
import Canvas from './canvas/Canvas';
import Lumos from './canvas/sketch/Lumos';
import NoImage from './canvas/sketch/NoImage';

const Home = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [image, setImage] = useState('');
  const uploadRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    // useRef<HTMLInputElement>のcurrent要素を呼び出し、ファイル選択画面を表示
    window.URL.revokeObjectURL(image);
    uploadRef.current?.click();
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject: File = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setIsUploaded(true);
    setImage(window.URL.createObjectURL(fileObject));
  };

  const onImageClear = () => {
    window.URL.revokeObjectURL(image);
    setIsUploaded(false);
    setImage('');
  };

  return (
    <div className="home">
      Home <br />
      <Canvas sketch={isUploaded ? Lumos.sketch(image) : NoImage.sketch()} />
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
            accept="image/*"
            onChange={onImageUpload}
          />
          <button
            type="button"
            className="btn upload-btn"
            onClick={onUploadButtonClick}
          >
            アップロード
          </button>
          <button type="button" className="btn save-btn" onClick={() => null}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
