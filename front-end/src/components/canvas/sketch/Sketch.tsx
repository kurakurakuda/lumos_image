import p5 from 'p5';

class Sketch {
  static setup(p: p5) {
    p.createCanvas(512, 512).parent('canvas');
  }
}

export default Sketch;
