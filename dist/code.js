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
if (Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["filterNodesWithFills"])(figma.currentPage.selection).length == 0) {
    figma.notify('Figma Dither: Please select at lease one item with image fill.');
    figma.closePlugin();
}
else {
    let previewNode;
    if (Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["multipleSelections"])()) {
        figma.notify('Figma Dither: More than one selection disables live preview.');
    }
    else {
        previewNode = figma.currentPage.selection[0].clone();
    }
    // This shows the HTML page in "ui.html".
    figma.showUI(__html__, { height: 500, width: 270 });
    // send preview image bytes to the ui
    let firstImagefillsDataOnPreview = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getImageFillsFromNode"])(previewNode)[0];
    Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getImageBytes"])(firstImagefillsDataOnPreview.imageFill).then(bytes => {
        figma.ui.postMessage({ imageBytes: bytes, type: 'preview-node-image-bytes' });
    });
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
                    Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["closePlugin"])(previewNode);
                });
            }
        }
        if (msg.type === "dither-image-preview") {
            // DoImageDither([previewNode], msg.options, true)
            //   .then(function () {
            //     ///
            //   });
            //apply the effect to the previewNode
        }
        if (msg.type === "cancel") {
            Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["closePlugin"])(previewNode);
        }
        if (msg.type == "processed-preview-imagebytes") {
            console.log('processed bytes', msg.imageBytes);
            // apply processed image to preview node..
            const result = {
                fillData: firstImagefillsDataOnPreview,
                imageBytes: msg.imageBytes
            };
            Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["applyProcessResults"])([result], [firstImagefillsDataOnPreview], false, () => {
                console.log('preview result applied!');
            });
        }
        // if(msg.type == 'user-closed-plugin')
        // {
        //   closePlugin(previewNode);
        // }
        // Make sure to close the plugin when you're done. Otherwise the plugin will
        // keep running, which shows the cancel button at the bottom of the screen.
    };
}


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
/*! exports provided: getCurrentSelections, filterNodesWithFills, getImageFillsFromNode, getImageBytes, addTaskToPool, processJobs, BytesToImagePaintHashImage, DoImageDither, applyProcessResults, multipleSelections, closePlugin */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyProcessResults", function() { return applyProcessResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multipleSelections", function() { return multipleSelections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closePlugin", function() { return closePlugin; });
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
 * Filters nodes that have Image fills.
 * @param  {readonlySceneNode[]} nodes
 * @returns SceneNode
 */
function filterNodesWithFills(nodes) {
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
function multipleSelections() {
    const selection = figma.currentPage.selection;
    return (selection.length == 1) ? false : true;
}
function closePlugin(previewNode) {
    if (previewNode)
        previewNode.remove();
    figma.closePlugin();
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
/* harmony default export */ __webpack_exports__["default"] = ("<style>\r\n  body,\r\n  html {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  body {\r\n    display: flex;\r\n  }\r\n\r\n  * {\r\n    user-select: none;\r\n  }\r\n\r\n  .loaderContainer {\r\n    margin: auto;\r\n    text-align: center;\r\n    height: 55px;\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n\r\n  .lds-ring {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 64px;\r\n    height: 64px;\r\n    transform: scale(.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n\r\n  .loading-text {\r\n    font-family: sans-serif;\r\n    font-size: 11px;\r\n    text-align: center;\r\n    color: #555;\r\n  }\r\n\r\n  .lds-ring div {\r\n    box-sizing: border-box;\r\n    display: block;\r\n    position: absolute;\r\n    width: 51px;\r\n    height: 51px;\r\n    border: 6px solid #00aced;\r\n    border-radius: 50%;\r\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n    border-color: #00aced transparent transparent transparent;\r\n  }\r\n\r\n  .lds-ring div:nth-child(1) {\r\n    animation-delay: -0.45s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(2) {\r\n    animation-delay: -0.3s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(3) {\r\n    animation-delay: -0.15s;\r\n  }\r\n\r\n  @keyframes lds-ring {\r\n    0% {\r\n      transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n</style>\r\n\r\n\r\n\r\n<div class=\"loaderContainer\">\r\n  <div class=\"lds-ring\">\r\n    <div></div>\r\n    <div></div>\r\n    <div></div>\r\n    <div></div>\r\n  </div>\r\n  <div class=\"loading-text\">\r\n    dithering..\r\n  </div>\r\n</div>\r\n\r\n<script>    \r\n//////////////////////////////////////////////// WEB WORKER script in string...\r\n\r\n  // The code contained in this string is the actual logics to manipulate  canvas image\r\n  // and carry out the dithering effect..\r\n\r\n  const workerScript = `\r\n  // Convert image data to greyscale based on luminance.\r\nfunction greyscale_luminance(image) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(\r\n            image.data[i] * 0.21 +\r\n            image.data[i + 1] * 0.71 +\r\n            image.data[i + 2] * 0.07,\r\n            10\r\n        );\r\n    }\r\n    return image;\r\n}\r\n\r\n// Convert image data to greyscale based on average of R, G and B values.\r\nfunction greyscale_average(image) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i + 1] = image.data[i + 2] = parseInt(\r\n            (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3,\r\n            10\r\n        );\r\n    }\r\n    return image;\r\n}\r\n\r\n// Apply Atkinson Dither to Image Data\r\nfunction dither_atkinson(image, imageWidth, drawColour) {\r\n    skipPixels = 4;\r\n\r\n    if (!drawColour) drawColour = false;\r\n\r\n    if (drawColour == true) skipPixels = 1;\r\n\r\n    imageLength = image.data.length;\r\n\r\n    for (\r\n        currentPixel = 0;\r\n        currentPixel <= imageLength;\r\n        currentPixel += skipPixels\r\n    ) {\r\n        if (image.data[currentPixel] <= 128) {\r\n            newPixelColour = 0;\r\n        } else {\r\n            newPixelColour = 255;\r\n        }\r\n\r\n        err = parseInt((image.data[currentPixel] - newPixelColour) / 8, 10);\r\n        image.data[currentPixel] = newPixelColour;\r\n\r\n        image.data[currentPixel + 4] += err;\r\n        image.data[currentPixel + 8] += err;\r\n        image.data[currentPixel + 4 * imageWidth - 4] += err;\r\n        image.data[currentPixel + 4 * imageWidth] += err;\r\n        image.data[currentPixel + 4 * imageWidth + 4] += err;\r\n        image.data[currentPixel + 8 * imageWidth] += err;\r\n\r\n        if (drawColour == false)\r\n            image.data[currentPixel + 1] = image.data[currentPixel + 2] =\r\n                image.data[currentPixel];\r\n    }\r\n\r\n    return image.data;\r\n}\r\n\r\nfunction dither_threshold(image, threshold_value) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i] > threshold_value ? 255 : 0;\r\n        image.data[i + 1] = image.data[i + 1] > threshold_value ? 255 : 0;\r\n        image.data[i + 2] = image.data[i + 2] > threshold_value ? 255 : 0;\r\n    }\r\n}\r\n\r\nfunction replace_colours(image, black, white) {\r\n    for (var i = 0; i <= image.data.length; i += 4) {\r\n        image.data[i] = image.data[i] < 127 ? black.r : white.r;\r\n        image.data[i + 1] = image.data[i + 1] < 127 ? black.g : white.g;\r\n        image.data[i + 2] = image.data[i + 2] < 127 ? black.b : white.b;\r\n        image.data[i + 3] =\r\n            (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3 < 127\r\n                ? black.a\r\n                : white.a;\r\n    }\r\n}\r\n\r\nfunction dither(data) {\r\n    if (data.processing.greyscaleMethod == \"Luminance\") {\r\n        greyscale_luminance(data.image.data);\r\n    } else if (data.processing.greyscaleMethod == \"RGB Average\") {\r\n        greyscale_average(data.image.data);\r\n    }\r\n\r\n    if (data.processing.ditherMethod == \"Atkinson Dithering\") {\r\n        dither_atkinson(\r\n            data.image.data,\r\n            data.image.width,\r\n            data.processing.greyscaleMethod == \"Disabled\"\r\n        );\r\n    } else if (data.processing.ditherMethod == \"Threshold\") {\r\n        dither_threshold(data.image.data, data.processing.ditherThreshold);\r\n    }\r\n\r\n    if (data.processing.replaceColours == true) {\r\n        replace_colours(\r\n            data.image.data,\r\n            data.processing.replaceColourMap.black,\r\n            data.processing.replaceColourMap.white\r\n        );\r\n    }\r\n    return data;\r\n}\r\n\r\nself.addEventListener(\"message\", function (e) { self.postMessage(dither(e.data)); }, false);\r\n  `;\r\n\r\n  // Since we cannot load external script but webworker needs a URL\r\n  // convert the code than is meant to run in the webworker to\r\n  // URL BLOB and pass it into the webworker.\r\n  // Neat trick:\r\n\r\n  function loadWebWorker(script) {\r\n    return new Worker(URL.createObjectURL(new Blob([script])));\r\n  }\r\n\r\n\r\n\r\n  ///////////////////////////////////////////////////// LOGICS for job processing\r\n  ///// Entry point to dithering of the provided image jobs ...\r\n\r\n\r\n  // Encoding an image is also done by sticking pixels in an\r\n  // HTML canvas and by asking the canvas to serialize it into\r\n  // an actual PNG file via canvas.toBlob().\r\n  async function encode(canvas, ctx, imageData) {\r\n    ctx.putImageData(imageData, 0, 0)\r\n    return await new Promise((resolve, reject) => {\r\n      canvas.toBlob(blob => {\r\n        const reader = new FileReader()\r\n        reader.onload = () => resolve(new Uint8Array(reader.result))\r\n        reader.onerror = () => reject(new Error('Could not read from blob'))\r\n        reader.readAsArrayBuffer(blob)\r\n      })\r\n    })\r\n  }\r\n\r\n  // Decoding an image can be done by sticking it in an HTML\r\n  // canvas, as we can read individual pixels off the canvas.\r\n  async function decode(canvas, ctx, bytes) {\r\n    const url = URL.createObjectURL(new Blob([bytes]))\r\n    const image = await new Promise((resolve, reject) => {\r\n      const img = new Image()\r\n      img.onload = () => resolve(img)\r\n      img.onerror = () => reject()\r\n      img.src = url\r\n    })\r\n    canvas.width = image.width\r\n    canvas.height = image.height\r\n    ctx.drawImage(image, 0, 0)\r\n    const imageData = ctx.getImageData(0, 0, image.width, image.height)\r\n    return {\r\n      imageData: imageData,\r\n      width: image.width,\r\n      height: image.width\r\n    }\r\n  }\r\n\r\n\r\n  /////////////////////// 1. Spin on our maginficient webworker ...\r\n  window.DITHER_WORKER = loadWebWorker(workerScript);\r\n\r\n\r\n  /////// 2. Chill, till the user sends a job....\r\n  // Create an event handler to receive messages from the main\r\n  // thread.\r\n  window.onmessage = async event => {\r\n    // Just get the bytes directly from the pluginMessage since\r\n    // that's the only type of message we'll receive in this\r\n    // plugin. In more complex plugins, you'll want to check the\r\n    // type of the message.\r\n\r\n    // contain the processed (dithered) imagebytes...\r\n    const results = [];\r\n\r\n    //  => Take a look at the sent data.\r\n    const recvedData = event.data.pluginMessage;\r\n\r\n    // Extract the jobs..\r\n    const jobs = recvedData.jobs;\r\n\r\n    // We process the job one after the other...\r\n    for (const job of jobs) {\r\n\r\n      // yeah we need to reslove two promises before we proceed to the next job\r\n      results.push({\r\n        imageBytes: await (await processDither(job, recvedData.options)),\r\n        fillData: job.fillData\r\n      });\r\n    }\r\n\r\n    // Since we are completely done with our jobs, kill the Webworker...\r\n    window.DITHER_WORKER.terminate();\r\n\r\n    // Send the result back to the User..\r\n    window.parent.postMessage({\r\n      pluginMessage: results\r\n    }, \"*\");\r\n  };\r\n\r\n\r\n  //////////// 3. This method sends a job request to the web worker and wait till something happens..\r\n\r\n  async function processDither(job, options) {\r\n    const bytes = job.imageBytes;\r\n\r\n    const canvas = document.createElement(\"canvas\");\r\n    const ctx = canvas.getContext(\"2d\");\r\n\r\n    const imageDetails = await decode(canvas, ctx, bytes);\r\n    // console.log(imageDetails);\r\n    const preset = {\r\n      image: {\r\n        data: imageDetails.imageData,\r\n        width: imageDetails.width,\r\n        height: imageDetails.height\r\n      },\r\n      processing: {\r\n        greyscaleMethod: options.greyscale_method,\r\n        ditherMethod: options.dither_method,\r\n        ditherThreshold: options.threshold,\r\n        replaceColours: options.chk_replace_colours,\r\n        replaceColourMap: {\r\n          black: {\r\n            r: options.rep_black[0],\r\n            g: options.rep_black[1],\r\n            b: options.rep_black[2],\r\n            a: options.rep_black[3]\r\n          },\r\n          white: {\r\n            r: options.rep_white[0],\r\n            g: options.rep_white[1],\r\n            b: options.rep_white[2],\r\n            a: options.rep_white[3]\r\n          }\r\n        }\r\n      }\r\n    };\r\n\r\n    // Start timer to track the time that is spent on this current job ...\r\n    if (window.console && window.console.time) {\r\n      console.log(\"Starting Web Worker for image (\" + imageDetails.width + \"x\" + imageDetails.height +\r\n        \", Greyscale Method: \" + options.greyscale_method + \", Dither Method: \" + options.dither_method + \")\");\r\n      console.time(\"Web worker took\");\r\n    }\r\n\r\n    // Send job to webworker\r\n    window.DITHER_WORKER.postMessage(preset);\r\n\r\n    // NOTICE: Here to avoid memory leaks, we are using a one time event listner..\r\n    // therefore each job applies an event listner to the worker and once the workers=\r\n    // sends the result back, we dispose/unregister the event listner...\r\n\r\n    const workerResult = new Promise(function (resolve, reject) {\r\n      // Get reply from webworker\r\n      const oneTimeListen = function (e) {\r\n        // console.log('result', e);\r\n        if (window.console && window.console.time) {\r\n          console.timeEnd(\"Web worker took\");\r\n        }\r\n        const result = e.data;\r\n        encode(canvas, ctx, result.image.data).then(newBytes => {\r\n\r\n          // make it a one time event listner...\r\n          window.DITHER_WORKER.removeEventListener('message', oneTimeListen);\r\n          resolve(newBytes);\r\n        });\r\n      };\r\n\r\n      window.DITHER_WORKER.addEventListener('message', oneTimeListen, false);\r\n    });\r\n\r\n    return workerResult;\r\n  }\r\n</script>");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBb0w7QUFDcEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdUVBQW9CO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFFQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3REO0FBQ0EsdUNBQXVDLHdFQUFxQjtBQUM1RCxJQUFJLGdFQUFhO0FBQ2pCLDhC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QStCLCtEQUErRCxpREFBaUQsU0FBUywrREFBK0QsK0NBQStDLFNBQVMseUVBQXlFLDBLQUEwSyxTQUFTLDBEQUEwRCwrRUFBK0UsU0FBUyx5REFBeUQsdUxBQXVMLFNBQVMsb0JBQW9CLEtBQUsseURBQXlELGtDQUFrQyxFQUFFLFNBQVMsUUFBUSw0UEFBNFAsbUVBQW1FLE9BQU8sbVpBQW1aLGdHQUFnRyxpQ0FBaUMsd1BBQXdQLFVBQVUsUUFBUSxzTEFBc0wsd0hBQXdILGdKQUFnSixvTUFBb00sa0dBQWtHLE9BQU8sd0lBQXdJLHdMQUF3TCw4VEFBOFQsb0dBQW9HLHNFQUFzRSx5RkFBeUYsK0dBQStHLDBIQUEwSCxFQUFFLFNBQVMseUhBQXlILG9GQUFvRix5Q0FBeUMsU0FBUyxRQUFRLHVLQUF1SyxxQ0FBcUMsOERBQThELDhDQUE4QyxrRUFBa0UscUNBQXFDLHdCQUF3QixrQkFBa0IsaUlBQWlJLHdCQUF3Qiw0T0FBNE8sc0JBQXNCLDhLQUE4Syx1QkFBdUIsOEtBQThLLGFBQWEsV0FBVyxVQUFVLHNJQUFzSSx1T0FBdU8sNENBQTRDLFNBQVMscUZBQXFGLHlVQUF5VSxtRkFBbUYsd0NBQXdDLHdEQUF3RCxtREFBbUQsYUFBYSxrQ0FBa0MscUVBQXFFLHlJQUF5SSxnQ0FBZ0MsYUFBYSxFQUFFLFlBQVkscUZBQXFGLFNBQVMsRUFBRSxnQ0FBZ0MsT0FBTyxjIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbnMsIGZpbHRlck5vZGVzV2l0aEZpbGxzLCBEb0ltYWdlRGl0aGVyLCBtdWx0aXBsZVNlbGVjdGlvbnMsIGNsb3NlUGx1Z2luLCBnZXRJbWFnZUJ5dGVzLCBnZXRJbWFnZUZpbGxzRnJvbU5vZGUsIGFwcGx5UHJvY2Vzc1Jlc3VsdHMgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcclxuLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgbW9kYWwgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbnVtYmVyLCBhbmRcclxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgcmVjdGFuZ2xlcyBvbiB0aGUgc2NyZWVuLlxyXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXHJcbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxyXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxyXG5pZiAoZmlsdGVyTm9kZXNXaXRoRmlsbHMoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKS5sZW5ndGggPT0gMCkge1xyXG4gICAgZmlnbWEubm90aWZ5KCdGaWdtYSBEaXRoZXI6IFBsZWFzZSBzZWxlY3QgYXQgbGVhc2Ugb25lIGl0ZW0gd2l0aCBpbWFnZSBmaWxsLicpO1xyXG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGxldCBwcmV2aWV3Tm9kZTtcclxuICAgIGlmIChtdWx0aXBsZVNlbGVjdGlvbnMoKSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeSgnRmlnbWEgRGl0aGVyOiBNb3JlIHRoYW4gb25lIHNlbGVjdGlvbiBkaXNhYmxlcyBsaXZlIHByZXZpZXcuJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBwcmV2aWV3Tm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogMjcwIH0pO1xyXG4gICAgLy8gc2VuZCBwcmV2aWV3IGltYWdlIGJ5dGVzIHRvIHRoZSB1aVxyXG4gICAgbGV0IGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXcgPSBnZXRJbWFnZUZpbGxzRnJvbU5vZGUocHJldmlld05vZGUpWzBdO1xyXG4gICAgZ2V0SW1hZ2VCeXRlcyhmaXJzdEltYWdlZmlsbHNEYXRhT25QcmV2aWV3LmltYWdlRmlsbCkudGhlbihieXRlcyA9PiB7XHJcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBpbWFnZUJ5dGVzOiBieXRlcywgdHlwZTogJ3ByZXZpZXctbm9kZS1pbWFnZS1ieXRlcycgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vIENhbGxzIHRvIFwicGFyZW50LnBvc3RNZXNzYWdlXCIgZnJvbSB3aXRoaW4gdGhlIEhUTUwgcGFnZSB3aWxsIHRyaWdnZXIgdGhpc1xyXG4gICAgLy8gY2FsbGJhY2suIFRoZSBjYWxsYmFjayB3aWxsIGJlIHBhc3NlZCB0aGUgXCJwbHVnaW5NZXNzYWdlXCIgcHJvcGVydHkgb2YgdGhlXHJcbiAgICAvLyBwb3N0ZWQgbWVzc2FnZS5cclxuICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICAgICAgaWYgKG1zZy50eXBlID09PSBcImRpdGhlci1pbWFnZVwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb25zID0gZmlsdGVyTm9kZXNXaXRoRmlsbHMoZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0aW9ucy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KCfwn5iFIFBsZWFzZSBzZWxlY3QgaXRlbShzKSB3aXRoIGltYWdlIGZpbGwnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnMsIG1zZy5vcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBsdWdpbihwcmV2aWV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwiZGl0aGVyLWltYWdlLXByZXZpZXdcIikge1xyXG4gICAgICAgICAgICAvLyBEb0ltYWdlRGl0aGVyKFtwcmV2aWV3Tm9kZV0sIG1zZy5vcHRpb25zLCB0cnVlKVxyXG4gICAgICAgICAgICAvLyAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vL1xyXG4gICAgICAgICAgICAvLyAgIH0pO1xyXG4gICAgICAgICAgICAvL2FwcGx5IHRoZSBlZmZlY3QgdG8gdGhlIHByZXZpZXdOb2RlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJjYW5jZWxcIikge1xyXG4gICAgICAgICAgICBjbG9zZVBsdWdpbihwcmV2aWV3Tm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PSBcInByb2Nlc3NlZC1wcmV2aWV3LWltYWdlYnl0ZXNcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygncHJvY2Vzc2VkIGJ5dGVzJywgbXNnLmltYWdlQnl0ZXMpO1xyXG4gICAgICAgICAgICAvLyBhcHBseSBwcm9jZXNzZWQgaW1hZ2UgdG8gcHJldmlldyBub2RlLi5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgZmlsbERhdGE6IGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXcsXHJcbiAgICAgICAgICAgICAgICBpbWFnZUJ5dGVzOiBtc2cuaW1hZ2VCeXRlc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhcHBseVByb2Nlc3NSZXN1bHRzKFtyZXN1bHRdLCBbZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlld10sIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJldmlldyByZXN1bHQgYXBwbGllZCEnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKG1zZy50eXBlID09ICd1c2VyLWNsb3NlZC1wbHVnaW4nKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgIGNsb3NlUGx1Z2luKHByZXZpZXdOb2RlKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxyXG4gICAgICAgIC8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxyXG4gICAgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUXVldWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc3RvcmUgPSBbXTtcclxuICAgIH1cclxuICAgIGVucXVldWUodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fc3RvcmUucHVzaCh2YWwpO1xyXG4gICAgfVxyXG4gICAgZGVxdWV1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmUuc2hpZnQoKTtcclxuICAgIH1cclxuICAgIHRvQXJyYXkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlO1xyXG4gICAgfVxyXG59XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgUXVldWUgfSBmcm9tICcuL1F1ZXVlJztcclxuaW1wb3J0IHdvcmtlclRlbXBsYXRlIGZyb20gJy4uL3dvcmtlci9lbnRyeS5odG1sJztcclxuLyoqXHJcbiAqIEdldHMgdGhlIGN1cnJlbnQgVXNlciBTZWxlY3Rpb24ocylcclxuICogQHJldHVybnMgcmVhZG9ubHkgU2NlbmVOb2RlW11cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50U2VsZWN0aW9ucygpIHtcclxuICAgIHJldHVybiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XHJcbn1cclxuLyoqXHJcbiAqIEZpbHRlcnMgbm9kZXMgdGhhdCBoYXZlIEltYWdlIGZpbGxzLlxyXG4gKiBAcGFyYW0gIHtyZWFkb25seVNjZW5lTm9kZVtdfSBub2Rlc1xyXG4gKiBAcmV0dXJucyBTY2VuZU5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJOb2Rlc1dpdGhGaWxscyhub2Rlcykge1xyXG4gICAgY29uc3Qgbm9kZVdpdGhGaWxscyA9IG5vZGVzLmZpbHRlcihub2RlID0+IHtcclxuICAgICAgICBpZiAoXCJmaWxsc1wiIGluIG5vZGUpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxsIG9mIG5vZGUuZmlsbHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBub2RlV2l0aEZpbGxzLmxlbmd0aCA9PSAwID8gW10gOiBub2RlV2l0aEZpbGxzO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBvYmplY3QgaXMgaXRlcmF0YWJsZVxyXG4gKiBAcGFyYW0gb2JqXHJcbiAqL1xyXG5mdW5jdGlvbiBfaXNJdGVyYWJsZShvYmopIHtcclxuICAgIC8vIGNoZWNrcyBmb3IgbnVsbCBhbmQgdW5kZWZpbmVkXHJcbiAgICBpZiAob2JqID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHlwZW9mIG9ialtTeW1ib2wuaXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCI7XHJcbn1cclxuLyoqXHJcbiAqIEdldHMgYWxsIEltYWdlIGZpbGxzIGZyb20gYSBub2RlLlxyXG4gKiBAcGFyYW0gIHtTY2VuZU5vZGV9IG5vZGUgTm9kZSB0byBleHRyYWN0IHRoZSBpbWFnZSBmaWxsc1xyXG4gKiBAcmV0dXJucyBJbWFnZUZpbGxEYXRhW10gQW4gYXJyYXkgb2YgaW1hZ2UgZmlsbHMgb2YgdGhlIG5vZGUgYXMgSW1hZ2VGaWxsRGF0YVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlRmlsbHNGcm9tTm9kZShub2RlKSB7XHJcbiAgICBjb25zdCByZXN1bHRpbmdJbWFnZUZpbGxzID0gW107XHJcbiAgICBsZXQgZmlsbHMgPSBub2RlLmZpbGxzO1xyXG4gICAgaWYgKF9pc0l0ZXJhYmxlKGZpbGxzKSkge1xyXG4gICAgICAgIGZpbGxzID0gZmlsbHM7XHJcbiAgICAgICAgZmlsbHMuZm9yRWFjaCgoZmlsbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGZpbGwudHlwZSA9PSBcIklNQUdFXCIpXHJcbiAgICAgICAgICAgICAgICByZXN1bHRpbmdJbWFnZUZpbGxzLnB1c2goeyBpbWFnZUZpbGw6IGZpbGwsIGluZGV4OiBpbmRleCwgbm9kZTogbm9kZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRpbmdJbWFnZUZpbGxzO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBJbWFnZUJ5dGVzIGZyb20gYSBJbWFnZVBhaW50IGZpbGxcclxuICogQHBhcmFtICB7SW1hZ2VQYWludH0gZmlsbFxyXG4gKiBAcmV0dXJucyBQcm9taXNlPFVpbnQ4QXJyYXk+XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VCeXRlcyhmaWxsKSB7XHJcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gZmlnbWEuZ2V0SW1hZ2VCeUhhc2goZmlsbC5pbWFnZUhhc2gpO1xyXG4gICAgICAgIGNvbnN0IGJ5dGVzID0geWllbGQgaW1hZ2UuZ2V0Qnl0ZXNBc3luYygpO1xyXG4gICAgICAgIHJldHVybiBieXRlcztcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBBZGRzIGEgam9iIHRvIHRoZSB0YXNrIHF1ZXVlXHJcbiAqIEBwYXJhbSAge2FueX0gdGFza1xyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhc2tUb1Bvb2wodGFzaywgcXVldWUpIHtcclxuICAgIHF1ZXVlLmVucXVldWUodGFzayk7XHJcbn1cclxuLyoqXHJcbiAqIFNwYXduIGEgd29ya2VyIHRvIHByb2Nlc3MgdGhlIHRhc2tzIGluIHRoZSB0YXNrIHF1ZXVlXHJcbiAqIEBwYXJhbSAge1F1ZXVlPGFueT59IHF1ZXVlIFRhc2sgcXVldWVcclxuICogQHJldHVybnMgUHJvbWlzZTxKb2JSZXN1bHRbXT4gUmV0dXJucyBhbiBhcnJheSBvZiBKb2JSZXN1bHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzSm9icyhxdWV1ZSwgb3B0aW9ucykge1xyXG4gICAgY29uc3Qgam9icyA9IHF1ZXVlLnRvQXJyYXkoKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiQWxsIGpvYnNcIiwgam9icyk7XHJcbiAgICAvLyBDcmVhdGUgYW4gaW52aXNpYmxlIGlmcmFtZSB0byBhY3QgYXMgYSBcIndvcmtlclwiIHdoaWNoXHJcbiAgICAvLyB3aWxsIGRvIHRoZSB0YXNrIG9mIGRlY29kaW5nIGFuZCBzZW5kIHVzIGEgbWVzc2FnZVxyXG4gICAgLy8gd2hlbiBpdCdzIGRvbmUuXHJcbiAgICBmaWdtYS5zaG93VUkod29ya2VyVGVtcGxhdGUsIHsgdmlzaWJsZTogdHJ1ZSwgd2lkdGg6IDIwMCwgaGVpZ2h0OiAxMjUgfSk7XHJcbiAgICAvLyBTZW5kIHRoZSByYXcgYnl0ZXMgb2YgdGhlIGZpbGUgdG8gdGhlIHdvcmtlci5cclxuICAgIC8vIGNvbnNvbGUubG9nKCdzZW50IScsIG9wdGlvbnMpO1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBqb2JzOiBqb2JzLCBvcHRpb25zOiBvcHRpb25zIH0pO1xyXG4gICAgLy8gV2FpdCBmb3IgdGhlIHdvcmtlcidzIHJlc3BvbnNlLlxyXG4gICAgY29uc3Qgam9ic1Jlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSB2YWx1ZSA9PiByZXNvbHZlKHZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGpvYnNSZXN1bHQ7XHJcbn1cclxuLyoqXHJcbiAqIENvbnZlcnRzIEltYWdlQnl0ZXMgdG8gSW1hZ2VIYXNoIGFuZCBhZGRzIHRvIEltYWdlUGFpbnRcclxuICogQHBhcmFtICB7VWludDhBcnJheX0gYnl0ZXMgIEltYWdlYnl0ZXMgdG8gY29udmVydFxyXG4gKiBAcGFyYW0gIHtJbWFnZVBhaW50fSBwYWludCBJbWFnZVBhaW50IHRvIGFkZCB0aGUgY29udmVydGVkIEltYWdlSGFzaFxyXG4gKiBAcmV0dXJucyBJbWFnZVBhaW50IFJldHVybnMgYSBuZXcgSW1hZ2VQYWludCB3aXRoIHRoZSBjb252ZXJ0ZWQgSW1hZ2VIYXNoIGFkZGVkIHRvIGl0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gQnl0ZXNUb0ltYWdlUGFpbnRIYXNoSW1hZ2UoYnl0ZXMsIHBhaW50KSB7XHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgcGFpbnQgZm9yIHRoZSBuZXcgaW1hZ2UuXHJcbiAgICBjb25zdCBuZXdQYWludCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGFpbnQpKTtcclxuICAgIG5ld1BhaW50LmltYWdlSGFzaCA9IGZpZ21hLmNyZWF0ZUltYWdlKGJ5dGVzKS5oYXNoO1xyXG4gICAgcmV0dXJuIG5ld1BhaW50O1xyXG59XHJcbi8qKlxyXG4gKiBDYXJyeSBvdXQgdGhlIGltYWdlIGRpdGhlcmluZyBwcm9jY2Vzc2VzLlxyXG4gKiBAcGFyYW0gIHtyZWFkb25seVNjZW5lTm9kZVtdfSBjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gRG9JbWFnZURpdGhlcihjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzLCBvcHRpb25zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCBUQVNLUyA9IG5ldyBRdWV1ZSgpO1xyXG4gICAgICAgIGxldCBub2RlRmlsbHMgPSBbXTtcclxuICAgICAgICBjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2Rlc1dpdGhJbWFnZUZpbGxzID0gZ2V0SW1hZ2VGaWxsc0Zyb21Ob2RlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZXNXaXRoSW1hZ2VGaWxscy5mb3JFYWNoKGZ1bmN0aW9uIChmaWxsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhcnJ5IG91dCBkaXRoZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VCeXRlcyA9IHlpZWxkIGdldEltYWdlQnl0ZXMoZmlsbERhdGEuaW1hZ2VGaWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUZpbGxzLnB1c2goZmlsbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRUYXNrVG9Qb29sKHsgaW1hZ2VCeXRlczogaW1hZ2VCeXRlcywgZmlsbERhdGE6IGZpbGxEYXRhIH0sIFRBU0tTKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gd2FpdCB0aWxsIGFsbCBqb2JzIGFyZSBhZGRlZC4uXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT0gY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQgcHJvY2Vzc2luZyBqb2JzLi5cclxuICAgICAgICAgICAgICAgICAgICBhcHBseVByb2Nlc3NSZXN1bHRzKHlpZWxkIHByb2Nlc3NKb2JzKFRBU0tTLCBvcHRpb25zKSwgbm9kZUZpbGxzLCBvcHRpb25zLmtlZXBfaW1hZ2UsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBBcHBsaWVzIHRoZSBwcm9jZXNzZWQgZGl0aGVyIGVmZmVjdCB0byBhcHByb3ByaWF0ZSBub2Rlc1xyXG4gKiBAcGFyYW0gIHtKb2JSZXN1bHRbXX0gcmVzdWx0c1xyXG4gKiBAcGFyYW0gIHtJbWFnZUZpbGxEYXRhW119IG5vZGVGaWxsc1xyXG4gKiBAcGFyYW0gIHtrZWVwfSBrZWVwSW1hZ2VGaWxscyBLZWVwcyB0aGUgb3JpZ2luYWwgaW1hZ2UgZmlsbCBpbnN0ZWFkIG9mIHJlcGxhY2luZyBpdC4uXHJcbiAqIEBwYXJhbSAge2FueX0gcmVzb2x2ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5UHJvY2Vzc1Jlc3VsdHMocmVzdWx0cywgbm9kZUZpbGxzLCBrZWVwSW1hZ2VGaWxscyA9IGZhbHNlLCByZXNvbHZlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhub2RlRmlsbHMpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2Nlc3NEaXRoZXJFZmZlY3QgPSBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShyZXN1bHQuaW1hZ2VCeXRlcywgcmVzdWx0LmZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgLy8gY2xvbmUgdGhlIG5vZGUgZmlsbHNcclxuICAgICAgICBjb25zdCBjb3B5Tm9kZUZpbGxzID0gWy4uLm5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxsc107XHJcbiAgICAgICAgaWYgKCFrZWVwSW1hZ2VGaWxscykge1xyXG4gICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBpbWFnZSBmaWx0ZXJcclxuICAgICAgICAgICAgY29weU5vZGVGaWxscy5zcGxpY2UocmVzdWx0LmZpbGxEYXRhLmluZGV4LCAxLCBwcm9jZXNzRGl0aGVyRWZmZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoZSBuZXcgaW1hZyBmaWx0ZXIgdG8gdGhlIHRvcC4uXHJcbiAgICAgICAgICAgIGNvcHlOb2RlRmlsbHMucHVzaChwcm9jZXNzRGl0aGVyRWZmZWN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZUZpbGxzW2luZGV4XS5ub2RlLmZpbGxzID0gY29weU5vZGVGaWxscztcclxuICAgIH0pO1xyXG4gICAgLy8gcmVzb2x2ZSB0aHJlIHByb21pc2UgYWZ0ZXIgYXBwbHlpbmcgZGl0aGVyaW5nIGVmZmVjdC5cclxuICAgIHJlc29sdmUoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbGVTZWxlY3Rpb25zKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG4gICAgcmV0dXJuIChzZWxlY3Rpb24ubGVuZ3RoID09IDEpID8gZmFsc2UgOiB0cnVlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVBsdWdpbihwcmV2aWV3Tm9kZSkge1xyXG4gICAgaWYgKHByZXZpZXdOb2RlKVxyXG4gICAgICAgIHByZXZpZXdOb2RlLnJlbW92ZSgpO1xyXG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBcIjxzdHlsZT5cXHJcXG4gIGJvZHksXFxyXFxuICBodG1sIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgfVxcclxcblxcclxcbiAgYm9keSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAqIHtcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubG9hZGVyQ29udGFpbmVyIHtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGhlaWdodDogNTVweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB3aWR0aDogNjRweDtcXHJcXG4gICAgaGVpZ2h0OiA2NHB4O1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKC41KTtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubG9hZGluZy10ZXh0IHtcXHJcXG4gICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTFweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBjb2xvcjogIzU1NTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXYge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB3aWR0aDogNTFweDtcXHJcXG4gICAgaGVpZ2h0OiA1MXB4O1xcclxcbiAgICBib3JkZXI6IDZweCBzb2xpZCAjMDBhY2VkO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIGFuaW1hdGlvbjogbGRzLXJpbmcgMS4ycyBjdWJpYy1iZXppZXIoMC41LCAwLCAwLjUsIDEpIGluZmluaXRlO1xcclxcbiAgICBib3JkZXItY29sb3I6ICMwMGFjZWQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgxKSB7XFxyXFxuICAgIGFuaW1hdGlvbi1kZWxheTogLTAuNDVzO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMikge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjNzO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMykge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjE1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBrZXlmcmFtZXMgbGRzLXJpbmcge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgMTAwJSB7XFxyXFxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbjwvc3R5bGU+XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuPGRpdiBjbGFzcz1cXFwibG9hZGVyQ29udGFpbmVyXFxcIj5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImxkcy1yaW5nXFxcIj5cXHJcXG4gICAgPGRpdj48L2Rpdj5cXHJcXG4gICAgPGRpdj48L2Rpdj5cXHJcXG4gICAgPGRpdj48L2Rpdj5cXHJcXG4gICAgPGRpdj48L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbiAgPGRpdiBjbGFzcz1cXFwibG9hZGluZy10ZXh0XFxcIj5cXHJcXG4gICAgZGl0aGVyaW5nLi5cXHJcXG4gIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblxcclxcbjxzY3JpcHQ+ICAgIFxcclxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBXRUIgV09SS0VSIHNjcmlwdCBpbiBzdHJpbmcuLi5cXHJcXG5cXHJcXG4gIC8vIFRoZSBjb2RlIGNvbnRhaW5lZCBpbiB0aGlzIHN0cmluZyBpcyB0aGUgYWN0dWFsIGxvZ2ljcyB0byBtYW5pcHVsYXRlICBjYW52YXMgaW1hZ2VcXHJcXG4gIC8vIGFuZCBjYXJyeSBvdXQgdGhlIGRpdGhlcmluZyBlZmZlY3QuLlxcclxcblxcclxcbiAgY29uc3Qgd29ya2VyU2NyaXB0ID0gYFxcclxcbiAgLy8gQ29udmVydCBpbWFnZSBkYXRhIHRvIGdyZXlzY2FsZSBiYXNlZCBvbiBsdW1pbmFuY2UuXFxyXFxuZnVuY3Rpb24gZ3JleXNjYWxlX2x1bWluYW5jZShpbWFnZSkge1xcclxcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbWFnZS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2ldID0gaW1hZ2UuZGF0YVtpICsgMV0gPSBpbWFnZS5kYXRhW2kgKyAyXSA9IHBhcnNlSW50KFxcclxcbiAgICAgICAgICAgIGltYWdlLmRhdGFbaV0gKiAwLjIxICtcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSAqIDAuNzEgK1xcclxcbiAgICAgICAgICAgIGltYWdlLmRhdGFbaSArIDJdICogMC4wNyxcXHJcXG4gICAgICAgICAgICAxMFxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfVxcclxcbiAgICByZXR1cm4gaW1hZ2U7XFxyXFxufVxcclxcblxcclxcbi8vIENvbnZlcnQgaW1hZ2UgZGF0YSB0byBncmV5c2NhbGUgYmFzZWQgb24gYXZlcmFnZSBvZiBSLCBHIGFuZCBCIHZhbHVlcy5cXHJcXG5mdW5jdGlvbiBncmV5c2NhbGVfYXZlcmFnZShpbWFnZSkge1xcclxcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbWFnZS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2ldID0gaW1hZ2UuZGF0YVtpICsgMV0gPSBpbWFnZS5kYXRhW2kgKyAyXSA9IHBhcnNlSW50KFxcclxcbiAgICAgICAgICAgIChpbWFnZS5kYXRhW2ldICsgaW1hZ2UuZGF0YVtpICsgMV0gKyBpbWFnZS5kYXRhW2kgKyAyXSkgLyAzLFxcclxcbiAgICAgICAgICAgIDEwXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBpbWFnZTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQXBwbHkgQXRraW5zb24gRGl0aGVyIHRvIEltYWdlIERhdGFcXHJcXG5mdW5jdGlvbiBkaXRoZXJfYXRraW5zb24oaW1hZ2UsIGltYWdlV2lkdGgsIGRyYXdDb2xvdXIpIHtcXHJcXG4gICAgc2tpcFBpeGVscyA9IDQ7XFxyXFxuXFxyXFxuICAgIGlmICghZHJhd0NvbG91cikgZHJhd0NvbG91ciA9IGZhbHNlO1xcclxcblxcclxcbiAgICBpZiAoZHJhd0NvbG91ciA9PSB0cnVlKSBza2lwUGl4ZWxzID0gMTtcXHJcXG5cXHJcXG4gICAgaW1hZ2VMZW5ndGggPSBpbWFnZS5kYXRhLmxlbmd0aDtcXHJcXG5cXHJcXG4gICAgZm9yIChcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCA9IDA7XFxyXFxuICAgICAgICBjdXJyZW50UGl4ZWwgPD0gaW1hZ2VMZW5ndGg7XFxyXFxuICAgICAgICBjdXJyZW50UGl4ZWwgKz0gc2tpcFBpeGVsc1xcclxcbiAgICApIHtcXHJcXG4gICAgICAgIGlmIChpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbF0gPD0gMTI4KSB7XFxyXFxuICAgICAgICAgICAgbmV3UGl4ZWxDb2xvdXIgPSAwO1xcclxcbiAgICAgICAgfSBlbHNlIHtcXHJcXG4gICAgICAgICAgICBuZXdQaXhlbENvbG91ciA9IDI1NTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGVyciA9IHBhcnNlSW50KChpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbF0gLSBuZXdQaXhlbENvbG91cikgLyA4LCAxMCk7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbF0gPSBuZXdQaXhlbENvbG91cjtcXHJcXG5cXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA4XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoIC0gNF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0ICogaW1hZ2VXaWR0aF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0ICogaW1hZ2VXaWR0aCArIDRdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgOCAqIGltYWdlV2lkdGhdICs9IGVycjtcXHJcXG5cXHJcXG4gICAgICAgIGlmIChkcmF3Q29sb3VyID09IGZhbHNlKVxcclxcbiAgICAgICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgMV0gPSBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDJdID1cXHJcXG4gICAgICAgICAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIHJldHVybiBpbWFnZS5kYXRhO1xcclxcbn1cXHJcXG5cXHJcXG5mdW5jdGlvbiBkaXRoZXJfdGhyZXNob2xkKGltYWdlLCB0aHJlc2hvbGRfdmFsdWUpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaV0gPiB0aHJlc2hvbGRfdmFsdWUgPyAyNTUgOiAwO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpICsgMV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA+IHRocmVzaG9sZF92YWx1ZSA/IDI1NSA6IDA7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAyXSA9IGltYWdlLmRhdGFbaSArIDJdID4gdGhyZXNob2xkX3ZhbHVlID8gMjU1IDogMDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5mdW5jdGlvbiByZXBsYWNlX2NvbG91cnMoaW1hZ2UsIGJsYWNrLCB3aGl0ZSkge1xcclxcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbWFnZS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2ldID0gaW1hZ2UuZGF0YVtpXSA8IDEyNyA/IGJsYWNrLnIgOiB3aGl0ZS5yO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpICsgMV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA8IDEyNyA/IGJsYWNrLmcgOiB3aGl0ZS5nO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpICsgMl0gPSBpbWFnZS5kYXRhW2kgKyAyXSA8IDEyNyA/IGJsYWNrLmIgOiB3aGl0ZS5iO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpICsgM10gPVxcclxcbiAgICAgICAgICAgIChpbWFnZS5kYXRhW2ldICsgaW1hZ2UuZGF0YVtpICsgMV0gKyBpbWFnZS5kYXRhW2kgKyAyXSkgLyAzIDwgMTI3XFxyXFxuICAgICAgICAgICAgICAgID8gYmxhY2suYVxcclxcbiAgICAgICAgICAgICAgICA6IHdoaXRlLmE7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuZnVuY3Rpb24gZGl0aGVyKGRhdGEpIHtcXHJcXG4gICAgaWYgKGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIkx1bWluYW5jZVxcXCIpIHtcXHJcXG4gICAgICAgIGdyZXlzY2FsZV9sdW1pbmFuY2UoZGF0YS5pbWFnZS5kYXRhKTtcXHJcXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb2Nlc3NpbmcuZ3JleXNjYWxlTWV0aG9kID09IFxcXCJSR0IgQXZlcmFnZVxcXCIpIHtcXHJcXG4gICAgICAgIGdyZXlzY2FsZV9hdmVyYWdlKGRhdGEuaW1hZ2UuZGF0YSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaWYgKGRhdGEucHJvY2Vzc2luZy5kaXRoZXJNZXRob2QgPT0gXFxcIkF0a2luc29uIERpdGhlcmluZ1xcXCIpIHtcXHJcXG4gICAgICAgIGRpdGhlcl9hdGtpbnNvbihcXHJcXG4gICAgICAgICAgICBkYXRhLmltYWdlLmRhdGEsXFxyXFxuICAgICAgICAgICAgZGF0YS5pbWFnZS53aWR0aCxcXHJcXG4gICAgICAgICAgICBkYXRhLnByb2Nlc3NpbmcuZ3JleXNjYWxlTWV0aG9kID09IFxcXCJEaXNhYmxlZFxcXCJcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9jZXNzaW5nLmRpdGhlck1ldGhvZCA9PSBcXFwiVGhyZXNob2xkXFxcIikge1xcclxcbiAgICAgICAgZGl0aGVyX3RocmVzaG9sZChkYXRhLmltYWdlLmRhdGEsIGRhdGEucHJvY2Vzc2luZy5kaXRoZXJUaHJlc2hvbGQpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGlmIChkYXRhLnByb2Nlc3NpbmcucmVwbGFjZUNvbG91cnMgPT0gdHJ1ZSkge1xcclxcbiAgICAgICAgcmVwbGFjZV9jb2xvdXJzKFxcclxcbiAgICAgICAgICAgIGRhdGEuaW1hZ2UuZGF0YSxcXHJcXG4gICAgICAgICAgICBkYXRhLnByb2Nlc3NpbmcucmVwbGFjZUNvbG91ck1hcC5ibGFjayxcXHJcXG4gICAgICAgICAgICBkYXRhLnByb2Nlc3NpbmcucmVwbGFjZUNvbG91ck1hcC53aGl0ZVxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfVxcclxcbiAgICByZXR1cm4gZGF0YTtcXHJcXG59XFxyXFxuXFxyXFxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFxcXCJtZXNzYWdlXFxcIiwgZnVuY3Rpb24gKGUpIHsgc2VsZi5wb3N0TWVzc2FnZShkaXRoZXIoZS5kYXRhKSk7IH0sIGZhbHNlKTtcXHJcXG4gIGA7XFxyXFxuXFxyXFxuICAvLyBTaW5jZSB3ZSBjYW5ub3QgbG9hZCBleHRlcm5hbCBzY3JpcHQgYnV0IHdlYndvcmtlciBuZWVkcyBhIFVSTFxcclxcbiAgLy8gY29udmVydCB0aGUgY29kZSB0aGFuIGlzIG1lYW50IHRvIHJ1biBpbiB0aGUgd2Vid29ya2VyIHRvXFxyXFxuICAvLyBVUkwgQkxPQiBhbmQgcGFzcyBpdCBpbnRvIHRoZSB3ZWJ3b3JrZXIuXFxyXFxuICAvLyBOZWF0IHRyaWNrOlxcclxcblxcclxcbiAgZnVuY3Rpb24gbG9hZFdlYldvcmtlcihzY3JpcHQpIHtcXHJcXG4gICAgcmV0dXJuIG5ldyBXb3JrZXIoVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbc2NyaXB0XSkpKTtcXHJcXG4gIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIExPR0lDUyBmb3Igam9iIHByb2Nlc3NpbmdcXHJcXG4gIC8vLy8vIEVudHJ5IHBvaW50IHRvIGRpdGhlcmluZyBvZiB0aGUgcHJvdmlkZWQgaW1hZ2Ugam9icyAuLi5cXHJcXG5cXHJcXG5cXHJcXG4gIC8vIEVuY29kaW5nIGFuIGltYWdlIGlzIGFsc28gZG9uZSBieSBzdGlja2luZyBwaXhlbHMgaW4gYW5cXHJcXG4gIC8vIEhUTUwgY2FudmFzIGFuZCBieSBhc2tpbmcgdGhlIGNhbnZhcyB0byBzZXJpYWxpemUgaXQgaW50b1xcclxcbiAgLy8gYW4gYWN0dWFsIFBORyBmaWxlIHZpYSBjYW52YXMudG9CbG9iKCkuXFxyXFxuICBhc3luYyBmdW5jdGlvbiBlbmNvZGUoY2FudmFzLCBjdHgsIGltYWdlRGF0YSkge1xcclxcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMClcXHJcXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXHJcXG4gICAgICBjYW52YXMudG9CbG9iKGJsb2IgPT4ge1xcclxcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxcclxcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHJlc29sdmUobmV3IFVpbnQ4QXJyYXkocmVhZGVyLnJlc3VsdCkpXFxyXFxuICAgICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHJlamVjdChuZXcgRXJyb3IoJ0NvdWxkIG5vdCByZWFkIGZyb20gYmxvYicpKVxcclxcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXFxyXFxuICAgICAgfSlcXHJcXG4gICAgfSlcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC8vIERlY29kaW5nIGFuIGltYWdlIGNhbiBiZSBkb25lIGJ5IHN0aWNraW5nIGl0IGluIGFuIEhUTUxcXHJcXG4gIC8vIGNhbnZhcywgYXMgd2UgY2FuIHJlYWQgaW5kaXZpZHVhbCBwaXhlbHMgb2ZmIHRoZSBjYW52YXMuXFxyXFxuICBhc3luYyBmdW5jdGlvbiBkZWNvZGUoY2FudmFzLCBjdHgsIGJ5dGVzKSB7XFxyXFxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2J5dGVzXSkpXFxyXFxuICAgIGNvbnN0IGltYWdlID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xcclxcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXFxyXFxuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoaW1nKVxcclxcbiAgICAgIGltZy5vbmVycm9yID0gKCkgPT4gcmVqZWN0KClcXHJcXG4gICAgICBpbWcuc3JjID0gdXJsXFxyXFxuICAgIH0pXFxyXFxuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoXFxyXFxuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHRcXHJcXG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMClcXHJcXG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KVxcclxcbiAgICByZXR1cm4ge1xcclxcbiAgICAgIGltYWdlRGF0YTogaW1hZ2VEYXRhLFxcclxcbiAgICAgIHdpZHRoOiBpbWFnZS53aWR0aCxcXHJcXG4gICAgICBoZWlnaHQ6IGltYWdlLndpZHRoXFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG5cXHJcXG5cXHJcXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIDEuIFNwaW4gb24gb3VyIG1hZ2luZmljaWVudCB3ZWJ3b3JrZXIgLi4uXFxyXFxuICB3aW5kb3cuRElUSEVSX1dPUktFUiA9IGxvYWRXZWJXb3JrZXIod29ya2VyU2NyaXB0KTtcXHJcXG5cXHJcXG5cXHJcXG4gIC8vLy8vLy8gMi4gQ2hpbGwsIHRpbGwgdGhlIHVzZXIgc2VuZHMgYSBqb2IuLi4uXFxyXFxuICAvLyBDcmVhdGUgYW4gZXZlbnQgaGFuZGxlciB0byByZWNlaXZlIG1lc3NhZ2VzIGZyb20gdGhlIG1haW5cXHJcXG4gIC8vIHRocmVhZC5cXHJcXG4gIHdpbmRvdy5vbm1lc3NhZ2UgPSBhc3luYyBldmVudCA9PiB7XFxyXFxuICAgIC8vIEp1c3QgZ2V0IHRoZSBieXRlcyBkaXJlY3RseSBmcm9tIHRoZSBwbHVnaW5NZXNzYWdlIHNpbmNlXFxyXFxuICAgIC8vIHRoYXQncyB0aGUgb25seSB0eXBlIG9mIG1lc3NhZ2Ugd2UnbGwgcmVjZWl2ZSBpbiB0aGlzXFxyXFxuICAgIC8vIHBsdWdpbi4gSW4gbW9yZSBjb21wbGV4IHBsdWdpbnMsIHlvdSdsbCB3YW50IHRvIGNoZWNrIHRoZVxcclxcbiAgICAvLyB0eXBlIG9mIHRoZSBtZXNzYWdlLlxcclxcblxcclxcbiAgICAvLyBjb250YWluIHRoZSBwcm9jZXNzZWQgKGRpdGhlcmVkKSBpbWFnZWJ5dGVzLi4uXFxyXFxuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcXHJcXG5cXHJcXG4gICAgLy8gID0+IFRha2UgYSBsb29rIGF0IHRoZSBzZW50IGRhdGEuXFxyXFxuICAgIGNvbnN0IHJlY3ZlZERhdGEgPSBldmVudC5kYXRhLnBsdWdpbk1lc3NhZ2U7XFxyXFxuXFxyXFxuICAgIC8vIEV4dHJhY3QgdGhlIGpvYnMuLlxcclxcbiAgICBjb25zdCBqb2JzID0gcmVjdmVkRGF0YS5qb2JzO1xcclxcblxcclxcbiAgICAvLyBXZSBwcm9jZXNzIHRoZSBqb2Igb25lIGFmdGVyIHRoZSBvdGhlci4uLlxcclxcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSB7XFxyXFxuXFxyXFxuICAgICAgLy8geWVhaCB3ZSBuZWVkIHRvIHJlc2xvdmUgdHdvIHByb21pc2VzIGJlZm9yZSB3ZSBwcm9jZWVkIHRvIHRoZSBuZXh0IGpvYlxcclxcbiAgICAgIHJlc3VsdHMucHVzaCh7XFxyXFxuICAgICAgICBpbWFnZUJ5dGVzOiBhd2FpdCAoYXdhaXQgcHJvY2Vzc0RpdGhlcihqb2IsIHJlY3ZlZERhdGEub3B0aW9ucykpLFxcclxcbiAgICAgICAgZmlsbERhdGE6IGpvYi5maWxsRGF0YVxcclxcbiAgICAgIH0pO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC8vIFNpbmNlIHdlIGFyZSBjb21wbGV0ZWx5IGRvbmUgd2l0aCBvdXIgam9icywga2lsbCB0aGUgV2Vid29ya2VyLi4uXFxyXFxuICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnRlcm1pbmF0ZSgpO1xcclxcblxcclxcbiAgICAvLyBTZW5kIHRoZSByZXN1bHQgYmFjayB0byB0aGUgVXNlci4uXFxyXFxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xcclxcbiAgICAgIHBsdWdpbk1lc3NhZ2U6IHJlc3VsdHNcXHJcXG4gICAgfSwgXFxcIipcXFwiKTtcXHJcXG4gIH07XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8gMy4gVGhpcyBtZXRob2Qgc2VuZHMgYSBqb2IgcmVxdWVzdCB0byB0aGUgd2ViIHdvcmtlciBhbmQgd2FpdCB0aWxsIHNvbWV0aGluZyBoYXBwZW5zLi5cXHJcXG5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NEaXRoZXIoam9iLCBvcHRpb25zKSB7XFxyXFxuICAgIGNvbnN0IGJ5dGVzID0gam9iLmltYWdlQnl0ZXM7XFxyXFxuXFxyXFxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXFxcImNhbnZhc1xcXCIpO1xcclxcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcXFwiMmRcXFwiKTtcXHJcXG5cXHJcXG4gICAgY29uc3QgaW1hZ2VEZXRhaWxzID0gYXdhaXQgZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcyk7XFxyXFxuICAgIC8vIGNvbnNvbGUubG9nKGltYWdlRGV0YWlscyk7XFxyXFxuICAgIGNvbnN0IHByZXNldCA9IHtcXHJcXG4gICAgICBpbWFnZToge1xcclxcbiAgICAgICAgZGF0YTogaW1hZ2VEZXRhaWxzLmltYWdlRGF0YSxcXHJcXG4gICAgICAgIHdpZHRoOiBpbWFnZURldGFpbHMud2lkdGgsXFxyXFxuICAgICAgICBoZWlnaHQ6IGltYWdlRGV0YWlscy5oZWlnaHRcXHJcXG4gICAgICB9LFxcclxcbiAgICAgIHByb2Nlc3Npbmc6IHtcXHJcXG4gICAgICAgIGdyZXlzY2FsZU1ldGhvZDogb3B0aW9ucy5ncmV5c2NhbGVfbWV0aG9kLFxcclxcbiAgICAgICAgZGl0aGVyTWV0aG9kOiBvcHRpb25zLmRpdGhlcl9tZXRob2QsXFxyXFxuICAgICAgICBkaXRoZXJUaHJlc2hvbGQ6IG9wdGlvbnMudGhyZXNob2xkLFxcclxcbiAgICAgICAgcmVwbGFjZUNvbG91cnM6IG9wdGlvbnMuY2hrX3JlcGxhY2VfY29sb3VycyxcXHJcXG4gICAgICAgIHJlcGxhY2VDb2xvdXJNYXA6IHtcXHJcXG4gICAgICAgICAgYmxhY2s6IHtcXHJcXG4gICAgICAgICAgICByOiBvcHRpb25zLnJlcF9ibGFja1swXSxcXHJcXG4gICAgICAgICAgICBnOiBvcHRpb25zLnJlcF9ibGFja1sxXSxcXHJcXG4gICAgICAgICAgICBiOiBvcHRpb25zLnJlcF9ibGFja1syXSxcXHJcXG4gICAgICAgICAgICBhOiBvcHRpb25zLnJlcF9ibGFja1szXVxcclxcbiAgICAgICAgICB9LFxcclxcbiAgICAgICAgICB3aGl0ZToge1xcclxcbiAgICAgICAgICAgIHI6IG9wdGlvbnMucmVwX3doaXRlWzBdLFxcclxcbiAgICAgICAgICAgIGc6IG9wdGlvbnMucmVwX3doaXRlWzFdLFxcclxcbiAgICAgICAgICAgIGI6IG9wdGlvbnMucmVwX3doaXRlWzJdLFxcclxcbiAgICAgICAgICAgIGE6IG9wdGlvbnMucmVwX3doaXRlWzNdXFxyXFxuICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICB9XFxyXFxuICAgIH07XFxyXFxuXFxyXFxuICAgIC8vIFN0YXJ0IHRpbWVyIHRvIHRyYWNrIHRoZSB0aW1lIHRoYXQgaXMgc3BlbnQgb24gdGhpcyBjdXJyZW50IGpvYiAuLi5cXHJcXG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRpbWUpIHtcXHJcXG4gICAgICBjb25zb2xlLmxvZyhcXFwiU3RhcnRpbmcgV2ViIFdvcmtlciBmb3IgaW1hZ2UgKFxcXCIgKyBpbWFnZURldGFpbHMud2lkdGggKyBcXFwieFxcXCIgKyBpbWFnZURldGFpbHMuaGVpZ2h0ICtcXHJcXG4gICAgICAgIFxcXCIsIEdyZXlzY2FsZSBNZXRob2Q6IFxcXCIgKyBvcHRpb25zLmdyZXlzY2FsZV9tZXRob2QgKyBcXFwiLCBEaXRoZXIgTWV0aG9kOiBcXFwiICsgb3B0aW9ucy5kaXRoZXJfbWV0aG9kICsgXFxcIilcXFwiKTtcXHJcXG4gICAgICBjb25zb2xlLnRpbWUoXFxcIldlYiB3b3JrZXIgdG9va1xcXCIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC8vIFNlbmQgam9iIHRvIHdlYndvcmtlclxcclxcbiAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5wb3N0TWVzc2FnZShwcmVzZXQpO1xcclxcblxcclxcbiAgICAvLyBOT1RJQ0U6IEhlcmUgdG8gYXZvaWQgbWVtb3J5IGxlYWtzLCB3ZSBhcmUgdXNpbmcgYSBvbmUgdGltZSBldmVudCBsaXN0bmVyLi5cXHJcXG4gICAgLy8gdGhlcmVmb3JlIGVhY2ggam9iIGFwcGxpZXMgYW4gZXZlbnQgbGlzdG5lciB0byB0aGUgd29ya2VyIGFuZCBvbmNlIHRoZSB3b3JrZXJzPVxcclxcbiAgICAvLyBzZW5kcyB0aGUgcmVzdWx0IGJhY2ssIHdlIGRpc3Bvc2UvdW5yZWdpc3RlciB0aGUgZXZlbnQgbGlzdG5lci4uLlxcclxcblxcclxcbiAgICBjb25zdCB3b3JrZXJSZXN1bHQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XFxyXFxuICAgICAgLy8gR2V0IHJlcGx5IGZyb20gd2Vid29ya2VyXFxyXFxuICAgICAgY29uc3Qgb25lVGltZUxpc3RlbiA9IGZ1bmN0aW9uIChlKSB7XFxyXFxuICAgICAgICAvLyBjb25zb2xlLmxvZygncmVzdWx0JywgZSk7XFxyXFxuICAgICAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUudGltZSkge1xcclxcbiAgICAgICAgICBjb25zb2xlLnRpbWVFbmQoXFxcIldlYiB3b3JrZXIgdG9va1xcXCIpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZS5kYXRhO1xcclxcbiAgICAgICAgZW5jb2RlKGNhbnZhcywgY3R4LCByZXN1bHQuaW1hZ2UuZGF0YSkudGhlbihuZXdCeXRlcyA9PiB7XFxyXFxuXFxyXFxuICAgICAgICAgIC8vIG1ha2UgaXQgYSBvbmUgdGltZSBldmVudCBsaXN0bmVyLi4uXFxyXFxuICAgICAgICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbmVUaW1lTGlzdGVuKTtcXHJcXG4gICAgICAgICAgcmVzb2x2ZShuZXdCeXRlcyk7XFxyXFxuICAgICAgICB9KTtcXHJcXG4gICAgICB9O1xcclxcblxcclxcbiAgICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbmVUaW1lTGlzdGVuLCBmYWxzZSk7XFxyXFxuICAgIH0pO1xcclxcblxcclxcbiAgICByZXR1cm4gd29ya2VyUmVzdWx0O1xcclxcbiAgfVxcclxcbjwvc2NyaXB0PlwiIl0sInNvdXJjZVJvb3QiOiIifQ==