import p5 from 'p5';
import Sketch from './Sketch';

class Lumos extends Sketch {
  static sketch() {
    return (p: p5) => {
      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.setup = () => {
        super.setup(p);
        p.pixelDensity(1);
        p.frameRate(30);
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.draw = () => {
        p.ellipse(50, 50, 80, 80);
      };
    };
  }
}

export default Lumos;
