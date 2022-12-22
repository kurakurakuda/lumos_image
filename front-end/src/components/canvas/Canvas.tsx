import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../../css/canvas/canvas.css';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sketch: (...args: any[]) => any;
}

const Canvas = ({ sketch }: Props) => {
  const containerRef = useRef();

  useEffect(() => {
    // Since this is specific to p5 module,
    // eslint-disable-next-line new-cap
    const p5Instance = new p5(sketch, containerRef.current);
    return () => p5Instance.remove();
  });
  return <div id="canvas" className="canvas" ref={React.createRef()} />;
};

export default Canvas;
