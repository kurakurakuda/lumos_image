import p5 from 'p5';
import Sketch from './Sketch';

class NoImage extends Sketch {
  static sketch() {
    return (p: p5) => {
      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.setup = () => {
        super.setup(p);
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.draw = () => {
        p.background(222);
        p.text('イメージをアップロードしてください', 512 / 2, 512 / 2);
      };
    };
  }
}

export default NoImage;
