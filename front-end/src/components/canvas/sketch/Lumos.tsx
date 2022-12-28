import LumosProps from 'dto/LumosProps';
import p5, { Element, Image } from 'p5';
import Sketch from './Sketch';

class Lumos extends Sketch {
  static sketch(prop: LumosProps) {
    let ele: Element;
    let img: Image;
    let isLumos = false;
    let lumosPixels: number[] = [];

    return (p: p5) => {
      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.preload = () => {
        ele = p.createImg(prop.src, '').hide();
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.setup = () => {
        super.setup(p, prop.width, prop.height);
        p.pixelDensity(1);
        p.frameRate(200);
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.draw = () => {
        p.image(ele, 0, 0);
        img = p.get();
        // Only need to load the pixels[] array once, because we're only
        // manipulating pixels[] inside draw(), not drawing shapes.
        p.loadPixels();
        // We must also call loadPixels() on the PImage since we are going to read its pixels.
        img.loadPixels();
        for (let x = 0; x < img.width; x += 1) {
          for (let y = 0; y < img.height; y += 1) {
            // Calculate the 1D location from a 2D grid
            const loc = (x + y * img.width) * 4;
            // Get the R,G,B values from image
            let r: number;
            let g: number;
            let b: number;
            if (isLumos) {
              r = img.pixels[loc];
              g = img.pixels[loc + 1];
              b = img.pixels[loc + 2];
              // Calculate an amount to change brightness based on proximity to the mouse
              // The closer the pixel is to the mouse, the lower the value of "distance"
              const maxdist = 100;
              const d = p.dist(x, y, p.mouseX, p.mouseY);
              const adjustbrightness = (255 * (maxdist - d)) / maxdist;
              r += adjustbrightness;
              g += adjustbrightness;
              b += adjustbrightness;
              // Constrain RGB to make sure they are within 0-255 color range
              r = p.constrain(r, 0, 255);
              g = p.constrain(g, 0, 255);
              b = p.constrain(b, 0, 255);
            } else {
              r = lumosPixels[loc];
              g = lumosPixels[loc + 1];
              b = lumosPixels[loc + 2];
            }

            // Make a new color and set pixel in the window
            p.set(x, y, [r, g, b, 255]);
          }
        }
        lumosPixels = p.pixels;
        p.updatePixels();
      };

      // Since this is specific to p5 module,
      // eslint-disable-next-line no-param-reassign
      p.mouseClicked = () => {
        isLumos = !isLumos;
      };
    };
  }
}

export default Lumos;
