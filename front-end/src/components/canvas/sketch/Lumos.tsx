import p5, { Element } from 'p5';
import Sketch from './Sketch';

interface Property {
  src: string;
  width?: number;
  height?: number;
}

class Lumos extends Sketch {
  static sketch(prop: Property) {
    let img: Element;

    return (p: p5) => {
      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.preload = () => {
        img = p.createImg(prop.src, '').hide();
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.setup = () => {
        super.setup(p, prop.width, prop.height);
        p.pixelDensity(1);
        p.frameRate(30);
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.draw = () => {
        p.image(img, 0, 0);
      };
    };
  }
}

export default Lumos;
