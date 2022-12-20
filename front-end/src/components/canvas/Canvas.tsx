import React, { useEffect, useRef } from "react";
import p5 from "p5";

interface Props {
  isUploaded: boolean;
}

const Canvas = (props: Props) => {
  const containerRef = useRef();

  const sketch = (p: p5): any => {
    p.setup = () => {
      p.noCanvas();
      p.createCanvas(512, 512);
      p.pixelDensity(1);
      p.frameRate(30);
    };

    p.draw = () => {
      if (props.isUploaded) {
        p.ellipse(50, 50, 80, 80);
      } else {
        p.background(222);
        p.text("イメージをアップロードしてください", 512 / 2, 512 / 2);
      }
    };
  };

  useEffect(() => {
    const p5Instance = new p5(sketch, containerRef.current);
    return () => p5Instance.remove();
  });
  return <div id="'canvas" ref={React.createRef()} />;
};

export default Canvas;
