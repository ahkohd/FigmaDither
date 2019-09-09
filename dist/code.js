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
        if (currentSelections.length == 0) {
            figma.notify('😅 Please select item(s) with image fill');
        }
        else {
            Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["DoImageDither"])(currentSelections, msg.options)
                .then(function () {
                figma.closePlugin();
            });
        }
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
    console.log(nodes);
    const nodeWithFills = nodes.filter(node => {
        if ("fills" in node) {
            for (const fill of node.fills) {
                if (fill.type == "IMAGE")
                    return true;
            }
            return false;
        }
        else {
            return false;
        }
    });
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
                    applyProcessResults(yield processJobs(TASKS, options), nodeFills, options.keep_image, resolve);
                }
            });
        });
    });
}
/**
 * Applies the processed dither effect to appropriate nodes
 * @param  {JobResult[]} results
 * @param  {ImageFillData[]} nodeFills
 * @param  {keep} keepImageFills Keeps the original image fill instead of replacing it..
 * @param  {any} resolve
 */
function applyProcessResults(results, nodeFills, keepImageFills = false, resolve) {
    // console.log(nodeFills);
    results.forEach((result, index) => {
        let processDitherEffect = BytesToImagePaintHashImage(result.imageBytes, result.fillData.imageFill);
        // clone the node fills
        const copyNodeFills = [...nodeFills[index].node.fills];
        if (!keepImageFills) {
            // replace the image filter
            copyNodeFills.splice(result.fillData.index, 1, processDitherEffect);
        }
        else {
            // the new imag filter to the top..
            copyNodeFills.push(processDitherEffect);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVFQUFvQixDQUFDLHVFQUFvQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0VBQWE7QUFDekI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtB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Qiw0T0FBNE8sc0JBQXNCLDhLQUE4Syx1QkFBdUIsOEtBQThLLGFBQWEsV0FBVyxVQUFVLHNJQUFzSSx1T0FBdU8sNENBQTRDLFNBQVMscUZBQXFGLHlVQUF5VSxtRkFBbUYsd0NBQXdDLHdEQUF3RCxtREFBbUQsYUFBYSxrQ0FBa0MscUVBQXFFLHlJQUF5SSxnQ0FBZ0MsYUFBYSxFQUFFLFlBQVkscUZBQXFGLFNBQVMsRUFBRSxnQ0FBZ0MsT0FBTyxjIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbnMsIGZpbHRlck5vZGVzV2l0aEZpbGxzLCBEb0ltYWdlRGl0aGVyIH0gZnJvbSBcIi4vbGliL3V0aWxzXCI7XHJcbi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXHJcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cclxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxyXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcclxuLy8gZnVsbCBicm93c2VyIGVudmlyb21lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cclxuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAsIHdpZHRoOiAyNzAgfSk7XHJcbi8vIENhbGxzIHRvIFwicGFyZW50LnBvc3RNZXNzYWdlXCIgZnJvbSB3aXRoaW4gdGhlIEhUTUwgcGFnZSB3aWxsIHRyaWdnZXIgdGhpc1xyXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcclxuLy8gcG9zdGVkIG1lc3NhZ2UuXHJcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGl0aGVyLWltYWdlXCIpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9ucyA9IGZpbHRlck5vZGVzV2l0aEZpbGxzKGdldEN1cnJlbnRTZWxlY3Rpb25zKCkpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9ucy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBmaWdtYS5ub3RpZnkoJ/CfmIUgUGxlYXNlIHNlbGVjdCBpdGVtKHMpIHdpdGggaW1hZ2UgZmlsbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgRG9JbWFnZURpdGhlcihjdXJyZW50U2VsZWN0aW9ucywgbXNnLm9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY2FuY2VsXCIpIHtcclxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG4gICAgfVxyXG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxyXG4gICAgLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBRdWV1ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZW5xdWV1ZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcbiAgICBkZXF1ZXVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZS5zaGlmdCgpO1xyXG4gICAgfVxyXG4gICAgdG9BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJy4vUXVldWUnO1xyXG5pbXBvcnQgd29ya2VyVGVtcGxhdGUgZnJvbSAnLi4vd29ya2VyL2VudHJ5Lmh0bWwnO1xyXG4vKipcclxuICogR2V0cyB0aGUgY3VycmVudCBVc2VyIFNlbGVjdGlvbihzKVxyXG4gKiBAcmV0dXJucyByZWFkb25seSBTY2VuZU5vZGVbXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTZWxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcclxufVxyXG4vKipcclxuICogRmlsdGVycyBubmRlcyB0aGF0IGhhdmUgZmlsbHMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IG5vZGVzXHJcbiAqIEByZXR1cm5zIFNjZW5lTm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlck5vZGVzV2l0aEZpbGxzKG5vZGVzKSB7XHJcbiAgICBjb25zb2xlLmxvZyhub2Rlcyk7XHJcbiAgICBjb25zdCBub2RlV2l0aEZpbGxzID0gbm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xyXG4gICAgICAgIGlmIChcImZpbGxzXCIgaW4gbm9kZSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGwgb2Ygbm9kZS5maWxscykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGwudHlwZSA9PSBcIklNQUdFXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5vZGVXaXRoRmlsbHMubGVuZ3RoID09IDAgPyBbXSA6IG5vZGVXaXRoRmlsbHM7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG9iamVjdCBpcyBpdGVyYXRhYmxlXHJcbiAqIEBwYXJhbSBvYmpcclxuICovXHJcbmZ1bmN0aW9uIF9pc0l0ZXJhYmxlKG9iaikge1xyXG4gICAgLy8gY2hlY2tzIGZvciBudWxsIGFuZCB1bmRlZmluZWRcclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2Ygb2JqW1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIjtcclxufVxyXG4vKipcclxuICogR2V0cyBhbGwgSW1hZ2UgZmlsbHMgZnJvbSBhIG5vZGUuXHJcbiAqIEBwYXJhbSAge1NjZW5lTm9kZX0gbm9kZSBOb2RlIHRvIGV4dHJhY3QgdGhlIGltYWdlIGZpbGxzXHJcbiAqIEByZXR1cm5zIEltYWdlRmlsbERhdGFbXSBBbiBhcnJheSBvZiBpbWFnZSBmaWxscyBvZiB0aGUgbm9kZSBhcyBJbWFnZUZpbGxEYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VGaWxsc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIGNvbnN0IHJlc3VsdGluZ0ltYWdlRmlsbHMgPSBbXTtcclxuICAgIGxldCBmaWxscyA9IG5vZGUuZmlsbHM7XHJcbiAgICBpZiAoX2lzSXRlcmFibGUoZmlsbHMpKSB7XHJcbiAgICAgICAgZmlsbHMgPSBmaWxscztcclxuICAgICAgICBmaWxscy5mb3JFYWNoKChmaWxsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsbC50eXBlID09IFwiSU1BR0VcIilcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ0ltYWdlRmlsbHMucHVzaCh7IGltYWdlRmlsbDogZmlsbCwgaW5kZXg6IGluZGV4LCBub2RlOiBub2RlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdGluZ0ltYWdlRmlsbHM7XHJcbn1cclxuLyoqXHJcbiAqIEdldHMgdGhlIEltYWdlQnl0ZXMgZnJvbSBhIEltYWdlUGFpbnQgZmlsbFxyXG4gKiBAcGFyYW0gIHtJbWFnZVBhaW50fSBmaWxsXHJcbiAqIEByZXR1cm5zIFByb21pc2U8VWludDhBcnJheT5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUJ5dGVzKGZpbGwpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWdtYS5nZXRJbWFnZUJ5SGFzaChmaWxsLmltYWdlSGFzaCk7XHJcbiAgICAgICAgY29uc3QgYnl0ZXMgPSB5aWVsZCBpbWFnZS5nZXRCeXRlc0FzeW5jKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFkZHMgYSBqb2IgdG8gdGhlIHRhc2sgcXVldWVcclxuICogQHBhcmFtICB7YW55fSB0YXNrXHJcbiAqIEBwYXJhbSAge1F1ZXVlPGFueT59IHF1ZXVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVGFza1RvUG9vbCh0YXNrLCBxdWV1ZSkge1xyXG4gICAgcXVldWUuZW5xdWV1ZSh0YXNrKTtcclxufVxyXG4vKipcclxuICogU3Bhd24gYSB3b3JrZXIgdG8gcHJvY2VzcyB0aGUgdGFza3MgaW4gdGhlIHRhc2sgcXVldWVcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWUgVGFzayBxdWV1ZVxyXG4gKiBAcmV0dXJucyBQcm9taXNlPEpvYlJlc3VsdFtdPiBSZXR1cm5zIGFuIGFycmF5IG9mIEpvYlJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NKb2JzKHF1ZXVlLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBqb2JzID0gcXVldWUudG9BcnJheSgpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJBbGwgam9ic1wiLCBqb2JzKTtcclxuICAgIC8vIENyZWF0ZSBhbiBpbnZpc2libGUgaWZyYW1lIHRvIGFjdCBhcyBhIFwid29ya2VyXCIgd2hpY2hcclxuICAgIC8vIHdpbGwgZG8gdGhlIHRhc2sgb2YgZGVjb2RpbmcgYW5kIHNlbmQgdXMgYSBtZXNzYWdlXHJcbiAgICAvLyB3aGVuIGl0J3MgZG9uZS5cclxuICAgIGZpZ21hLnNob3dVSSh3b3JrZXJUZW1wbGF0ZSwgeyB2aXNpYmxlOiB0cnVlLCB3aWR0aDogMjAwLCBoZWlnaHQ6IDEyNSB9KTtcclxuICAgIC8vIFNlbmQgdGhlIHJhdyBieXRlcyBvZiB0aGUgZmlsZSB0byB0aGUgd29ya2VyLlxyXG4gICAgLy8gY29uc29sZS5sb2coJ3NlbnQhJywgb3B0aW9ucyk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IGpvYnM6IGpvYnMsIG9wdGlvbnM6IG9wdGlvbnMgfSk7XHJcbiAgICAvLyBXYWl0IGZvciB0aGUgd29ya2VyJ3MgcmVzcG9uc2UuXHJcbiAgICBjb25zdCBqb2JzUmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IHZhbHVlID0+IHJlc29sdmUodmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gam9ic1Jlc3VsdDtcclxufVxyXG4vKipcclxuICogQ29udmVydHMgSW1hZ2VCeXRlcyB0byBJbWFnZUhhc2ggYW5kIGFkZHMgdG8gSW1hZ2VQYWludFxyXG4gKiBAcGFyYW0gIHtVaW50OEFycmF5fSBieXRlcyAgSW1hZ2VieXRlcyB0byBjb252ZXJ0XHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IHBhaW50IEltYWdlUGFpbnQgdG8gYWRkIHRoZSBjb252ZXJ0ZWQgSW1hZ2VIYXNoXHJcbiAqIEByZXR1cm5zIEltYWdlUGFpbnQgUmV0dXJucyBhIG5ldyBJbWFnZVBhaW50IHdpdGggdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2ggYWRkZWQgdG8gaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShieXRlcywgcGFpbnQpIHtcclxuICAgIC8vIENyZWF0ZSBhIG5ldyBwYWludCBmb3IgdGhlIG5ldyBpbWFnZS5cclxuICAgIGNvbnN0IG5ld1BhaW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYWludCkpO1xyXG4gICAgbmV3UGFpbnQuaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UoYnl0ZXMpLmhhc2g7XHJcbiAgICByZXR1cm4gbmV3UGFpbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhcnJ5IG91dCB0aGUgaW1hZ2UgZGl0aGVyaW5nIHByb2NjZXNzZXMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMsIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IFRBU0tTID0gbmV3IFF1ZXVlKCk7XHJcbiAgICAgICAgbGV0IG5vZGVGaWxscyA9IFtdO1xyXG4gICAgICAgIGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEltYWdlRmlsbHMgPSBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2Rlc1dpdGhJbWFnZUZpbGxzLmZvckVhY2goZnVuY3Rpb24gKGZpbGxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2Fycnkgb3V0IGRpdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUJ5dGVzID0geWllbGQgZ2V0SW1hZ2VCeXRlcyhmaWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlRmlsbHMucHVzaChmaWxsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRhc2tUb1Bvb2woeyBpbWFnZUJ5dGVzOiBpbWFnZUJ5dGVzLCBmaWxsRGF0YTogZmlsbERhdGEgfSwgVEFTS1MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB3YWl0IHRpbGwgYWxsIGpvYnMgYXJlIGFkZGVkLi5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBwcm9jZXNzaW5nIGpvYnMuLlxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5UHJvY2Vzc1Jlc3VsdHMoeWllbGQgcHJvY2Vzc0pvYnMoVEFTS1MsIG9wdGlvbnMpLCBub2RlRmlsbHMsIG9wdGlvbnMua2VlcF9pbWFnZSwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFwcGxpZXMgdGhlIHByb2Nlc3NlZCBkaXRoZXIgZWZmZWN0IHRvIGFwcHJvcHJpYXRlIG5vZGVzXHJcbiAqIEBwYXJhbSAge0pvYlJlc3VsdFtdfSByZXN1bHRzXHJcbiAqIEBwYXJhbSAge0ltYWdlRmlsbERhdGFbXX0gbm9kZUZpbGxzXHJcbiAqIEBwYXJhbSAge2tlZXB9IGtlZXBJbWFnZUZpbGxzIEtlZXBzIHRoZSBvcmlnaW5hbCBpbWFnZSBmaWxsIGluc3RlYWQgb2YgcmVwbGFjaW5nIGl0Li5cclxuICogQHBhcmFtICB7YW55fSByZXNvbHZlXHJcbiAqL1xyXG5mdW5jdGlvbiBhcHBseVByb2Nlc3NSZXN1bHRzKHJlc3VsdHMsIG5vZGVGaWxscywga2VlcEltYWdlRmlsbHMgPSBmYWxzZSwgcmVzb2x2ZSkge1xyXG4gICAgLy8gY29uc29sZS5sb2cobm9kZUZpbGxzKTtcclxuICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9jZXNzRGl0aGVyRWZmZWN0ID0gQnl0ZXNUb0ltYWdlUGFpbnRIYXNoSW1hZ2UocmVzdWx0LmltYWdlQnl0ZXMsIHJlc3VsdC5maWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgIC8vIGNsb25lIHRoZSBub2RlIGZpbGxzXHJcbiAgICAgICAgY29uc3QgY29weU5vZGVGaWxscyA9IFsuLi5ub2RlRmlsbHNbaW5kZXhdLm5vZGUuZmlsbHNdO1xyXG4gICAgICAgIGlmICgha2VlcEltYWdlRmlsbHMpIHtcclxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgaW1hZ2UgZmlsdGVyXHJcbiAgICAgICAgICAgIGNvcHlOb2RlRmlsbHMuc3BsaWNlKHJlc3VsdC5maWxsRGF0YS5pbmRleCwgMSwgcHJvY2Vzc0RpdGhlckVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGUgbmV3IGltYWcgZmlsdGVyIHRvIHRoZSB0b3AuLlxyXG4gICAgICAgICAgICBjb3B5Tm9kZUZpbGxzLnB1c2gocHJvY2Vzc0RpdGhlckVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxscyA9IGNvcHlOb2RlRmlsbHM7XHJcbiAgICB9KTtcclxuICAgIC8vIHJlc29sdmUgdGhyZSBwcm9taXNlIGFmdGVyIGFwcGx5aW5nIGRpdGhlcmluZyBlZmZlY3QuXHJcbiAgICByZXNvbHZlKCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3R5bGU+XFxyXFxuICBib2R5LFxcclxcbiAgaHRtbCB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRlckNvbnRhaW5lciB7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDY0cHg7XFxyXFxuICAgIGhlaWdodDogNjRweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRpbmctdGV4dCB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcclxcbiAgICBmb250LXNpemU6IDExcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgY29sb3I6ICM1NTU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2IHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDUxcHg7XFxyXFxuICAgIGhlaWdodDogNTFweDtcXHJcXG4gICAgYm9yZGVyOiA2cHggc29saWQgIzAwYWNlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDBhY2VkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGxkcy1yaW5nIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG48L3N0eWxlPlxcclxcblxcclxcblxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImxvYWRlckNvbnRhaW5lclxcXCI+XFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJsZHMtcmluZ1xcXCI+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImxvYWRpbmctdGV4dFxcXCI+XFxyXFxuICAgIGRpdGhlcmluZy4uXFxyXFxuICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48c2NyaXB0Plxcclxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xcclxcbi8vL1xcclxcbi8vLyAgIFxcclxcbi8vL1xcclxcbi8vL1xcclxcbi8vL1xcclxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFdFQiBXT1JLRVIgc2NyaXB0IGluIHN0cmluZy4uLlxcclxcblxcclxcbi8vIFRoZSBjb2RlIGNvbnRhaW5lZCBpbiB0aGlzIHN0cmluZyBpcyB0aGUgYWN0dWFsIGxvZ2ljcyB0byBtYW5pcHVsYXRlICBjYW52YXMgaW1hZ2VcXHJcXG4vLyBhbmQgY2Fycnkgb3V0IHRoZSBkaXRoZXJpbmcgZWZmZWN0Li5cXHJcXG5cXHJcXG5jb25zdCB3b3JrZXJTY3JpcHQgPSBgXFxyXFxuICAvLyBDb252ZXJ0IGltYWdlIGRhdGEgdG8gZ3JleXNjYWxlIGJhc2VkIG9uIGx1bWluYW5jZS5cXHJcXG5mdW5jdGlvbiBncmV5c2NhbGVfbHVtaW5hbmNlKGltYWdlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDJdID0gcGFyc2VJbnQoXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpXSAqIDAuMjEgK1xcclxcbiAgICAgICAgICAgIGltYWdlLmRhdGFbaSArIDFdICogMC43MSArXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpICsgMl0gKiAwLjA3LFxcclxcbiAgICAgICAgICAgIDEwXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBpbWFnZTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ29udmVydCBpbWFnZSBkYXRhIHRvIGdyZXlzY2FsZSBiYXNlZCBvbiBhdmVyYWdlIG9mIFIsIEcgYW5kIEIgdmFsdWVzLlxcclxcbmZ1bmN0aW9uIGdyZXlzY2FsZV9hdmVyYWdlKGltYWdlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDJdID0gcGFyc2VJbnQoXFxyXFxuICAgICAgICAgICAgKGltYWdlLmRhdGFbaV0gKyBpbWFnZS5kYXRhW2kgKyAxXSArIGltYWdlLmRhdGFbaSArIDJdKSAvIDMsXFxyXFxuICAgICAgICAgICAgMTBcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGltYWdlO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBBcHBseSBBdGtpbnNvbiBEaXRoZXIgdG8gSW1hZ2UgRGF0YVxcclxcbmZ1bmN0aW9uIGRpdGhlcl9hdGtpbnNvbihpbWFnZSwgaW1hZ2VXaWR0aCwgZHJhd0NvbG91cikge1xcclxcbiAgICBza2lwUGl4ZWxzID0gNDtcXHJcXG5cXHJcXG4gICAgaWYgKCFkcmF3Q29sb3VyKSBkcmF3Q29sb3VyID0gZmFsc2U7XFxyXFxuXFxyXFxuICAgIGlmIChkcmF3Q29sb3VyID09IHRydWUpIHNraXBQaXhlbHMgPSAxO1xcclxcblxcclxcbiAgICBpbWFnZUxlbmd0aCA9IGltYWdlLmRhdGEubGVuZ3RoO1xcclxcblxcclxcbiAgICBmb3IgKFxcclxcbiAgICAgICAgY3VycmVudFBpeGVsID0gMDtcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCA8PSBpbWFnZUxlbmd0aDtcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCArPSBza2lwUGl4ZWxzXFxyXFxuICAgICkge1xcclxcbiAgICAgICAgaWYgKGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSA8PSAxMjgpIHtcXHJcXG4gICAgICAgICAgICBuZXdQaXhlbENvbG91ciA9IDA7XFxyXFxuICAgICAgICB9IGVsc2Uge1xcclxcbiAgICAgICAgICAgIG5ld1BpeGVsQ29sb3VyID0gMjU1O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZXJyID0gcGFyc2VJbnQoKGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSAtIG5ld1BpeGVsQ29sb3VyKSAvIDgsIDEwKTtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSA9IG5ld1BpeGVsQ29sb3VyO1xcclxcblxcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDhdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGggLSA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoXSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoICsgNF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA4ICogaW1hZ2VXaWR0aF0gKz0gZXJyO1xcclxcblxcclxcbiAgICAgICAgaWYgKGRyYXdDb2xvdXIgPT0gZmFsc2UpXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyAxXSA9IGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgMl0gPVxcclxcbiAgICAgICAgICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbF07XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgcmV0dXJuIGltYWdlLmRhdGE7XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIGRpdGhlcl90aHJlc2hvbGQoaW1hZ2UsIHRocmVzaG9sZF92YWx1ZSkge1xcclxcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbWFnZS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2ldID0gaW1hZ2UuZGF0YVtpXSA+IHRocmVzaG9sZF92YWx1ZSA/IDI1NSA6IDA7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDFdID4gdGhyZXNob2xkX3ZhbHVlID8gMjU1IDogMDtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDJdID0gaW1hZ2UuZGF0YVtpICsgMl0gPiB0aHJlc2hvbGRfdmFsdWUgPyAyNTUgOiAwO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIHJlcGxhY2VfY29sb3VycyhpbWFnZSwgYmxhY2ssIHdoaXRlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2ldIDwgMTI3ID8gYmxhY2suciA6IHdoaXRlLnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDFdIDwgMTI3ID8gYmxhY2suZyA6IHdoaXRlLmc7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAyXSA9IGltYWdlLmRhdGFbaSArIDJdIDwgMTI3ID8gYmxhY2suYiA6IHdoaXRlLmI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAzXSA9XFxyXFxuICAgICAgICAgICAgKGltYWdlLmRhdGFbaV0gKyBpbWFnZS5kYXRhW2kgKyAxXSArIGltYWdlLmRhdGFbaSArIDJdKSAvIDMgPCAxMjdcXHJcXG4gICAgICAgICAgICAgICAgPyBibGFjay5hXFxyXFxuICAgICAgICAgICAgICAgIDogd2hpdGUuYTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5mdW5jdGlvbiBkaXRoZXIoZGF0YSkge1xcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiTHVtaW5hbmNlXFxcIikge1xcclxcbiAgICAgICAgZ3JleXNjYWxlX2x1bWluYW5jZShkYXRhLmltYWdlLmRhdGEpO1xcclxcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIlJHQiBBdmVyYWdlXFxcIikge1xcclxcbiAgICAgICAgZ3JleXNjYWxlX2F2ZXJhZ2UoZGF0YS5pbWFnZS5kYXRhKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLmRpdGhlck1ldGhvZCA9PSBcXFwiQXRraW5zb24gRGl0aGVyaW5nXFxcIikge1xcclxcbiAgICAgICAgZGl0aGVyX2F0a2luc29uKFxcclxcbiAgICAgICAgICAgIGRhdGEuaW1hZ2UuZGF0YSxcXHJcXG4gICAgICAgICAgICBkYXRhLmltYWdlLndpZHRoLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIkRpc2FibGVkXFxcIlxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb2Nlc3NpbmcuZGl0aGVyTWV0aG9kID09IFxcXCJUaHJlc2hvbGRcXFwiKSB7XFxyXFxuICAgICAgICBkaXRoZXJfdGhyZXNob2xkKGRhdGEuaW1hZ2UuZGF0YSwgZGF0YS5wcm9jZXNzaW5nLmRpdGhlclRocmVzaG9sZCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaWYgKGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VycyA9PSB0cnVlKSB7XFxyXFxuICAgICAgICByZXBsYWNlX2NvbG91cnMoXFxyXFxuICAgICAgICAgICAgZGF0YS5pbWFnZS5kYXRhLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VyTWFwLmJsYWNrLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VyTWFwLndoaXRlXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBkYXRhO1xcclxcbn1cXHJcXG5cXHJcXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXFxcIm1lc3NhZ2VcXFwiLCBmdW5jdGlvbiAoZSkgeyBzZWxmLnBvc3RNZXNzYWdlKGRpdGhlcihlLmRhdGEpKTsgfSwgZmFsc2UpO1xcclxcbiAgYDtcXHJcXG5cXHJcXG4gIC8vIFNpbmNlIHdlIGNhbm5vdCBsb2FkIGV4dGVybmFsIHNjcmlwdCBidXQgd2Vid29ya2VyIG5lZWRzIGEgVVJMXFxyXFxuICAvLyBjb252ZXJ0IHRoZSBjb2RlIHRoYW4gaXMgbWVhbnQgdG8gcnVuIGluIHRoZSB3ZWJ3b3JrZXIgdG9cXHJcXG4gIC8vIFVSTCBCTE9CIGFuZCBwYXNzIGl0IGludG8gdGhlIHdlYndvcmtlci5cXHJcXG4gIC8vIE5lYXQgdHJpY2s6XFxyXFxuXFxyXFxuICBmdW5jdGlvbiBsb2FkV2ViV29ya2VyKHNjcmlwdCkge1xcclxcbiAgICByZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzY3JpcHRdKSkpO1xcclxcbiAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gTE9HSUNTIGZvciBqb2IgcHJvY2Vzc2luZ1xcclxcbiAgLy8vLy8gRW50cnkgcG9pbnQgdG8gZGl0aGVyaW5nIG9mIHRoZSBwcm92aWRlZCBpbWFnZSBqb2JzIC4uLlxcclxcblxcclxcblxcclxcbiAgLy8gRW5jb2RpbmcgYW4gaW1hZ2UgaXMgYWxzbyBkb25lIGJ5IHN0aWNraW5nIHBpeGVscyBpbiBhblxcclxcbiAgLy8gSFRNTCBjYW52YXMgYW5kIGJ5IGFza2luZyB0aGUgY2FudmFzIHRvIHNlcmlhbGl6ZSBpdCBpbnRvXFxyXFxuICAvLyBhbiBhY3R1YWwgUE5HIGZpbGUgdmlhIGNhbnZhcy50b0Jsb2IoKS5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIGVuY29kZShjYW52YXMsIGN0eCwgaW1hZ2VEYXRhKSB7XFxyXFxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxcclxcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xcclxcbiAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XFxyXFxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXFxyXFxuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4gcmVzb2x2ZShuZXcgVWludDhBcnJheShyZWFkZXIucmVzdWx0KSlcXHJcXG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignQ291bGQgbm90IHJlYWQgZnJvbSBibG9iJykpXFxyXFxuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcXHJcXG4gICAgICB9KVxcclxcbiAgICB9KVxcclxcbiAgfVxcclxcblxcclxcbiAgLy8gRGVjb2RpbmcgYW4gaW1hZ2UgY2FuIGJlIGRvbmUgYnkgc3RpY2tpbmcgaXQgaW4gYW4gSFRNTFxcclxcbiAgLy8gY2FudmFzLCBhcyB3ZSBjYW4gcmVhZCBpbmRpdmlkdWFsIHBpeGVscyBvZmYgdGhlIGNhbnZhcy5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIGRlY29kZShjYW52YXMsIGN0eCwgYnl0ZXMpIHtcXHJcXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYnl0ZXNdKSlcXHJcXG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcXHJcXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpXFxyXFxuICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoKVxcclxcbiAgICAgIGltZy5zcmMgPSB1cmxcXHJcXG4gICAgfSlcXHJcXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGhcXHJcXG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodFxcclxcbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwKVxcclxcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpXFxyXFxuICAgIHJldHVybiB7XFxyXFxuICAgICAgaW1hZ2VEYXRhOiBpbWFnZURhdGEsXFxyXFxuICAgICAgd2lkdGg6IGltYWdlLndpZHRoLFxcclxcbiAgICAgIGhlaWdodDogaW1hZ2Uud2lkdGhcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gMS4gU3BpbiBvbiBvdXIgbWFnaW5maWNpZW50IHdlYndvcmtlciAuLi5cXHJcXG4gIHdpbmRvdy5ESVRIRVJfV09SS0VSID0gbG9hZFdlYldvcmtlcih3b3JrZXJTY3JpcHQpO1xcclxcblxcclxcblxcclxcbiAgLy8vLy8vLyAyLiBDaGlsbCwgdGlsbCB0aGUgdXNlciBzZW5kcyBhIGpvYi4uLi5cXHJcXG4gIC8vIENyZWF0ZSBhbiBldmVudCBoYW5kbGVyIHRvIHJlY2VpdmUgbWVzc2FnZXMgZnJvbSB0aGUgbWFpblxcclxcbiAgLy8gdGhyZWFkLlxcclxcbiAgd2luZG93Lm9ubWVzc2FnZSA9IGFzeW5jIGV2ZW50ID0+IHtcXHJcXG4gICAgLy8gSnVzdCBnZXQgdGhlIGJ5dGVzIGRpcmVjdGx5IGZyb20gdGhlIHBsdWdpbk1lc3NhZ2Ugc2luY2VcXHJcXG4gICAgLy8gdGhhdCdzIHRoZSBvbmx5IHR5cGUgb2YgbWVzc2FnZSB3ZSdsbCByZWNlaXZlIGluIHRoaXNcXHJcXG4gICAgLy8gcGx1Z2luLiBJbiBtb3JlIGNvbXBsZXggcGx1Z2lucywgeW91J2xsIHdhbnQgdG8gY2hlY2sgdGhlXFxyXFxuICAgIC8vIHR5cGUgb2YgdGhlIG1lc3NhZ2UuXFxyXFxuXFxyXFxuICAgIC8vIGNvbnRhaW4gdGhlIHByb2Nlc3NlZCAoZGl0aGVyZWQpIGltYWdlYnl0ZXMuLi5cXHJcXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xcclxcbiAgICBcXHJcXG4gICAgLy8gID0+IFRha2UgYSBsb29rIGF0IHRoZSBzZW50IGRhdGEuXFxyXFxuICAgIGNvbnN0IHJlY3ZlZERhdGEgPSBldmVudC5kYXRhLnBsdWdpbk1lc3NhZ2U7XFxyXFxuXFxyXFxuICAgIC8vIEV4dHJhY3QgdGhlIGpvYnMuLlxcclxcbiAgICBjb25zdCBqb2JzID0gcmVjdmVkRGF0YS5qb2JzO1xcclxcblxcclxcbiAgICAvLyBXZSBwcm9jZXNzIHRoZSBqb2Igb25lIGFmdGVyIHRoZSBvdGhlci4uLlxcclxcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSB7XFxyXFxuXFxyXFxuICAgICAgLy8geWVhaCB3ZSBuZWVkIHRvIHJlc2xvdmUgdHdvIHByb21pc2VzIGJlZm9yZSB3ZSBwcm9jZWVkIHRvIHRoZSBuZXh0IGpvYlxcclxcbiAgICAgIHJlc3VsdHMucHVzaCh7XFxyXFxuICAgICAgICBpbWFnZUJ5dGVzOiBhd2FpdCAoYXdhaXQgcHJvY2Vzc0RpdGhlcihqb2IsIHJlY3ZlZERhdGEub3B0aW9ucykpLFxcclxcbiAgICAgICAgZmlsbERhdGE6IGpvYi5maWxsRGF0YVxcclxcbiAgICAgIH0pO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC8vIFNpbmNlIHdlIGFyZSBjb21wbGV0ZWx5IGRvbmUgd2l0aCBvdXIgam9icywga2lsbCB0aGUgV2Vid29ya2VyLi4uXFxyXFxuICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnRlcm1pbmF0ZSgpO1xcclxcblxcclxcbiAgICAvLyBTZW5kIHRoZSByZXN1bHQgYmFjayB0byB0aGUgVXNlci4uXFxyXFxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xcclxcbiAgICAgIHBsdWdpbk1lc3NhZ2U6IHJlc3VsdHNcXHJcXG4gICAgfSwgXFxcIipcXFwiKTtcXHJcXG4gIH07XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8gMy4gVGhpcyBtZXRob2Qgc2VuZHMgYSBqb2IgcmVxdWVzdCB0byB0aGUgd2ViIHdvcmtlciBhbmQgd2FpdCB0aWxsIHNvbWV0aGluZyBoYXBwZW5zLi5cXHJcXG5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NEaXRoZXIoam9iLCBvcHRpb25zKSB7XFxyXFxuICAgIGNvbnN0IGJ5dGVzID0gam9iLmltYWdlQnl0ZXM7XFxyXFxuXFxyXFxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXFxcImNhbnZhc1xcXCIpO1xcclxcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcXFwiMmRcXFwiKTtcXHJcXG5cXHJcXG4gICAgY29uc3QgaW1hZ2VEZXRhaWxzID0gYXdhaXQgZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcyk7XFxyXFxuICAgIC8vIGNvbnNvbGUubG9nKGltYWdlRGV0YWlscyk7XFxyXFxuICAgIGNvbnN0IHByZXNldCA9IHtcXHJcXG4gICAgICBpbWFnZToge1xcclxcbiAgICAgICAgZGF0YTogaW1hZ2VEZXRhaWxzLmltYWdlRGF0YSxcXHJcXG4gICAgICAgIHdpZHRoOiBpbWFnZURldGFpbHMud2lkdGgsXFxyXFxuICAgICAgICBoZWlnaHQ6IGltYWdlRGV0YWlscy5oZWlnaHRcXHJcXG4gICAgICB9LFxcclxcbiAgICAgIHByb2Nlc3Npbmc6IHtcXHJcXG4gICAgICAgIGdyZXlzY2FsZU1ldGhvZDogb3B0aW9ucy5ncmV5c2NhbGVfbWV0aG9kLFxcclxcbiAgICAgICAgZGl0aGVyTWV0aG9kOiBvcHRpb25zLmRpdGhlcl9tZXRob2QsXFxyXFxuICAgICAgICBkaXRoZXJUaHJlc2hvbGQ6IG9wdGlvbnMudGhyZXNob2xkLFxcclxcbiAgICAgICAgcmVwbGFjZUNvbG91cnM6IG9wdGlvbnMuY2hrX3JlcGxhY2VfY29sb3VycyxcXHJcXG4gICAgICAgIHJlcGxhY2VDb2xvdXJNYXA6IHtcXHJcXG4gICAgICAgICAgYmxhY2s6IHtcXHJcXG4gICAgICAgICAgICByOiBvcHRpb25zLnJlcF9ibGFja1swXSxcXHJcXG4gICAgICAgICAgICBnOiBvcHRpb25zLnJlcF9ibGFja1sxXSxcXHJcXG4gICAgICAgICAgICBiOiBvcHRpb25zLnJlcF9ibGFja1syXSxcXHJcXG4gICAgICAgICAgICBhOiBvcHRpb25zLnJlcF9ibGFja1szXVxcclxcbiAgICAgICAgICB9LFxcclxcbiAgICAgICAgICB3aGl0ZToge1xcclxcbiAgICAgICAgICAgIHI6IG9wdGlvbnMucmVwX3doaXRlWzBdLFxcclxcbiAgICAgICAgICAgIGc6IG9wdGlvbnMucmVwX3doaXRlWzFdLFxcclxcbiAgICAgICAgICAgIGI6IG9wdGlvbnMucmVwX3doaXRlWzJdLFxcclxcbiAgICAgICAgICAgIGE6IG9wdGlvbnMucmVwX3doaXRlWzNdXFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgIH07XFxyXFxuXFxyXFxuICAgIC8vIFN0YXJ0IHRpbWVyIHRvIHRyYWNrIHRoZSB0aW1lIHRoYXQgaXMgc3BlbnQgb24gdGhpcyBjdXJyZW50IGpvYiAuLi5cXHJcXG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRpbWUpIHtcXHJcXG4gICAgICBjb25zb2xlLmxvZyhcXFwiU3RhcnRpbmcgV2ViIFdvcmtlciBmb3IgaW1hZ2UgKFxcXCIgKyBpbWFnZURldGFpbHMud2lkdGggKyBcXFwieFxcXCIgKyBpbWFnZURldGFpbHMuaGVpZ2h0ICtcXHJcXG4gICAgICAgIFxcXCIsIEdyZXlzY2FsZSBNZXRob2Q6IFxcXCIgKyBvcHRpb25zLmdyZXlzY2FsZV9tZXRob2QgKyBcXFwiLCBEaXRoZXIgTWV0aG9kOiBcXFwiICsgb3B0aW9ucy5kaXRoZXJfbWV0aG9kICsgXFxcIilcXFwiKTtcXHJcXG4gICAgICBjb25zb2xlLnRpbWUoXFxcIldlYiB3b3JrZXIgdG9va1xcXCIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC8vIFNlbmQgam9iIHRvIHdlYndvcmtlclxcclxcbiAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5wb3N0TWVzc2FnZShwcmVzZXQpO1xcclxcblxcclxcbiAgICAvLyBOT1RJQ0U6IEhlcmUgdG8gYXZvaWQgbWVtb3J5IGxlYWtzLCB3ZSBhcmUgdXNpbmcgYSBvbmUgdGltZSBldmVudCBsaXN0bmVyLi5cXHJcXG4gICAgLy8gdGhlcmVmb3JlIGVhY2ggam9iIGFwcGxpZXMgYW4gZXZlbnQgbGlzdG5lciB0byB0aGUgd29ya2VyIGFuZCBvbmNlIHRoZSB3b3JrZXJzPVxcclxcbiAgICAvLyBzZW5kcyB0aGUgcmVzdWx0IGJhY2ssIHdlIGRpc3Bvc2UvdW5yZWdpc3RlciB0aGUgZXZlbnQgbGlzdG5lci4uLlxcclxcblxcclxcbiAgICBjb25zdCB3b3JrZXJSZXN1bHQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XFxyXFxuICAgICAgLy8gR2V0IHJlcGx5IGZyb20gd2Vid29ya2VyXFxyXFxuICAgICAgY29uc3Qgb25lVGltZUxpc3RlbiA9IGZ1bmN0aW9uIChlKSB7XFxyXFxuICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzdWx0JywgZSk7XFxyXFxuICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUudGltZSkge1xcclxcbiAgICAgICAgICBjb25zb2xlLnRpbWVFbmQoXFxcIldlYiB3b3JrZXIgdG9va1xcXCIpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZS5kYXRhO1xcclxcbiAgICAgICAgZW5jb2RlKGNhbnZhcywgY3R4LCByZXN1bHQuaW1hZ2UuZGF0YSkudGhlbihuZXdCeXRlcyA9PiB7XFxyXFxuXFxyXFxuICAgICAgICAgIC8vIG1ha2UgaXQgYSBvbmUgdGltZSBldmVudCBsaXN0bmVyLi4uXFxyXFxuICAgICAgICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbmVUaW1lTGlzdGVuKTtcXHJcXG4gICAgICAgICAgcmVzb2x2ZShuZXdCeXRlcyk7XFxyXFxuICAgICAgICB9KTtcXHJcXG4gICAgICB9O1xcclxcblxcclxcbiAgICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbmVUaW1lTGlzdGVuLCBmYWxzZSk7XFxyXFxuICAgIH0pO1xcclxcblxcclxcbiAgICByZXR1cm4gd29ya2VyUmVzdWx0O1xcclxcbiAgfVxcclxcbjwvc2NyaXB0PlwiIl0sInNvdXJjZVJvb3QiOiIifQ==