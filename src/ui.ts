import './figma-plugin-ds.min.js';
import './figma-plugin-ds.min.css';
import './ui.css';


let DITHER_WORKER;
let imageBytes;
let isFirstEnter: boolean = false;

function postJob(type: string) {
  const options = {
    greyscale_method: getValue('greyscale_method'),
    dither_method: getValue('dither_method'),
    threshold: parseInt(getValue('threshold')),
    chk_replace_colours: (document.getElementById('chk_replace_colours') as HTMLInputElement).checked,
    rep_black: [parseInt(getValue('rep_black_r')), parseInt(getValue('rep_black_b')), parseInt(getValue('rep_black_g')), parseInt(getValue('rep_black_a'))],
    rep_white: [parseInt(getValue('rep_white_r')), parseInt(getValue('rep_white_b')), parseInt(getValue('rep_white_g')), parseInt(getValue('rep_white_a'))],
    keep_image: (document.getElementById('keep_image') as HTMLInputElement).checked
  }

  if (type == 'dither-image-preview') {
    processPreview(options);
  } else {
    parent.postMessage({ pluginMessage: { type: type, options: options } }, '*');
  }
}

document.getElementById('dither').onclick = () => {
  postJob('dither-image');
}

function getValue(selector) {
  return (document.getElementById(selector) as HTMLInputElement).value;
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}

//initialize javascript
(window as any).selectMenu.init();

//settings
(window as any).selectMenu.init({
  position: 'positionToSelection' //other options: 'under', 'overlap'
});



// When user change dithering method to Treshold, then enable the treshhold input box ...
document.getElementById('dither_method').onchange = function () {
  const treshInputElem = document.getElementById('threshold');
  // seems like a glitch with figma component library used slow  down value update. 
  // lets append to task queue. This hack fix the bug.
  setTimeout(() => {
    const value = (document.getElementById('dither_method') as HTMLInputElement).value;

    if (value == "Threshold") {
      treshInputElem.removeAttribute('disabled');
    } else {
      treshInputElem.setAttribute('disabled', (true as any));
    }
    postJob('dither-image-preview');
  }, 0);
};


// Activate color input boxes when user enables replace with color..
document.getElementById('chk_replace_colours').onchange = function (e) {
  const value = (document.getElementById('chk_replace_colours') as HTMLInputElement).checked;
  const colorInputs = document.getElementsByClassName('ci');
  for (let i = 0; i < colorInputs.length; i++) {
    if (value) {
      (colorInputs[i] as HTMLInputElement).removeAttribute('disabled');
    } else {
      (colorInputs[i] as HTMLInputElement).setAttribute('disabled', (true as any));
    }
  }
  postJob('dither-image-preview');
}

// on greyscale method change send preview job
document.getElementById('greyscale_method').onchange = function () {
  setTimeout(() => {
    postJob('dither-image-preview');
  }, 0);
}


// on threshold change
document.getElementById('threshold').onkeyup = function () {
  postJob('dither-image-preview');
};

const inputSelectorList = ['rep_black_r', 'rep_black_g', 'rep_black_b', 'rep_black_a', 'rep_white_r', 'rep_white_g', 'rep_white_b', 'rep_white_a'];
inputSelectorList.forEach(selector => {
  document.getElementById(selector).onkeyup = function () {
    postJob('dither-image-preview');
  }
});


window.onmessage = (msg) => {

  if (msg.data.pluginMessage.type == 'preview-node-image-bytes') {
    console.log(msg.data.pluginMessage.imageBytes)
    imageBytes = msg.data.pluginMessage.imageBytes;


    // first run on ui show...
  postJob('dither-image-preview');
  }
}


document.onmouseleave = () => {
  parent.postMessage({ pluginMessage: { type: 'destory-preview'} }, '*');
}


document.onmouseenter = () => {
  if(!isFirstEnter) {
    isFirstEnter = true;
    return;
  }
  parent.postMessage({ pluginMessage: { type: 'show-preview'} }, '*');
}









/////////////////////////////////////////////////////// PREVIEW WORKER SETUP
// Almost the same setup as the final jobs worker, you should check the comments out..
const workerScript = `
// Convert image data to greyscale based on luminance.
function greyscale_luminance(image) {
  for (var i = 0; i <= image.data.length; i += 4) {
      image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(
          image.data[i] * 0.21 +
          image.data[i + 1] * 0.71 +
          image.data[i + 2] * 0.07,
          10
      );
  }
  return image;
}

// Convert image data to greyscale based on average of R, G and B values.
function greyscale_average(image) {
  for (var i = 0; i <= image.data.length; i += 4) {
      image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(
          (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3,
          10
      );
  }
  return image;
}

// Apply Atkinson Dither to Image Data
function dither_atkinson(image, imageWidth, drawColour) {
  skipPixels = 4;

  if (!drawColour) drawColour = false;

  if (drawColour == true) skipPixels = 1;

  imageLength = image.data.length;

  for (
      currentPixel = 0;
      currentPixel <= imageLength;
      currentPixel += skipPixels
  ) {
      if (image.data[currentPixel] <= 128) {
          newPixelColour = 0;
      } else {
          newPixelColour = 255;
      }

      err = parseInt((image.data[currentPixel] - newPixelColour) / 8, 10);
      image.data[currentPixel] = newPixelColour;

      image.data[currentPixel + 4] += err;
      image.data[currentPixel + 8] += err;
      image.data[currentPixel + 4 * imageWidth - 4] += err;
      image.data[currentPixel + 4 * imageWidth] += err;
      image.data[currentPixel + 4 * imageWidth + 4] += err;
      image.data[currentPixel + 8 * imageWidth] += err;

      if (drawColour == false)
          image.data[currentPixel + 1] = image.data[currentPixel + 2] =
              image.data[currentPixel];
  }

  return image.data;
}

function dither_threshold(image, threshold_value) {
  for (var i = 0; i <= image.data.length; i += 4) {
      image.data[i] = image.data[i] > threshold_value ? 255 : 0;
      image.data[i + 1] = image.data[i + 1] > threshold_value ? 255 : 0;
      image.data[i + 2] = image.data[i + 2] > threshold_value ? 255 : 0;
  }
}

function replace_colours(image, black, white) {
  for (var i = 0; i <= image.data.length; i += 4) {
      image.data[i] = image.data[i] < 127 ? black.r : white.r;
      image.data[i + 1] = image.data[i + 1] < 127 ? black.g : white.g;
      image.data[i + 2] = image.data[i + 2] < 127 ? black.b : white.b;
      image.data[i + 3] =
          (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3 < 127
              ? black.a
              : white.a;
  }
}

function dither(data) {
  if (data.processing.greyscaleMethod == "Luminance") {
      greyscale_luminance(data.image.data);
  } else if (data.processing.greyscaleMethod == "RGB Average") {
      greyscale_average(data.image.data);
  }

  if (data.processing.ditherMethod == "Atkinson Dithering") {
      dither_atkinson(
          data.image.data,
          data.image.width,
          data.processing.greyscaleMethod == "Disabled"
      );
  } else if (data.processing.ditherMethod == "Threshold") {
      dither_threshold(data.image.data, data.processing.ditherThreshold);
  }

  if (data.processing.replaceColours == true) {
      replace_colours(
          data.image.data,
          data.processing.replaceColourMap.black,
          data.processing.replaceColourMap.white
      );
  }
  return data;
}

self.addEventListener("message", function (e) { self.postMessage(dither(e.data)); }, false);
`;

function loadWebWorker(script) {
  return new Worker(URL.createObjectURL(new Blob([script])));
}

async function encode(canvas, ctx, imageData) {
  ctx.putImageData(imageData, 0, 0)
  return await new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      const reader = new FileReader()
      reader.onload = () => resolve(new Uint8Array((reader as any).result))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob)
    })
  })
}

async function decode(canvas, ctx, bytes) {
  const url = URL.createObjectURL(new Blob([bytes]))
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
  canvas.width = (image as any).width
  canvas.height = (image as any).height
  ctx.drawImage(image, 0, 0)
  const imageData = ctx.getImageData(0, 0, (image as any).width, (image as any).height)
  return {
    imageData: imageData,
    width: (image as any).width,
    height: (image as any).width
  }
}

// start preview webworker...
DITHER_WORKER = loadWebWorker(workerScript);

function processPreview(config) {
  console.log('do the do');
  processDither({ imageBytes: imageBytes }, config).then(processedPreviewImageBytes => {
    // send process preview image to bg..
    parent.postMessage({ pluginMessage: { type: 'processed-preview-imagebytes', imageBytes: processedPreviewImageBytes } }, '*');
  });
}

async function processDither(job, options) {
  const bytes = job.imageBytes;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const imageDetails = await decode(canvas, ctx, bytes);
  // console.log(imageDetails);
  const preset = {
    image: {
      data: imageDetails.imageData,
      width: imageDetails.width,
      height: imageDetails.height
    },
    processing: {
      greyscaleMethod: options.greyscale_method,
      ditherMethod: options.dither_method,
      ditherThreshold: options.threshold,
      replaceColours: options.chk_replace_colours,
      replaceColourMap: {
        black: {
          r: options.rep_black[0],
          g: options.rep_black[1],
          b: options.rep_black[2],
          a: options.rep_black[3]
        },
        white: {
          r: options.rep_white[0],
          g: options.rep_white[1],
          b: options.rep_white[2],
          a: options.rep_white[3]
        }
      }
    }
  };

  // Start timer to track the time that is spent on this current job ...
  if (window.console && window.console.time) {
    console.log("Starting Preview Web Worker for image (" + imageDetails.width + "x" + imageDetails.height +
      ", Greyscale Method: " + options.greyscale_method + ", Dither Method: " + options.dither_method + ")");
    console.time("Preview Web worker took");
  }

  // Send job to webworker
  DITHER_WORKER.postMessage(preset);

  // NOTICE: Here to avoid memory leaks, we are using a one time event listner..
  // therefore each job applies an event listner to the worker and once the workers=
  // sends the result back, we dispose/unregister the event listner...

  const workerResult = new Promise(function (resolve, reject) {
    // Get reply from webworker
    const oneTimeListen = function (e) {
      // console.log('result', e);
      if (window.console && window.console.time) {
        console.timeEnd("Preview Web worker took");
      }
      const result = e.data;
      encode(canvas, ctx, result.image.data).then(newBytes => {

        // make it a one time event listner...
        DITHER_WORKER.removeEventListener('message', oneTimeListen);
        resolve(newBytes);
      });
    };

    DITHER_WORKER.addEventListener('message', oneTimeListen, false);
  });

  return workerResult;
}


