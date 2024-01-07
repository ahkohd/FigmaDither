<img src="./fd.png" height="80" style="display: table; margin: 0 auto;"/>

[![Actions Status](https://github.com/ahkohd/FigmaDither/workflows/check-production-build/badge.svg)](https://github.com/ahkohd/FigmaDither/workflows/check-production-build/badge.svg)

Add dithering effects to your images right there in Figma

## Features

- Live preview
- Easy to use UI
- Grayscale image processing support
- Uses WebWorker for fast image processing
- Multiple dithering at once with multiple item selection
- Dither or process each channel (R, G and B) separately, producing interesting effects
- Fine-tune your image dithering with color replacement options
- Easy toggle between the original or dithered image, or keeping both

### Demo

![Dithered Image 🔥](./dither-shot.png)

![Dither in Action](./demo-naruto.gif)

![Yet another demo!](./demo.gif)

## Development

First clone this repository.

```bash
$ git clone https://github.com/aaroniker/FigmaDither.git
$ cd FigmaDither
```

Install dependencies & build files to start local development.

```bash
$ pnpm install
$ pnpm dev
```

## Resources

Stuffs I found really helpful when developing `FigmaDither` are as follows:

- [Coding Challenge #90: Floyd-Steinberg Dithering](https://www.youtube.com/watch?v=0L2n8Tg2FwI)
- [Canvas-dither by @ticky](https://github.com/ticky/canvas-dither)
- [Wikipedia](https://en.wikipedia.org/wiki/Dither)
- [Figma Plugin Docs](https://www.figma.com/plugin-docs/intro/)

## LICENSE

[MIT](./LICENSE.md)

## ☕️ Donate

<a href="https://www.buymeacoffee.com/jwlE0N8" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
