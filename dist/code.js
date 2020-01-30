!function(e){var n={};function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(i,a,function(n){return e[n]}.bind(null,a));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=8)}({8:function(e,n,t){"use strict";t.r(n);class i{constructor(){this._store=[]}enqueue(e){this._store.push(e)}dequeue(){return this._store.shift()}toArray(){return this._store}}var a=function(e,n,t,i){return new(t||(t=Promise))((function(a,r){function o(e){try{l(i.next(e))}catch(e){r(e)}}function s(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,s)}l((i=i.apply(e,n||[])).next())}))};function r(e){const n=e.filter(e=>{if("fills"in e){for(const n of e.fills)if("IMAGE"==n.type)return!0;return!1}return!1});return 0==n.length?[]:n}function o(e){const n=[];let t=e.fills;var i;return null!=(i=t)&&"function"==typeof i[Symbol.iterator]&&(t=t,t.forEach((t,i)=>{"IMAGE"==t.type&&n.push({imageFill:t,index:i,node:e})})),n}function s(e){return a(this,void 0,void 0,(function*(){const n=figma.getImageByHash(e.imageHash);return yield n.getBytesAsync()}))}function l(e,n){return new Promise((t,r)=>{let l=new i,d=[];e.forEach((function(i,r){return a(this,void 0,void 0,(function*(){const a=o(i);for(const e of a){const n=yield s(e.imageFill);d.push(e),g={imageBytes:n,fillData:e},l.enqueue(g)}var g;r==e.length-1&&c(yield function(e,n){const t=e.toArray();return figma.showUI('<style>\n  body,\n  html {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n  }\n\n  body {\n    display: flex;\n  }\n\n  * {\n    user-select: none;\n  }\n\n  .loaderContainer {\n    margin: auto;\n    text-align: center;\n    height: 55px;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .lds-ring {\n    display: inline-block;\n    position: relative;\n    width: 64px;\n    height: 64px;\n    transform: scale(.5);\n    justify-content: center;\n    align-items: center;\n  }\n\n  .loading-text {\n    font-family: sans-serif;\n    font-size: 11px;\n    text-align: center;\n    color: #555;\n  }\n\n  .lds-ring div {\n    box-sizing: border-box;\n    display: block;\n    position: absolute;\n    width: 51px;\n    height: 51px;\n    border: 6px solid #00aced;\n    border-radius: 50%;\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n    border-color: #00aced transparent transparent transparent;\n  }\n\n  .lds-ring div:nth-child(1) {\n    animation-delay: -0.45s;\n  }\n\n  .lds-ring div:nth-child(2) {\n    animation-delay: -0.3s;\n  }\n\n  .lds-ring div:nth-child(3) {\n    animation-delay: -0.15s;\n  }\n\n  @keyframes lds-ring {\n    0% {\n      transform: rotate(0deg);\n    }\n\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n</style>\n\n\n\n<div class="loaderContainer">\n  <div class="lds-ring">\n    <div></div>\n    <div></div>\n    <div></div>\n    <div></div>\n  </div>\n  <div class="loading-text">\n    dithering..\n  </div>\n</div>\n\n<script>\n  //////////////////////////////////////////////// WEB WORKER script in string...\n\n  // The code contained in this string is the actual logics to manipulate  canvas image\n  // and carry out the dithering effect..\n\n  const workerScript = `\n  // Convert image data to greyscale based on luminance.\nfunction greyscale_luminance(image) {\n    for (var i = 0; i <= image.data.length; i += 4) {\n        image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(\n            image.data[i] * 0.21 +\n            image.data[i + 1] * 0.71 +\n            image.data[i + 2] * 0.07,\n            10\n        );\n    }\n    return image;\n}\n\n// Convert image data to greyscale based on average of R, G and B values.\nfunction greyscale_average(image) {\n    for (var i = 0; i <= image.data.length; i += 4) {\n        image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(\n            (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3,\n            10\n        );\n    }\n    return image;\n}\n\n// Apply Atkinson Dither to Image Data\nfunction dither_atkinson(image, imageWidth, drawColour) {\n    skipPixels = 4;\n\n    if (!drawColour) drawColour = false;\n\n    if (drawColour == true) skipPixels = 1;\n\n    imageLength = image.data.length;\n\n    for (\n        currentPixel = 0;\n        currentPixel <= imageLength;\n        currentPixel += skipPixels\n    ) {\n        if (image.data[currentPixel] <= 128) {\n            newPixelColour = 0;\n        } else {\n            newPixelColour = 255;\n        }\n\n        err = parseInt((image.data[currentPixel] - newPixelColour) / 8, 10);\n        image.data[currentPixel] = newPixelColour;\n\n        image.data[currentPixel + 4] += err;\n        image.data[currentPixel + 8] += err;\n        image.data[currentPixel + 4 * imageWidth - 4] += err;\n        image.data[currentPixel + 4 * imageWidth] += err;\n        image.data[currentPixel + 4 * imageWidth + 4] += err;\n        image.data[currentPixel + 8 * imageWidth] += err;\n\n        if (drawColour == false)\n            image.data[currentPixel + 1] = image.data[currentPixel + 2] =\n                image.data[currentPixel];\n    }\n\n    return image.data;\n}\n\nfunction dither_threshold(image, threshold_value) {\n    for (var i = 0; i <= image.data.length; i += 4) {\n        image.data[i] = image.data[i] > threshold_value ? 255 : 0;\n        image.data[i + 1] = image.data[i + 1] > threshold_value ? 255 : 0;\n        image.data[i + 2] = image.data[i + 2] > threshold_value ? 255 : 0;\n    }\n}\n\nfunction replace_colours(image, black, white) {\n    for (var i = 0; i <= image.data.length; i += 4) {\n        image.data[i] = image.data[i] < 127 ? black.r : white.r;\n        image.data[i + 1] = image.data[i + 1] < 127 ? black.g : white.g;\n        image.data[i + 2] = image.data[i + 2] < 127 ? black.b : white.b;\n        image.data[i + 3] =\n            (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3 < 127\n                ? black.a\n                : white.a;\n    }\n}\n\nfunction dither(data) {\n    if (data.processing.greyscaleMethod == "Luminance") {\n        greyscale_luminance(data.image.data);\n    } else if (data.processing.greyscaleMethod == "RGB Average") {\n        greyscale_average(data.image.data);\n    }\n\n    if (data.processing.ditherMethod == "Atkinson Dithering") {\n        dither_atkinson(\n            data.image.data,\n            data.image.width,\n            data.processing.greyscaleMethod == "Disabled"\n        );\n    } else if (data.processing.ditherMethod == "Threshold") {\n        dither_threshold(data.image.data, data.processing.ditherThreshold);\n    }\n\n    if (data.processing.replaceColours == true) {\n        replace_colours(\n            data.image.data,\n            data.processing.replaceColourMap.black,\n            data.processing.replaceColourMap.white\n        );\n    }\n    return data;\n}\n\nself.addEventListener("message", function (e) { self.postMessage(dither(e.data)); }, false);\n  `;\n\n  // Since we cannot load external script but webworker needs a URL\n  // convert the code than is meant to run in the webworker to\n  // URL BLOB and pass it into the webworker.\n  // Neat trick:\n\n  function loadWebWorker(script) {\n    console.log("WORKER LOADED.");\n    return new Worker(URL.createObjectURL(new Blob([script])));\n  }\n\n\n\n  ///////////////////////////////////////////////////// LOGICS for job processing\n  ///// Entry point to dithering of the provided image jobs ...\n\n\n  // Encoding an image is also done by sticking pixels in an\n  // HTML canvas and by asking the canvas to serialize it into\n  // an actual PNG file via canvas.toBlob().\n  async function encode(canvas, ctx, imageData) {\n    ctx.putImageData(imageData, 0, 0)\n    return await new Promise((resolve, reject) => {\n      canvas.toBlob(blob => {\n        const reader = new FileReader()\n        reader.onload = () => resolve(new Uint8Array(reader.result))\n        reader.onerror = () => reject(new Error(\'Could not read from blob\'))\n        reader.readAsArrayBuffer(blob)\n      })\n    })\n  }\n\n  // Decoding an image can be done by sticking it in an HTML\n  // canvas, as we can read individual pixels off the canvas.\n  async function decode(canvas, ctx, bytes) {\n    const url = URL.createObjectURL(new Blob([bytes]))\n    const image = await new Promise((resolve, reject) => {\n      const img = new Image()\n      img.onload = () => resolve(img)\n      img.onerror = () => reject()\n      img.src = url\n    })\n    canvas.width = image.width\n    canvas.height = image.height\n    ctx.drawImage(image, 0, 0)\n    const imageData = ctx.getImageData(0, 0, image.width, image.height)\n    return {\n      imageData: imageData,\n      width: image.width,\n      height: image.width\n    }\n  }\n\n\n  /////////////////////// 1. Spin on our maginficient webworker ...\n  window.DITHER_WORKER = loadWebWorker(workerScript);\n\n\n  /////// 2. Chill, till the user sends a job....\n  // Create an event handler to receive messages from the main\n  // thread.\n  window.onmessage = async event => {\n    // Just get the bytes directly from the pluginMessage since\n    // that\'s the only type of message we\'ll receive in this\n    // plugin. In more complex plugins, you\'ll want to check the\n    // type of the message.\n\n    // contain the processed (dithered) imagebytes...\n    const results = [];\n\n    //  => Take a look at the sent data.\n    const recvedData = event.data.pluginMessage;\n\n    // Extract the jobs..\n    const jobs = recvedData.jobs;\n\n    // We process the job one after the other...\n    for (const job of jobs) {\n\n      // yeah we need to reslove two promises before we proceed to the next job\n      results.push({\n        imageBytes: await (await processDither(job, recvedData.options)),\n        fillData: job.fillData\n      });\n    }\n\n    // Since we are completely done with our jobs, kill the Webworker...\n    window.DITHER_WORKER.terminate();\n\n    // Send the result back to the User..\n    window.parent.postMessage({\n      pluginMessage: results\n    }, "*");\n  };\n\n\n  //////////// 3. This method sends a job request to the web worker and wait till something happens..\n\n  async function processDither(job, options) {\n    const bytes = job.imageBytes;\n\n    const canvas = document.createElement("canvas");\n    const ctx = canvas.getContext("2d");\n\n    const imageDetails = await decode(canvas, ctx, bytes);\n    // console.log(imageDetails);\n    const preset = {\n      image: {\n        data: imageDetails.imageData,\n        width: imageDetails.width,\n        height: imageDetails.height\n      },\n      processing: {\n        greyscaleMethod: options.greyscale_method,\n        ditherMethod: options.dither_method,\n        ditherThreshold: options.threshold,\n        replaceColours: options.chk_replace_colours,\n        replaceColourMap: {\n          black: {\n            r: options.rep_black[0],\n            g: options.rep_black[1],\n            b: options.rep_black[2],\n            a: options.rep_black[3]\n          },\n          white: {\n            r: options.rep_white[0],\n            g: options.rep_white[1],\n            b: options.rep_white[2],\n            a: options.rep_white[3]\n          }\n        }\n      }\n    };\n\n    // Start timer to track the time that is spent on this current job ...\n    if (window.console && window.console.time) {\n      console.log("Starting Web Worker for image (" + imageDetails.width + "x" + imageDetails.height +\n        ", Greyscale Method: " + options.greyscale_method + ", Dither Method: " + options.dither_method + ")");\n      console.time("Web worker took");\n    }\n\n    // Send job to webworker\n    window.DITHER_WORKER.postMessage(preset);\n\n    // NOTICE: Here to avoid memory leaks, we are using a one time event listner..\n    // therefore each job applies an event listner to the worker and once the workers=\n    // sends the result back, we dispose/unregister the event listner...\n\n    const workerResult = new Promise(function (resolve, reject) {\n      // Get reply from webworker\n      const oneTimeListen = function (e) {\n        // console.log(\'result\', e);\n        if (window.console && window.console.time) {\n          console.timeEnd("Web worker took");\n        }\n        const result = e.data;\n        encode(canvas, ctx, result.image.data).then(newBytes => {\n\n          // make it a one time event listner...\n          window.DITHER_WORKER.removeEventListener(\'message\', oneTimeListen);\n          resolve(newBytes);\n        });\n      };\n\n      window.DITHER_WORKER.addEventListener(\'message\', oneTimeListen, false);\n    });\n\n    return workerResult;\n  }\n<\/script>',{visible:!0,width:200,height:125}),figma.ui.postMessage({jobs:t,options:n}),new Promise((e,n)=>{figma.ui.onmessage=n=>e(n)})}(l,n),d,n.keep_image,t)}))}))})}function c(e,n,t=!1,i){e.forEach((e,i)=>{let a=function(e,n){const t=JSON.parse(JSON.stringify(n));return t.imageHash=figma.createImage(e).hash,t}(e.imageBytes,e.fillData.imageFill);const r=[...n[i].node.fills];t?r.push(a):r.splice(e.fillData.index,1,a),n[i].node.fills=r}),i()}function d(e){e&&e.remove(),figma.closePlugin()}let g,m=[];function h(e){g=o(e)[0],s(g.imageFill).then(e=>{figma.ui.postMessage({imageBytes:e,type:"preview-node-image-bytes"})})}function u(){return m[m.length-1]}function f(e){const n=r(figma.currentPage.selection);0!=n.length?n.length>1?figma.notify("Figma Dither: More than one selection disables live preview.",{timeout:1e3}):(m.push(figma.currentPage.selection[0].clone()),e&&e()):figma.notify("Figma Dither: Please select at lease one item with image fill.",{timeout:1e3})}if(0==r(figma.currentPage.selection).length)figma.notify("Figma Dither: Please select at lease one item with image fill."),figma.closePlugin();else{const e=1!=figma.currentPage.selection.length;e?figma.notify("Figma Dither: More than one selection disables live preview."):f(),figma.showUI(__html__,{height:500,width:270}),e||h(u()),figma.ui.onmessage=e=>{if("dither-image"===e.type){const n=r(figma.currentPage.selection);0==n.length?figma.notify("😅 Please select item(s) with image fill"):l(n,e.options).then((function(){d(u())}))}if("cancel"===e.type&&d(u()),"processed-preview-imagebytes"==e.type){const n={fillData:g,imageBytes:e.imageBytes};try{c([n],[g],!1,()=>{})}catch(e){}}"destory-preview"!=e.type&&"disable-preview"!=e.type||(0!=m.length&&m.forEach(e=>{e.removed||e.remove()}),m=[]),"show-preview"!=e.type&&"enable-preview"!=e.type||f(()=>{figma.notify("Figma Dither: Re-rendering preview 🤳",{timeout:1e3}),h(u())})}}}});