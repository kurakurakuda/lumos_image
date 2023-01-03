import p5 from 'p5';

class Sketch {
  static setup(p: p5, w?: number, h?: number) {
    p.createCanvas(w ?? 512, h ?? 512)
      .parent('canvas')
      .id('sketch');
  }

  static getBase64String = (): string => {
    const canvas = document.getElementById('sketch') as HTMLCanvasElement;
    return canvas.toDataURL().split(',')[1];
  };
}

export default Sketch;
