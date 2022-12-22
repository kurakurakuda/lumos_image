import React, { useState } from 'react';
import '../css/home.css';
import Canvas from './canvas/Canvas';
import Lumos from './canvas/sketch/Lumos';
import NoImage from './canvas/sketch/NoImage';

const Home = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className="home">
      Home <br />
      <Canvas sketch={isUploaded ? Lumos.sketch() : NoImage.sketch()} />
      <div className="btn-area">
        <div>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => setIsUploaded(false)}
          >
            クリア
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn upload-btn"
            onClick={() => setIsUploaded(true)}
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
