import LumosProps from 'dto/LumosProps';
import React, { useState } from 'react';
import '../css/home.css';

const ImageList = () => {
  const [imageProps, setImage] = useState<LumosProps | undefined>(undefined);

  return (
    <div className="home">
      ImageList <br />
    </div>
  );
};

export default ImageList;
