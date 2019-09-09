/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.ts");

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 500, width: 270 });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    if (msg.type === "dither-image") {
        const currentSelections = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["filterNodesWithFills"])(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelections"])());
        Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["DoImageDither"])(currentSelections, msg.options)
            .then(function () {
            figma.closePlugin();
        });
    }
    if (msg.type === "cancel") {
        figma.closePlugin();
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
};


/***/ }),

/***/ "./src/lib/Queue.ts":
/*!**************************!*\
  !*** ./src/lib/Queue.ts ***!
  \**************************/
/*! exports provided: Queue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queue", function() { return Queue; });
class Queue {
    constructor() {
        this._store = [];
    }
    enqueue(val) {
        this._store.push(val);
    }
    dequeue() {
        return this._store.shift();
    }
    toArray() {
        return this._store;
    }
}


/***/ }),

/***/ "./src/lib/utils.ts":
/*!**************************!*\
  !*** ./src/lib/utils.ts ***!
  \**************************/
/*! exports provided: getCurrentSelections, filterNodesWithFills, getImageFillsFromNode, getImageBytes, addTaskToPool, processJobs, BytesToImagePaintHashImage, DoImageDither */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentSelections", function() { return getCurrentSelections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterNodesWithFills", function() { return filterNodesWithFills; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageFillsFromNode", function() { return getImageFillsFromNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageBytes", function() { return getImageBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTaskToPool", function() { return addTaskToPool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processJobs", function() { return processJobs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BytesToImagePaintHashImage", function() { return BytesToImagePaintHashImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoImageDither", function() { return DoImageDither; });
/* harmony import */ var _Queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Queue */ "./src/lib/Queue.ts");
/* harmony import */ var _worker_entry_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../worker/entry.html */ "./src/worker/entry.html");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Gets the current User Selection(s)
 * @returns readonly SceneNode[]
 */
function getCurrentSelections() {
    return figma.currentPage.selection;
}
/**
 * Filters nndes that have fills.
 * @param  {readonlySceneNode[]} nodes
 * @returns SceneNode
 */
function filterNodesWithFills(nodes) {
    const nodeWithFills = nodes.filter(node => "fills" in node);
    return nodeWithFills.length == 0 ? [] : nodeWithFills;
}
/**
 * Checks if a object is iteratable
 * @param obj
 */
function _isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === "function";
}
/**
 * Gets all Image fills from a node.
 * @param  {SceneNode} node Node to extract the image fills
 * @returns ImageFillData[] An array of image fills of the node as ImageFillData
 */
function getImageFillsFromNode(node) {
    const resultingImageFills = [];
    let fills = node.fills;
    if (_isIterable(fills)) {
        fills = fills;
        fills.forEach((fill, index) => {
            if (fill.type == "IMAGE")
                resultingImageFills.push({ imageFill: fill, index: index, node: node });
        });
    }
    return resultingImageFills;
}
/**
 * Gets the ImageBytes from a ImagePaint fill
 * @param  {ImagePaint} fill
 * @returns Promise<Uint8Array>
 */
function getImageBytes(fill) {
    return __awaiter(this, void 0, void 0, function* () {
        const image = figma.getImageByHash(fill.imageHash);
        const bytes = yield image.getBytesAsync();
        return bytes;
    });
}
/**
 * Adds a job to the task queue
 * @param  {any} task
 * @param  {Queue<any>} queue
 */
function addTaskToPool(task, queue) {
    queue.enqueue(task);
}
/**
 * Spawn a worker to process the tasks in the task queue
 * @param  {Queue<any>} queue Task queue
 * @returns Promise<JobResult[]> Returns an array of JobResult
 */
function processJobs(queue, options) {
    const jobs = queue.toArray();
    // console.log("All jobs", jobs);
    // Create an invisible iframe to act as a "worker" which
    // will do the task of decoding and send us a message
    // when it's done.
    figma.showUI(_worker_entry_html__WEBPACK_IMPORTED_MODULE_1__["default"], { visible: true, width: 200, height: 125 });
    // Send the raw bytes of the file to the worker.
    // console.log('sent!', options);
    figma.ui.postMessage({ jobs: jobs, options: options });
    // Wait for the worker's response.
    const jobsResult = new Promise((resolve, reject) => {
        figma.ui.onmessage = value => resolve(value);
    });
    return jobsResult;
}
/**
 * Converts ImageBytes to ImageHash and adds to ImagePaint
 * @param  {Uint8Array} bytes  Imagebytes to convert
 * @param  {ImagePaint} paint ImagePaint to add the converted ImageHash
 * @returns ImagePaint Returns a new ImagePaint with the converted ImageHash added to it
 */
function BytesToImagePaintHashImage(bytes, paint) {
    // Create a new paint for the new image.
    const newPaint = JSON.parse(JSON.stringify(paint));
    newPaint.imageHash = figma.createImage(bytes).hash;
    return newPaint;
}
/**
 * Carry out the image dithering proccesses.
 * @param  {readonlySceneNode[]} currentSelectionsWithImageFills
 */
function DoImageDither(currentSelectionsWithImageFills, options) {
    return new Promise((resolve, reject) => {
        let TASKS = new _Queue__WEBPACK_IMPORTED_MODULE_0__["Queue"]();
        let nodeFills = [];
        currentSelectionsWithImageFills.forEach(function (node, index) {
            return __awaiter(this, void 0, void 0, function* () {
                const nodesWithImageFills = getImageFillsFromNode(node);
                nodesWithImageFills.forEach(function (fillData) {
                    return __awaiter(this, void 0, void 0, function* () {
                        // carry out dither
                        const imageBytes = yield getImageBytes(fillData.imageFill);
                        nodeFills.push(fillData);
                        addTaskToPool({ imageBytes: imageBytes, fillData: fillData }, TASKS);
                    });
                });
                // wait till all jobs are added..
                if (index == currentSelectionsWithImageFills.length - 1) {
                    // start processing jobs..
                    applyProcessResults(yield processJobs(TASKS, options), nodeFills, resolve);
                }
            });
        });
    });
}
/**
 * Applies the processed dither effect to appropriate nodes
 * @param  {JobResult[]} results
 * @param  {ImageFillData[]} nodeFills
 * @param  {any} resolve
 */
function applyProcessResults(results, nodeFills, resolve) {
    // console.log(nodeFills);
    results.forEach((result, index) => {
        let processDitherEffect = BytesToImagePaintHashImage(result.imageBytes, result.fillData.imageFill);
        // clone the node fills
        const copyNodeFills = [...nodeFills[index].node.fills];
        // replace the image filter
        copyNodeFills.splice(result.fillData.index, 1, processDitherEffect);
        nodeFills[index].node.fills = copyNodeFills;
    });
    // resolve thre promise after applying dithering effect.
    resolve();
}


/***/ }),

/***/ "./src/worker/entry.html":
/*!*******************************!*\
  !*** ./src/worker/entry.html ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<style>\r\n  body,\r\n  html {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  body {\r\n    display: flex;\r\n  }\r\n\r\n  .loaderContainer {\r\n    margin: auto;\r\n    text-align: center;\r\n    height: 55px;\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n\r\n  .lds-ring {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 64px;\r\n    height: 64px;\r\n    transform: scale(.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n\r\n  .loading-text {\r\n    font-family: sans-serif;\r\n    font-size: 11px;\r\n    text-align: center;\r\n    color: #555;\r\n  }\r\n\r\n  .lds-ring div {\r\n    box-sizing: border-box;\r\n    display: block;\r\n    position: absolute;\r\n    width: 51px;\r\n    height: 51px;\r\n    border: 6px solid #00aced;\r\n    border-radius: 50%;\r\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n    border-color: #00aced transparent transparent transparent;\r\n  }\r\n\r\n  .lds-ring div:nth-child(1) {\r\n    animation-delay: -0.45s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(2) {\r\n    animation-delay: -0.3s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(3) {\r\n    animation-delay: -0.15s;\r\n  }\r\n\r\n  @keyframes lds-ring {\r\n    0% {\r\n      transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n</style>\r\n\r\n\r\n\r\n<div class=\"loaderContainer\">\r\n  <div class=\"lds-ring\">\r\n    <div></div>\r\n    <div></div>\r\n    <div></div>\r\n    <div></div>\r\n  </div>\r\n  <div class=\"loading-text\">\r\n    dithering..\r\n  </div>\r\n</div>\r\n<script>\r\n////////////////////////////////////////////////////////////\r\n///\r\n///   \r\n///\r\n///\r\n///\r\n///////////////////////////////////////////////////////////\r\n\r\n//////////////////////////////////////////////// WEB WORKER script in string...\r\n\r\n// The code contained in this string is the actual logics to manipulate  canvas image\r\n// and carry out the dithering effect..\r\n\r\nconst workerScript = `\r\n  // Convert image data to greyscale based on luminance.\r\nfunction greyscale_luminance(image) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(\r\n            image.data[i] * 0.21 +\r\n            image.data[i + 1] * 0.71 +\r\n            image.data[i + 2] * 0.07,\r\n            10\r\n        );\r\n    }\r\n    return image;\r\n}\r\n\r\n// Convert image data to greyscale based on average of R, G and B values.\r\nfunction greyscale_average(image) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(\r\n            (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3,\r\n            10\r\n        );\r\n    }\r\n    return image;\r\n}\r\n\r\n// Apply Atkinson Dither to Image Data\r\nfunction dither_atkinson(image, imageWidth, drawColour) {\r\n    skipPixels = 4;\r\n\r\n    if (!drawColour) drawColour = false;\r\n\r\n    if (drawColour == true) skipPixels = 1;\r\n\r\n    imageLength = image.data.length;\r\n\r\n    for (\r\n        currentPixel = 0;\r\n        currentPixel <= imageLength;\r\n        currentPixel += skipPixels\r\n    ) {\r\n        if (image.data[currentPixel] <= 128) {\r\n            newPixelColour = 0;\r\n        } else {\r\n            newPixelColour = 255;\r\n        }\r\n\r\n        err = parseInt((image.data[currentPixel] - newPixelColour) / 8, 10);\r\n        image.data[currentPixel] = newPixelColour;\r\n\r\n        image.data[currentPixel + 4] += err;\r\n        image.data[currentPixel + 8] += err;\r\n        image.data[currentPixel + 4 * imageWidth - 4] += err;\r\n        image.data[currentPixel + 4 * imageWidth] += err;\r\n        image.data[currentPixel + 4 * imageWidth + 4] += err;\r\n        image.data[currentPixel + 8 * imageWidth] += err;\r\n\r\n        if (drawColour == false)\r\n            image.data[currentPixel + 1] = image.data[currentPixel + 2] =\r\n                image.data[currentPixel];\r\n    }\r\n\r\n    return image.data;\r\n}\r\n\r\nfunction dither_threshold(image, threshold_value) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i] > threshold_value ? 255 : 0;\r\n        image.data[i + 1] = image.data[i + 1] > threshold_value ? 255 : 0;\r\n        image.data[i + 2] = image.data[i + 2] > threshold_value ? 255 : 0;\r\n    }\r\n}\r\n\r\nfunction replace_colours(image, black, white) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i] < 127 ? black.r : white.r;\r\n        image.data[i + 1] = image.data[i + 1] < 127 ? black.g : white.g;\r\n        image.data[i + 2] = image.data[i + 2] < 127 ? black.b : white.b;\r\n        image.data[i + 3] =\r\n            (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3 < 127\r\n                ? black.a\r\n                : white.a;\r\n    }\r\n}\r\n\r\nfunction dither(data) {\r\n    if (data.processing.greyscaleMethod == \"Luminance\") {\r\n        greyscale_luminance(data.image.data);\r\n    } else if (data.processing.greyscaleMethod == \"RGB Average\") {\r\n        greyscale_average(data.image.data);\r\n    }\r\n\r\n    if (data.processing.ditherMethod == \"Atkinson Dithering\") {\r\n        dither_atkinson(\r\n            data.image.data,\r\n            data.image.width,\r\n            data.processing.greyscaleMethod == \"Disabled\"\r\n        );\r\n    } else if (data.processing.ditherMethod == \"Threshold\") {\r\n        dither_threshold(data.image.data, data.processing.ditherThreshold);\r\n    }\r\n\r\n    if (data.processing.replaceColours == true) {\r\n        replace_colours(\r\n            data.image.data,\r\n            data.processing.replaceColourMap.black,\r\n            data.processing.replaceColourMap.white\r\n        );\r\n    }\r\n    return data;\r\n}\r\n\r\nself.addEventListener(\"message\", function (e) { self.postMessage(dither(e.data)); }, false);\r\n  `;\r\n\r\n  // Since we cannot load external script but webworker needs a URL\r\n  // convert the code than is meant to run in the webworker to\r\n  // URL BLOB and pass it into the webworker.\r\n  // Neat trick:\r\n\r\n  function loadWebWorker(script) {\r\n    return new Worker(URL.createObjectURL(new Blob([script])));\r\n  }\r\n\r\n\r\n\r\n  ///////////////////////////////////////////////////// LOGICS for job processing\r\n  ///// Entry point to dithering of the provided image jobs ...\r\n\r\n\r\n  // Encoding an image is also done by sticking pixels in an\r\n  // HTML canvas and by asking the canvas to serialize it into\r\n  // an actual PNG file via canvas.toBlob().\r\n  async function encode(canvas, ctx, imageData) {\r\n    ctx.putImageData(imageData, 0, 0)\r\n    return await new Promise((resolve, reject) => {\r\n      canvas.toBlob(blob => {\r\n        const reader = new FileReader()\r\n        reader.onload = () => resolve(new Uint8Array(reader.result))\r\n        reader.onerror = () => reject(new Error('Could not read from blob'))\r\n        reader.readAsArrayBuffer(blob)\r\n      })\r\n    })\r\n  }\r\n\r\n  // Decoding an image can be done by sticking it in an HTML\r\n  // canvas, as we can read individual pixels off the canvas.\r\n  async function decode(canvas, ctx, bytes) {\r\n    const url = URL.createObjectURL(new Blob([bytes]))\r\n    const image = await new Promise((resolve, reject) => {\r\n      const img = new Image()\r\n      img.onload = () => resolve(img)\r\n      img.onerror = () => reject()\r\n      img.src = url\r\n    })\r\n    canvas.width = image.width\r\n    canvas.height = image.height\r\n    ctx.drawImage(image, 0, 0)\r\n    const imageData = ctx.getImageData(0, 0, image.width, image.height)\r\n    return {\r\n      imageData: imageData,\r\n      width: image.width,\r\n      height: image.width\r\n    }\r\n  }\r\n\r\n\r\n  /////////////////////// 1. Spin on our maginficient webworker ...\r\n  window.DITHER_WORKER = loadWebWorker(workerScript);\r\n\r\n\r\n  /////// 2. Chill, till the user sends a job....\r\n  // Create an event handler to receive messages from the main\r\n  // thread.\r\n  window.onmessage = async event => {\r\n    // Just get the bytes directly from the pluginMessage since\r\n    // that's the only type of message we'll receive in this\r\n    // plugin. In more complex plugins, you'll want to check the\r\n    // type of the message.\r\n\r\n    // contain the processed (dithered) imagebytes...\r\n    const results = [];\r\n    \r\n    //  => Take a look at the sent data.\r\n    const recvedData = event.data.pluginMessage;\r\n\r\n    // Extract the jobs..\r\n    const jobs = recvedData.jobs;\r\n\r\n    // We process the job one after the other...\r\n    for (const job of jobs) {\r\n\r\n      // yeah we need to reslove two promises before we proceed to the next job\r\n      results.push({\r\n        imageBytes: await (await processDither(job, recvedData.options)),\r\n        fillData: job.fillData\r\n      });\r\n    }\r\n\r\n    // Since we are completely done with our jobs, kill the Webworker...\r\n    window.DITHER_WORKER.terminate();\r\n\r\n    // Send the result back to the User..\r\n    window.parent.postMessage({\r\n      pluginMessage: results\r\n    }, \"*\");\r\n  };\r\n\r\n\r\n  //////////// 3. This method sends a job request to the web worker and wait till something happens..\r\n\r\n  async function processDither(job, options) {\r\n    const bytes = job.imageBytes;\r\n\r\n    const canvas = document.createElement(\"canvas\");\r\n    const ctx = canvas.getContext(\"2d\");\r\n\r\n    const imageDetails = await decode(canvas, ctx, bytes);\r\n    // console.log(imageDetails);\r\n    const preset = {\r\n      image: {\r\n        data: imageDetails.imageData,\r\n        width: imageDetails.width,\r\n        height: imageDetails.height\r\n      },\r\n      processing: {\r\n        greyscaleMethod: options.greyscale_method,\r\n        ditherMethod: options.dither_method,\r\n        ditherThreshold: options.threshold,\r\n        replaceColours: options.chk_replace_colours,\r\n        replaceColourMap: {\r\n          black: {\r\n            r: options.rep_black[0],\r\n            g: options.rep_black[1],\r\n            b: options.rep_black[2],\r\n            a: options.rep_black[3]\r\n          },\r\n          white: {\r\n            r: options.rep_white[0],\r\n            g: options.rep_white[1],\r\n            b: options.rep_white[2],\r\n            a: options.rep_white[3]\r\n          }\r\n        }\r\n      }\r\n    };\r\n\r\n    // Start timer to track the time that is spent on this current job ...\r\n    if (window.console && window.console.time) {\r\n      console.log(\"Starting Web Worker for image (\" + imageDetails.width + \"x\" + imageDetails.height +\r\n        \", Greyscale Method: \" + options.greyscale_method + \", Dither Method: \" + options.dither_method + \")\");\r\n      console.time(\"Web worker took\");\r\n    }\r\n\r\n    // Send job to webworker\r\n    window.DITHER_WORKER.postMessage(preset);\r\n\r\n    // NOTICE: Here to avoid memory leaks, we are using a one time event listner..\r\n    // therefore each job applies an event listner to the worker and once the workers=\r\n    // sends the result back, we dispose/unregister the event listner...\r\n\r\n    const workerResult = new Promise(function (resolve, reject) {\r\n      // Get reply from webworker\r\n      const oneTimeListen = function (e) {\r\n        // console.log('result', e);\r\n        if (window.console && window.console.time) {\r\n          console.timeEnd(\"Web worker took\");\r\n        }\r\n        const result = e.data;\r\n        encode(canvas, ctx, result.image.data).then(newBytes => {\r\n\r\n          // make it a one time event listner...\r\n          window.DITHER_WORKER.removeEventListener('message', oneTimeListen);\r\n          resolve(newBytes);\r\n        });\r\n      };\r\n\r\n      window.DITHER_WORKER.addEventListener('message', oneTimeListen, false);\r\n    });\r\n\r\n    return workerResult;\r\n  }\r\n</script>");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVFQUFvQixDQUFDLHVFQUFvQjtBQUMzRSxRQUFRLGdFQUFhO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7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cUUseUlBQXlJLGdDQUFnQyxhQUFhLEVBQUUsWUFBWSxxRkFBcUYsU0FBUyxFQUFFLGdDQUFnQyxPQUFPLGMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJpbXBvcnQgeyBnZXRDdXJyZW50U2VsZWN0aW9ucywgZmlsdGVyTm9kZXNXaXRoRmlsbHMsIERvSW1hZ2VEaXRoZXIgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcclxuLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgbW9kYWwgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbnVtYmVyLCBhbmRcclxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgcmVjdGFuZ2xlcyBvbiB0aGUgc2NyZWVuLlxyXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXHJcbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxyXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxyXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXHJcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDI3MCB9KTtcclxuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXHJcbi8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxyXG4vLyBwb3N0ZWQgbWVzc2FnZS5cclxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkaXRoZXItaW1hZ2VcIikge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb25zID0gZmlsdGVyTm9kZXNXaXRoRmlsbHMoZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSk7XHJcbiAgICAgICAgRG9JbWFnZURpdGhlcihjdXJyZW50U2VsZWN0aW9ucywgbXNnLm9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJjYW5jZWxcIikge1xyXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlIHN1cmUgdG8gY2xvc2UgdGhlIHBsdWdpbiB3aGVuIHlvdSdyZSBkb25lLiBPdGhlcndpc2UgdGhlIHBsdWdpbiB3aWxsXHJcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIFF1ZXVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlID0gW107XHJcbiAgICB9XHJcbiAgICBlbnF1ZXVlKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlLnB1c2godmFsKTtcclxuICAgIH1cclxuICAgIGRlcXVldWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAnLi9RdWV1ZSc7XHJcbmltcG9ydCB3b3JrZXJUZW1wbGF0ZSBmcm9tICcuLi93b3JrZXIvZW50cnkuaHRtbCc7XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50IFVzZXIgU2VsZWN0aW9uKHMpXHJcbiAqIEByZXR1cm5zIHJlYWRvbmx5IFNjZW5lTm9kZVtdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG59XHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG5uZGVzIHRoYXQgaGF2ZSBmaWxscy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gbm9kZXNcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9kZXNXaXRoRmlsbHMobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGVXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiBcImZpbGxzXCIgaW4gbm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZVdpdGhGaWxscy5sZW5ndGggPT0gMCA/IFtdIDogbm9kZVdpdGhGaWxscztcclxufVxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIGl0ZXJhdGFibGVcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuZnVuY3Rpb24gX2lzSXRlcmFibGUob2JqKSB7XHJcbiAgICAvLyBjaGVja3MgZm9yIG51bGwgYW5kIHVuZGVmaW5lZFxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmpbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBJbWFnZSBmaWxscyBmcm9tIGEgbm9kZS5cclxuICogQHBhcmFtICB7U2NlbmVOb2RlfSBub2RlIE5vZGUgdG8gZXh0cmFjdCB0aGUgaW1hZ2UgZmlsbHNcclxuICogQHJldHVybnMgSW1hZ2VGaWxsRGF0YVtdIEFuIGFycmF5IG9mIGltYWdlIGZpbGxzIG9mIHRoZSBub2RlIGFzIEltYWdlRmlsbERhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgcmVzdWx0aW5nSW1hZ2VGaWxscyA9IFtdO1xyXG4gICAgbGV0IGZpbGxzID0gbm9kZS5maWxscztcclxuICAgIGlmIChfaXNJdGVyYWJsZShmaWxscykpIHtcclxuICAgICAgICBmaWxscyA9IGZpbGxzO1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nSW1hZ2VGaWxscy5wdXNoKHsgaW1hZ2VGaWxsOiBmaWxsLCBpbmRleDogaW5kZXgsIG5vZGU6IG5vZGUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0aW5nSW1hZ2VGaWxscztcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgSW1hZ2VCeXRlcyBmcm9tIGEgSW1hZ2VQYWludCBmaWxsXHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IGZpbGxcclxuICogQHJldHVybnMgUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlQnl0ZXMoZmlsbCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKGZpbGwuaW1hZ2VIYXNoKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQWRkcyBhIGpvYiB0byB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHthbnl9IHRhc2tcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrVG9Qb29sKHRhc2ssIHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5lbnF1ZXVlKHRhc2spO1xyXG59XHJcbi8qKlxyXG4gKiBTcGF3biBhIHdvcmtlciB0byBwcm9jZXNzIHRoZSB0YXNrcyBpbiB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZSBUYXNrIHF1ZXVlXHJcbiAqIEByZXR1cm5zIFByb21pc2U8Sm9iUmVzdWx0W10+IFJldHVybnMgYW4gYXJyYXkgb2YgSm9iUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0pvYnMocXVldWUsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGpvYnMgPSBxdWV1ZS50b0FycmF5KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFsbCBqb2JzXCIsIGpvYnMpO1xyXG4gICAgLy8gQ3JlYXRlIGFuIGludmlzaWJsZSBpZnJhbWUgdG8gYWN0IGFzIGEgXCJ3b3JrZXJcIiB3aGljaFxyXG4gICAgLy8gd2lsbCBkbyB0aGUgdGFzayBvZiBkZWNvZGluZyBhbmQgc2VuZCB1cyBhIG1lc3NhZ2VcclxuICAgIC8vIHdoZW4gaXQncyBkb25lLlxyXG4gICAgZmlnbWEuc2hvd1VJKHdvcmtlclRlbXBsYXRlLCB7IHZpc2libGU6IHRydWUsIHdpZHRoOiAyMDAsIGhlaWdodDogMTI1IH0pO1xyXG4gICAgLy8gU2VuZCB0aGUgcmF3IGJ5dGVzIG9mIHRoZSBmaWxlIHRvIHRoZSB3b3JrZXIuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnc2VudCEnLCBvcHRpb25zKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgam9iczogam9icywgb3B0aW9uczogb3B0aW9ucyB9KTtcclxuICAgIC8vIFdhaXQgZm9yIHRoZSB3b3JrZXIncyByZXNwb25zZS5cclxuICAgIGNvbnN0IGpvYnNSZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gdmFsdWUgPT4gcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBqb2JzUmVzdWx0O1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBJbWFnZUJ5dGVzIHRvIEltYWdlSGFzaCBhbmQgYWRkcyB0byBJbWFnZVBhaW50XHJcbiAqIEBwYXJhbSAge1VpbnQ4QXJyYXl9IGJ5dGVzICBJbWFnZWJ5dGVzIHRvIGNvbnZlcnRcclxuICogQHBhcmFtICB7SW1hZ2VQYWludH0gcGFpbnQgSW1hZ2VQYWludCB0byBhZGQgdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2hcclxuICogQHJldHVybnMgSW1hZ2VQYWludCBSZXR1cm5zIGEgbmV3IEltYWdlUGFpbnQgd2l0aCB0aGUgY29udmVydGVkIEltYWdlSGFzaCBhZGRlZCB0byBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKGJ5dGVzLCBwYWludCkge1xyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHBhaW50IGZvciB0aGUgbmV3IGltYWdlLlxyXG4gICAgY29uc3QgbmV3UGFpbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhaW50KSk7XHJcbiAgICBuZXdQYWludC5pbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShieXRlcykuaGFzaDtcclxuICAgIHJldHVybiBuZXdQYWludDtcclxufVxyXG4vKipcclxuICogQ2Fycnkgb3V0IHRoZSBpbWFnZSBkaXRoZXJpbmcgcHJvY2Nlc3Nlcy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscywgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgVEFTS1MgPSBuZXcgUXVldWUoKTtcclxuICAgICAgICBsZXQgbm9kZUZpbGxzID0gW107XHJcbiAgICAgICAgY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoSW1hZ2VGaWxscyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGVzV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAoZmlsbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXJyeSBvdXQgZGl0aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQnl0ZXMgPSB5aWVsZCBnZXRJbWFnZUJ5dGVzKGZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVGaWxscy5wdXNoKGZpbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGFza1RvUG9vbCh7IGltYWdlQnl0ZXM6IGltYWdlQnl0ZXMsIGZpbGxEYXRhOiBmaWxsRGF0YSB9LCBUQVNLUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdGlsbCBhbGwgam9icyBhcmUgYWRkZWQuLlxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHByb2Nlc3Npbmcgam9icy4uXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlQcm9jZXNzUmVzdWx0cyh5aWVsZCBwcm9jZXNzSm9icyhUQVNLUywgb3B0aW9ucyksIG5vZGVGaWxscywgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFwcGxpZXMgdGhlIHByb2Nlc3NlZCBkaXRoZXIgZWZmZWN0IHRvIGFwcHJvcHJpYXRlIG5vZGVzXHJcbiAqIEBwYXJhbSAge0pvYlJlc3VsdFtdfSByZXN1bHRzXHJcbiAqIEBwYXJhbSAge0ltYWdlRmlsbERhdGFbXX0gbm9kZUZpbGxzXHJcbiAqIEBwYXJhbSAge2FueX0gcmVzb2x2ZVxyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlQcm9jZXNzUmVzdWx0cyhyZXN1bHRzLCBub2RlRmlsbHMsIHJlc29sdmUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKG5vZGVGaWxscyk7XHJcbiAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvY2Vzc0RpdGhlckVmZmVjdCA9IEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKHJlc3VsdC5pbWFnZUJ5dGVzLCByZXN1bHQuZmlsbERhdGEuaW1hZ2VGaWxsKTtcclxuICAgICAgICAvLyBjbG9uZSB0aGUgbm9kZSBmaWxsc1xyXG4gICAgICAgIGNvbnN0IGNvcHlOb2RlRmlsbHMgPSBbLi4ubm9kZUZpbGxzW2luZGV4XS5ub2RlLmZpbGxzXTtcclxuICAgICAgICAvLyByZXBsYWNlIHRoZSBpbWFnZSBmaWx0ZXJcclxuICAgICAgICBjb3B5Tm9kZUZpbGxzLnNwbGljZShyZXN1bHQuZmlsbERhdGEuaW5kZXgsIDEsIHByb2Nlc3NEaXRoZXJFZmZlY3QpO1xyXG4gICAgICAgIG5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxscyA9IGNvcHlOb2RlRmlsbHM7XHJcbiAgICB9KTtcclxuICAgIC8vIHJlc29sdmUgdGhyZSBwcm9taXNlIGFmdGVyIGFwcGx5aW5nIGRpdGhlcmluZyBlZmZlY3QuXHJcbiAgICByZXNvbHZlKCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3R5bGU+XFxyXFxuICBib2R5LFxcclxcbiAgaHRtbCB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRlckNvbnRhaW5lciB7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDY0cHg7XFxyXFxuICAgIGhlaWdodDogNjRweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRpbmctdGV4dCB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcclxcbiAgICBmb250LXNpemU6IDExcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgY29sb3I6ICM1NTU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2IHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDUxcHg7XFxyXFxuICAgIGhlaWdodDogNTFweDtcXHJcXG4gICAgYm9yZGVyOiA2cHggc29saWQgIzAwYWNlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDBhY2VkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGxkcy1yaW5nIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG48L3N0eWxlPlxcclxcblxcclxcblxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImxvYWRlckNvbnRhaW5lclxcXCI+XFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJsZHMtcmluZ1xcXCI+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImxvYWRpbmctdGV4dFxcXCI+XFxyXFxuICAgIGRpdGhlcmluZy4uXFxyXFxuICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48c2NyaXB0Plxcclxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xcclxcbi8vL1xcclxcbi8vLyAgIFxcclxcbi8vL1xcclxcbi8vL1xcclxcbi8vL1xcclxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFdFQiBXT1JLRVIgc2NyaXB0IGluIHN0cmluZy4uLlxcclxcblxcclxcbi8vIFRoZSBjb2RlIGNvbnRhaW5lZCBpbiB0aGlzIHN0cmluZyBpcyB0aGUgYWN0dWFsIGxvZ2ljcyB0byBtYW5pcHVsYXRlICBjYW52YXMgaW1hZ2VcXHJcXG4vLyBhbmQgY2Fycnkgb3V0IHRoZSBkaXRoZXJpbmcgZWZmZWN0Li5cXHJcXG5cXHJcXG5jb25zdCB3b3JrZXJTY3JpcHQgPSBgXFxyXFxuICAvLyBDb252ZXJ0IGltYWdlIGRhdGEgdG8gZ3JleXNjYWxlIGJhc2VkIG9uIGx1bWluYW5jZS5cXHJcXG5mdW5jdGlvbiBncmV5c2NhbGVfbHVtaW5hbmNlKGltYWdlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDJdID0gcGFyc2VJbnQoXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpXSAqIDAuMjEgK1xcclxcbiAgICAgICAgICAgIGltYWdlLmRhdGFbaSArIDFdICogMC43MSArXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpICsgMl0gKiAwLjA3LFxcclxcbiAgICAgICAgICAgIDEwXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBpbWFnZTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ29udmVydCBpbWFnZSBkYXRhIHRvIGdyZXlzY2FsZSBiYXNlZCBvbiBhdmVyYWdlIG9mIFIsIEcgYW5kIEIgdmFsdWVzLlxcclxcbmZ1bmN0aW9uIGdyZXlzY2FsZV9hdmVyYWdlKGltYWdlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDJdID0gcGFyc2VJbnQoXFxyXFxuICAgICAgICAgICAgKGltYWdlLmRhdGFbaV0gKyBpbWFnZS5kYXRhW2kgKyAxXSArIGltYWdlLmRhdGFbaSArIDJdKSAvIDMsXFxyXFxuICAgICAgICAgICAgMTBcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGltYWdlO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBBcHBseSBBdGtpbnNvbiBEaXRoZXIgdG8gSW1hZ2UgRGF0YVxcclxcbmZ1bmN0aW9uIGRpdGhlcl9hdGtpbnNvbihpbWFnZSwgaW1hZ2VXaWR0aCwgZHJhd0NvbG91cikge1xcclxcbiAgICBza2lwUGl4ZWxzID0gNDtcXHJcXG5cXHJcXG4gICAgaWYgKCFkcmF3Q29sb3VyKSBkcmF3Q29sb3VyID0gZmFsc2U7XFxyXFxuXFxyXFxuICAgIGlmIChkcmF3Q29sb3VyID09IHRydWUpIHNraXBQaXhlbHMgPSAxO1xcclxcblxcclxcbiAgICBpbWFnZUxlbmd0aCA9IGltYWdlLmRhdGEubGVuZ3RoO1xcclxcblxcclxcbiAgICBmb3IgKFxcclxcbiAgICAgICAgY3VycmVudFBpeGVsID0gMDtcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCA8PSBpbWFnZUxlbmd0aDtcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCArPSBza2lwUGl4ZWxzXFxyXFxuICAgICkge1xcclxcbiAgICAgICAgaWYgKGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSA8PSAxMjgpIHtcXHJcXG4gICAgICAgICAgICBuZXdQaXhlbENvbG91ciA9IDA7XFxyXFxuICAgICAgICB9IGVsc2Uge1xcclxcbiAgICAgICAgICAgIG5ld1BpeGVsQ29sb3VyID0gMjU1O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZXJyID0gcGFyc2VJbnQoKGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSAtIG5ld1BpeGVsQ29sb3VyKSAvIDgsIDEwKTtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSA9IG5ld1BpeGVsQ29sb3VyO1xcclxcblxcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDhdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGggLSA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoXSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoICsgNF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA4ICogaW1hZ2VXaWR0aF0gKz0gZXJyO1xcclxcblxcclxcbiAgICAgICAgaWYgKGRyYXdDb2xvdXIgPT0gZmFsc2UpXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyAxXSA9IGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgMl0gPVxcclxcbiAgICAgICAgICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbF07XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgcmV0dXJuIGltYWdlLmRhdGE7XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIGRpdGhlcl90aHJlc2hvbGQoaW1hZ2UsIHRocmVzaG9sZF92YWx1ZSkge1xcclxcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbWFnZS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2ldID0gaW1hZ2UuZGF0YVtpXSA+IHRocmVzaG9sZF92YWx1ZSA/IDI1NSA6IDA7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDFdID4gdGhyZXNob2xkX3ZhbHVlID8gMjU1IDogMDtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDJdID0gaW1hZ2UuZGF0YVtpICsgMl0gPiB0aHJlc2hvbGRfdmFsdWUgPyAyNTUgOiAwO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIHJlcGxhY2VfY29sb3VycyhpbWFnZSwgYmxhY2ssIHdoaXRlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2ldIDwgMTI3ID8gYmxhY2suciA6IHdoaXRlLnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDFdIDwgMTI3ID8gYmxhY2suZyA6IHdoaXRlLmc7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAyXSA9IGltYWdlLmRhdGFbaSArIDJdIDwgMTI3ID8gYmxhY2suYiA6IHdoaXRlLmI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAzXSA9XFxyXFxuICAgICAgICAgICAgKGltYWdlLmRhdGFbaV0gKyBpbWFnZS5kYXRhW2kgKyAxXSArIGltYWdlLmRhdGFbaSArIDJdKSAvIDMgPCAxMjdcXHJcXG4gICAgICAgICAgICAgICAgPyBibGFjay5hXFxyXFxuICAgICAgICAgICAgICAgIDogd2hpdGUuYTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5mdW5jdGlvbiBkaXRoZXIoZGF0YSkge1xcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiTHVtaW5hbmNlXFxcIikge1xcclxcbiAgICAgICAgZ3JleXNjYWxlX2x1bWluYW5jZShkYXRhLmltYWdlLmRhdGEpO1xcclxcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIlJHQiBBdmVyYWdlXFxcIikge1xcclxcbiAgICAgICAgZ3JleXNjYWxlX2F2ZXJhZ2UoZGF0YS5pbWFnZS5kYXRhKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLmRpdGhlck1ldGhvZCA9PSBcXFwiQXRraW5zb24gRGl0aGVyaW5nXFxcIikge1xcclxcbiAgICAgICAgZGl0aGVyX2F0a2luc29uKFxcclxcbiAgICAgICAgICAgIGRhdGEuaW1hZ2UuZGF0YSxcXHJcXG4gICAgICAgICAgICBkYXRhLmltYWdlLndpZHRoLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIkRpc2FibGVkXFxcIlxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb2Nlc3NpbmcuZGl0aGVyTWV0aG9kID09IFxcXCJUaHJlc2hvbGRcXFwiKSB7XFxyXFxuICAgICAgICBkaXRoZXJfdGhyZXNob2xkKGRhdGEuaW1hZ2UuZGF0YSwgZGF0YS5wcm9jZXNzaW5nLmRpdGhlclRocmVzaG9sZCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaWYgKGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VycyA9PSB0cnVlKSB7XFxyXFxuICAgICAgICByZXBsYWNlX2NvbG91cnMoXFxyXFxuICAgICAgICAgICAgZGF0YS5pbWFnZS5kYXRhLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VyTWFwLmJsYWNrLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VyTWFwLndoaXRlXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBkYXRhO1xcclxcbn1cXHJcXG5cXHJcXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXFxcIm1lc3NhZ2VcXFwiLCBmdW5jdGlvbiAoZSkgeyBzZWxmLnBvc3RNZXNzYWdlKGRpdGhlcihlLmRhdGEpKTsgfSwgZmFsc2UpO1xcclxcbiAgYDtcXHJcXG5cXHJcXG4gIC8vIFNpbmNlIHdlIGNhbm5vdCBsb2FkIGV4dGVybmFsIHNjcmlwdCBidXQgd2Vid29ya2VyIG5lZWRzIGEgVVJMXFxyXFxuICAvLyBjb252ZXJ0IHRoZSBjb2RlIHRoYW4gaXMgbWVhbnQgdG8gcnVuIGluIHRoZSB3ZWJ3b3JrZXIgdG9cXHJcXG4gIC8vIFVSTCBCTE9CIGFuZCBwYXNzIGl0IGludG8gdGhlIHdlYndvcmtlci5cXHJcXG4gIC8vIE5lYXQgdHJpY2s6XFxyXFxuXFxyXFxuICBmdW5jdGlvbiBsb2FkV2ViV29ya2VyKHNjcmlwdCkge1xcclxcbiAgICByZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzY3JpcHRdKSkpO1xcclxcbiAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gTE9HSUNTIGZvciBqb2IgcHJvY2Vzc2luZ1xcclxcbiAgLy8vLy8gRW50cnkgcG9pbnQgdG8gZGl0aGVyaW5nIG9mIHRoZSBwcm92aWRlZCBpbWFnZSBqb2JzIC4uLlxcclxcblxcclxcblxcclxcbiAgLy8gRW5jb2RpbmcgYW4gaW1hZ2UgaXMgYWxzbyBkb25lIGJ5IHN0aWNraW5nIHBpeGVscyBpbiBhblxcclxcbiAgLy8gSFRNTCBjYW52YXMgYW5kIGJ5IGFza2luZyB0aGUgY2FudmFzIHRvIHNlcmlhbGl6ZSBpdCBpbnRvXFxyXFxuICAvLyBhbiBhY3R1YWwgUE5HIGZpbGUgdmlhIGNhbnZhcy50b0Jsb2IoKS5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIGVuY29kZShjYW52YXMsIGN0eCwgaW1hZ2VEYXRhKSB7XFxyXFxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxcclxcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xcclxcbiAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XFxyXFxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXFxyXFxuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4gcmVzb2x2ZShuZXcgVWludDhBcnJheShyZWFkZXIucmVzdWx0KSlcXHJcXG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignQ291bGQgbm90IHJlYWQgZnJvbSBibG9iJykpXFxyXFxuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcXHJcXG4gICAgICB9KVxcclxcbiAgICB9KVxcclxcbiAgfVxcclxcblxcclxcbiAgLy8gRGVjb2RpbmcgYW4gaW1hZ2UgY2FuIGJlIGRvbmUgYnkgc3RpY2tpbmcgaXQgaW4gYW4gSFRNTFxcclxcbiAgLy8gY2FudmFzLCBhcyB3ZSBjYW4gcmVhZCBpbmRpdmlkdWFsIHBpeGVscyBvZmYgdGhlIGNhbnZhcy5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIGRlY29kZShjYW52YXMsIGN0eCwgYnl0ZXMpIHtcXHJcXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYnl0ZXNdKSlcXHJcXG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcXHJcXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpXFxyXFxuICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoKVxcclxcbiAgICAgIGltZy5zcmMgPSB1cmxcXHJcXG4gICAgfSlcXHJcXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGhcXHJcXG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodFxcclxcbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwKVxcclxcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpXFxyXFxuICAgIHJldHVybiB7XFxyXFxuICAgICAgaW1hZ2VEYXRhOiBpbWFnZURhdGEsXFxyXFxuICAgICAgd2lkdGg6IGltYWdlLndpZHRoLFxcclxcbiAgICAgIGhlaWdodDogaW1hZ2Uud2lkdGhcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gMS4gU3BpbiBvbiBvdXIgbWFnaW5maWNpZW50IHdlYndvcmtlciAuLi5cXHJcXG4gIHdpbmRvdy5ESVRIRVJfV09SS0VSID0gbG9hZFdlYldvcmtlcih3b3JrZXJTY3JpcHQpO1xcclxcblxcclxcblxcclxcbiAgLy8vLy8vLyAyLiBDaGlsbCwgdGlsbCB0aGUgdXNlciBzZW5kcyBhIGpvYi4uLi5cXHJcXG4gIC8vIENyZWF0ZSBhbiBldmVudCBoYW5kbGVyIHRvIHJlY2VpdmUgbWVzc2FnZXMgZnJvbSB0aGUgbWFpblxcclxcbiAgLy8gdGhyZWFkLlxcclxcbiAgd2luZG93Lm9ubWVzc2FnZSA9IGFzeW5jIGV2ZW50ID0+IHtcXHJcXG4gICAgLy8gSnVzdCBnZXQgdGhlIGJ5dGVzIGRpcmVjdGx5IGZyb20gdGhlIHBsdWdpbk1lc3NhZ2Ugc2luY2VcXHJcXG4gICAgLy8gdGhhdCdzIHRoZSBvbmx5IHR5cGUgb2YgbWVzc2FnZSB3ZSdsbCByZWNlaXZlIGluIHRoaXNcXHJcXG4gICAgLy8gcGx1Z2luLiBJbiBtb3JlIGNvbXBsZXggcGx1Z2lucywgeW91J2xsIHdhbnQgdG8gY2hlY2sgdGhlXFxyXFxuICAgIC8vIHR5cGUgb2YgdGhlIG1lc3NhZ2UuXFxyXFxuXFxyXFxuICAgIC8vIGNvbnRhaW4gdGhlIHByb2Nlc3NlZCAoZGl0aGVyZWQpIGltYWdlYnl0ZXMuLi5cXHJcXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xcclxcbiAgICBcXHJcXG4gICAgLy8gID0+IFRha2UgYSBsb29rIGF0IHRoZSBzZW50IGRhdGEuXFxyXFxuICAgIGNvbnN0IHJlY3ZlZERhdGEgPSBldmVudC5kYXRhLnBsdWdpbk1lc3NhZ2U7XFxyXFxuXFxyXFxuICAgIC8vIEV4dHJhY3QgdGhlIGpvYnMuLlxcclxcbiAgICBjb25zdCBqb2JzID0gcmVjdmVkRGF0YS5qb2JzO1xcclxcblxcclxcbiAgICAvLyBXZSBwcm9jZXNzIHRoZSBqb2Igb25lIGFmdGVyIHRoZSBvdGhlci4uLlxcclxcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSB7XFxyXFxuXFxyXFxuICAgICAgLy8geWVhaCB3ZSBuZWVkIHRvIHJlc2xvdmUgdHdvIHByb21pc2VzIGJlZm9yZSB3ZSBwcm9jZWVkIHRvIHRoZSBuZXh0IGpvYlxcclxcbiAgICAgIHJlc3VsdHMucHVzaCh7XFxyXFxuICAgICAgICBpbWFnZUJ5dGVzOiBhd2FpdCAoYXdhaXQgcHJvY2Vzc0RpdGhlcihqb2IsIHJlY3ZlZERhdGEub3B0aW9ucykpLFxcclxcbiAgICAgICAgZmlsbERhdGE6IGpvYi5maWxsRGF0YVxcclxcbiAgICAgIH0pO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC8vIFNpbmNlIHdlIGFyZSBjb21wbGV0ZWx5IGRvbmUgd2l0aCBvdXIgam9icywga2lsbCB0aGUgV2Vid29ya2VyLi4uXFxyXFxuICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnRlcm1pbmF0ZSgpO1xcclxcblxcclxcbiAgICAvLyBTZW5kIHRoZSByZXN1bHQgYmFjayB0byB0aGUgVXNlci4uXFxyXFxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xcclxcbiAgICAgIHBsdWdpbk1lc3NhZ2U6IHJlc3VsdHNcXHJcXG4gICAgfSwgXFxcIipcXFwiKTtcXHJcXG4gIH07XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8gMy4gVGhpcyBtZXRob2Qgc2VuZHMgYSBqb2IgcmVxdWVzdCB0byB0aGUgd2ViIHdvcmtlciBhbmQgd2FpdCB0aWxsIHNvbWV0aGluZyBoYXBwZW5zLi5cXHJcXG5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NEaXRoZXIoam9iLCBvcHRpb25zKSB7XFxyXFxuICAgIGNvbnN0IGJ5dGVzID0gam9iLmltYWdlQnl0ZXM7XFxyXFxuXFxyXFxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXFxcImNhbnZhc1xcXCIpO1xcclxcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcXFwiMmRcXFwiKTtcXHJcXG5cXHJcXG4gICAgY29uc3QgaW1hZ2VEZXRhaWxzID0gYXdhaXQgZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcyk7XFxyXFxuICAgIC8vIGNvbnNvbGUubG9nKGltYWdlRGV0YWlscyk7XFxyXFxuICAgIGNvbnN0IHByZXNldCA9IHtcXHJcXG4gICAgICBpbWFnZToge1xcclxcbiAgICAgICAgZGF0YTogaW1hZ2VEZXRhaWxzLmltYWdlRGF0YSxcXHJcXG4gICAgICAgIHdpZHRoOiBpbWFnZURldGFpbHMud2lkdGgsXFxyXFxuICAgICAgICBoZWlnaHQ6IGltYWdlRGV0YWlscy5oZWlnaHRcXHJcXG4gICAgICB9LFxcclxcbiAgICAgIHByb2Nlc3Npbmc6IHtcXHJcXG4gICAgICAgIGdyZXlzY2FsZU1ldGhvZDogb3B0aW9ucy5ncmV5c2NhbGVfbWV0aG9kLFxcclxcbiAgICAgICAgZGl0aGVyTWV0aG9kOiBvcHRpb25zLmRpdGhlcl9tZXRob2QsXFxyXFxuICAgICAgICBkaXRoZXJUaHJlc2hvbGQ6IG9wdGlvbnMudGhyZXNob2xkLFxcclxcbiAgICAgICAgcmVwbGFjZUNvbG91cnM6IG9wdGlvbnMuY2hrX3JlcGxhY2VfY29sb3VycyxcXHJcXG4gICAgICAgIHJlcGxhY2VDb2xvdXJNYXA6IHtcXHJcXG4gICAgICAgICAgYmxhY2s6IHtcXHJcXG4gICAgICAgICAgICByOiBvcHRpb25zLnJlcF9ibGFja1swXSxcXHJcXG4gICAgICAgICAgICBnOiBvcHRpb25zLnJlcF9ibGFja1sxXSxcXHJcXG4gICAgICAgICAgICBiOiBvcHRpb25zLnJlcF9ibGFja1syXSxcXHJcXG4gICAgICAgICAgICBhOiBvcHRpb25zLnJlcF9ibGFja1szXVxcclxcbiAgICAgICAgICB9LFxcclxcbiAgICAgICAgICB3aGl0ZToge1xcclxcbiAgICAgICAgICAgIHI6IG9wdGlvbnMucmVwX3doaXRlWzBdLFxcclxcbiAgICAgICAgICAgIGc6IG9wdGlvbnMucmVwX3doaXRlWzFdLFxcclxcbiAgICAgICAgICAgIGI6IG9wdGlvbnMucmVwX3doaXRlWzJdLFxcclxcbiAgICAgICAgICAgIGE6IG9wdGlvbnMucmVwX3doaXRlWzNdXFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgIH07XFxyXFxuXFxyXFxuICAgIC8vIFN0YXJ0IHRpbWVyIHRvIHRyYWNrIHRoZSB0aW1lIHRoYXQgaXMgc3BlbnQgb24gdGhpcyBjdXJyZW50IGpvYiAuLi5cXHJcXG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRpbWUpIHtcXHJcXG4gICAgICBjb25zb2xlLmxvZyhcXFwiU3RhcnRpbmcgV2ViIFdvcmtlciBmb3IgaW1hZ2UgKFxcXCIgKyBpbWFnZURldGFpbHMud2lkdGggKyBcXFwieFxcXCIgKyBpbWFnZURldGFpbHMuaGVpZ2h0ICtcXHJcXG4gICAgICAgIFxcXCIsIEdyZXlzY2FsZSBNZXRob2Q6IFxcXCIgKyBvcHRpb25zLmdyZXlzY2FsZV9tZXRob2QgKyBcXFwiLCBEaXRoZXIgTWV0aG9kOiBcXFwiICsgb3B0aW9ucy5kaXRoZXJfbWV0aG9kICsgXFxcIilcXFwiKTtcXHJcXG4gICAgICBjb25zb2xlLnRpbWUoXFxcIldlYiB3b3JrZXIgdG9va1xcXCIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC8vIFNlbmQgam9iIHRvIHdlYndvcmtlclxcclxcbiAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5wb3N0TWVzc2FnZShwcmVzZXQpO1xcclxcblxcclxcbiAgICAvLyBOT1RJQ0U6IEhlcmUgdG8gYXZvaWQgbWVtb3J5IGxlYWtzLCB3ZSBhcmUgdXNpbmcgYSBvbmUgdGltZSBldmVudCBsaXN0bmVyLi5cXHJcXG4gICAgLy8gdGhlcmVmb3JlIGVhY2ggam9iIGFwcGxpZXMgYW4gZXZlbnQgbGlzdG5lciB0byB0aGUgd29ya2VyIGFuZCBvbmNlIHRoZSB3b3JrZXJzPVxcclxcbiAgICAvLyBzZW5kcyB0aGUgcmVzdWx0IGJhY2ssIHdlIGRpc3Bvc2UvdW5yZWdpc3RlciB0aGUgZXZlbnQgbGlzdG5lci4uLlxcclxcblxcclxcbiAgICBjb25zdCB3b3JrZXJSZXN1bHQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XFxyXFxuICAgICAgLy8gR2V0IHJlcGx5IGZyb20gd2Vid29ya2VyXFxyXFxuICAgICAgY29uc3Qgb25lVGltZUxpc3RlbiA9IGZ1bmN0aW9uIChlKSB7XFxyXFxuICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzdWx0JywgZSk7XFxyXFxuICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUudGltZSkge1xcclxcbiAgICAgICAgICBjb25zb2xlLnRpbWVFbmQoXFxcIldlYiB3b3JrZXIgdG9va1xcXCIpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZS5kYXRhO1xcclxcbiAgICAgICAgZW5jb2RlKGNhbnZhcywgY3R4LCByZXN1bHQuaW1hZ2UuZGF0YSkudGhlbihuZXdCeXRlcyA9PiB7XFxyXFxuXFxyXFxuICAgICAgICAgIC8vIG1ha2UgaXQgYSBvbmUgdGltZSBldmVudCBsaXN0bmVyLi4uXFxyXFxuICAgICAgICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbmVUaW1lTGlzdGVuKTtcXHJcXG4gICAgICAgICAgcmVzb2x2ZShuZXdCeXRlcyk7XFxyXFxuICAgICAgICB9KTtcXHJcXG4gICAgICB9O1xcclxcblxcclxcbiAgICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbmVUaW1lTGlzdGVuLCBmYWxzZSk7XFxyXFxuICAgIH0pO1xcclxcblxcclxcbiAgICByZXR1cm4gd29ya2VyUmVzdWx0O1xcclxcbiAgfVxcclxcbjwvc2NyaXB0PlwiIl0sInNvdXJjZVJvb3QiOiIifQ==