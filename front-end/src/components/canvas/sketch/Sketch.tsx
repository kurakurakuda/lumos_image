import p5 from 'p5';

class Sketch {
  static setup(p: p5, w?: number, h?: number) {
    p.createCanvas(w ?? 512, h ?? 512).parent('canvas');
  }
}

export default Sketch;
