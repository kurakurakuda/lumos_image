import React, { useEffect } from "react";
import p5 from "p5";

interface Props {
  isUploaded: boolean;
}

const Canvas: React.FunctionComponent<Props> = (props: Props) => {
  const sketch = (p: p5): any => {
    p.setup = () => {
      p.noCanvas();
      p.createCanvas(512, 512);
      p.pixelDensity(1);
      p.frameRate(30);
      console.log("setup");
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
    // eslint-disable-next-line no-new, new-cap
    new p5(sketch);
  });
  return <div id="'canvas" ref={React.createRef()} />;
};

export default Canvas;
