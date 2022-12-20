import React, { useState } from 'react';
import '../css/home.css';
import '../css/canvas.css';
import Canvas from './canvas/Canvas';

const Home = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <div className="home">
      Home <br />
      <div className="canvas">
        <Canvas isUploaded={isUploaded} />
      </div>
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
