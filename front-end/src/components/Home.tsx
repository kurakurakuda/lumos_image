import React, { useState, useRef } from 'react';
import '../css/home.css';
import Canvas from './canvas/Canvas';
import Lumos from './canvas/sketch/Lumos';
import NoImage from './canvas/sketch/NoImage';

const Home = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageProps, setImage] = useState({ src: '', width: 0, height: 0 });
  const uploadRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    // useRef<HTMLInputElement>のcurrent要素を呼び出し、ファイル選択画面を表示
    uploadRef.current?.click();
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const img = new Image();

    img.onload = () => {
      // ここでサイズが取得できる
      const props = {
        src: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      setIsUploaded(true);
      setImage(props);

      window.URL.revokeObjectURL(imageProps.src);
      // onChangeは連続で同じファイルを選択すると発火しないので、
      // この操作を追加して、発火するようにする
      // ブラウザが、直前のファイル情報を持っており、そこで判断している模様
      e.target.value = '';
    };

    const fileObject: File = e.target.files[0];
    img.src = URL.createObjectURL(fileObject);
  };

  const onImageClear = () => {
    setIsUploaded(false);
    setImage({ src: '', width: 0, height: 0 });
  };

  return (
    <div className="home">
      Home <br />
      <Canvas
        sketch={isUploaded ? Lumos.sketch(imageProps) : NoImage.sketch()}
      />
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
