import p5 from 'p5';

class Sketch {
  private static readonly ID: string = 'sketch';

  static setup(p: p5, w?: number, h?: number) {
    p.createCanvas(w ?? 512, h ?? 512)
      .parent('canvas')
      .id(Sketch.ID);
  }

  static getBase64String = (): string => {
    const canvas = document.getElementById(Sketch.ID) as HTMLCanvasElement;
    return canvas.toDataURL().split(',')[1];
  };
}

export default Sketch;
