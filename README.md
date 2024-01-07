<img src="./fd.png" height="80" style="display: table; margin: 0 auto;"/>

[![Actions Status](https://github.com/ahkohd/FigmaDither/workflows/ProdBuild/badge.svg)](https://github.com/ahkohd/FigmaDither/workflows/ProdBuild/badge.svg)

A Figma plugin that helps you to easily add dithering effects to images right there in your scene. ✨🦄

# 💡 Features

- ⚡ Live preview as dither effects values are been changed.
- 😽 Easy to use UI to apply dithering effect.
- ✨ Grayscale image processing support.
- 🚀 Faster Image processing with the use of Web worker.
- 🙌 Multiple dithering at once with multiple item selection.
- 🎉 Provides two image dithering methods out of the box.
- 💥 Now able to dither/process each channel (R, G and B) separately, producing interesting effects.
- 🔥 Easily fine-tune your image dithering with color replacement options.
- 👀 Easily toggle between swapping old image with the new dithered image or keeping both.

# 🎥 Demo

![Dither in Action](./demo-naruto.gif)

[See another demo.](./demo.gif)

# 📸 Screenshots

The shot taken below is a fresh dithered image in a Figma scene. 🔥

![Dithered Image 🔥](./dither-shot.png)

# ☕️ Donate

<a href="https://www.buymeacoffee.com/jwlE0N8" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

# 💻 Development

First clone this repository.

```bash
$ git clone https://github.com/aaroniker/FigmaDither.git
$ cd FigmaDither
```

Install dependencies & build files to start local development.

```bash
$ npm install --save-dev css-loader html-webpack-inline-source-plugin html-webpack-plugin style-loader ts-loader typescript url-loader webpack webpack-cli raw-loader
$ npx webpack --mode=development --watch
```

# Resources

Stuffs I found really helpful when I was developing FigmaDither are as follows.

- [Coding Challenge #90: Floyd-Steinberg Dithering](https://www.youtube.com/watch?v=0L2n8Tg2FwI)
- [Canvas-dither by @ticky](https://github.com/ticky/canvas-dither)
- [Wikipedia](https://en.wikipedia.org/wiki/Dither)
- [Figma Plugin Docs](https://www.figma.com/plugin-docs/intro/)

# LICENSE

[MIT](./LICENSE.md)
