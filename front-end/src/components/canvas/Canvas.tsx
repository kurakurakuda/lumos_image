import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../../css/canvas.css';

interface Props {
  isUploaded: boolean;
}

const Canvas = ({ isUploaded }: Props) => {
  const containerRef = useRef();

  // Since this is specific to p5 module,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sketch = (p: p5): any => {
    // Since this is specific to p5 module,
    // eslint-disable-next-line no-param-reassign
    p.setup = () => {
      p.createCanvas(512, 512).parent('canvas');
      p.pixelDensity(1);
      p.frameRate(30);
    };

    // Since this is specific to p5 module,
    // eslint-disable-next-line no-param-reassign
    p.draw = () => {
      if (isUploaded) {
        p.ellipse(50, 50, 80, 80);
      } else {
        p.background(222);
        p.text('イメージをアップロードしてください', 512 / 2, 512 / 2);
      }
    };
  };

  useEffect(() => {
    // Since this is specific to p5 module,
    // eslint-disable-next-line new-cap
    const p5Instance = new p5(sketch, containerRef.current);
    return () => p5Instance.remove();
  });
  return <div id="canvas" className="canvas" ref={React.createRef()} />;
};

export default Canvas;
