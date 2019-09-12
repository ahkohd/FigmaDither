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

let firstImagefillsDataOnPreview;
function setupPreview(previewNode) {
    // send preview image bytes to the ui
    firstImagefillsDataOnPreview = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getImageFillsFromNode"])(previewNode)[0];
    Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getImageBytes"])(firstImagefillsDataOnPreview.imageFill).then(bytes => {
        figma.ui.postMessage({ imageBytes: bytes, type: 'preview-node-image-bytes' });
    });
}
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
    setupPreview(previewNode);
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
        if (msg.type == 'destory-preview') {
            if (!previewNode.removed)
                previewNode.remove();
        }
        if (msg.type == 'show-preview') {
            previewNode = figma.currentPage.selection[0].clone();
            setupPreview(previewNode);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBb0w7QUFDcEw7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdFQUFxQjtBQUN4RCxJQUFJLGdFQUFhO0FBQ2pCLDhCQUE4QixzREFBc0Q7QUFDcEYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdUVBQW9CO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHFFQUFrQjtBQUMxQjtBQUNBO0FB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dUJBQXVCLHdCQUF3QixVQUFVLG9FQUFvRSw0RUFBNEUsNEVBQTRFLDJLQUEySyxTQUFTLEtBQUssK0JBQStCLCtEQUErRCxpREFBaUQsU0FBUywrREFBK0QsK0NBQStDLFNBQVMseUVBQXlFLDBLQUEwSyxTQUFTLDBEQUEwRCwrRUFBK0UsU0FBUyx5REFBeUQsdUxBQXVMLFNBQVMsb0JBQW9CLEtBQUsseURBQXlELGtDQUFrQyxFQUFFLFNBQVMsUUFBUSw0UEFBNFAsbUVBQW1FLE9BQU8sbVpBQW1aLGdHQUFnRyxpQ0FBaUMsd1BBQXdQLFVBQVUsUUFBUSxzTEFBc0wsd0hBQXdILGdKQUFnSixvTUFBb00sa0dBQWtHLE9BQU8sd0lBQXdJLHdMQUF3TCw4VEFBOFQsb0dBQW9HLHNFQUFzRSx5RkFBeUYsK0dBQStHLDBIQUEwSCxFQUFFLFNBQVMseUhBQXlILG9GQUFvRix5Q0FBeUMsU0FBUyxRQUFRLHVLQUF1SyxxQ0FBcUMsOERBQThELDhDQUE4QyxrRUFBa0UscUNBQXFDLHdCQUF3QixrQkFBa0IsaUlBQWlJLHdCQUF3Qiw0T0FBNE8sc0JBQXNCLDhLQUE4Syx1QkFBdUIsOEtBQThLLGFBQWEsV0FBVyxVQUFVLHNJQUFzSSx1T0FBdU8sNENBQTRDLFNBQVMscUZBQXFGLHlVQUF5VSxtRkFBbUYsd0NBQXdDLHdEQUF3RCxtREFBbUQsYUFBYSxrQ0FBa0MscUVBQXFFLHlJQUF5SSxnQ0FBZ0MsYUFBYSxFQUFFLFlBQVkscUZBQXFGLFNBQVMsRUFBRSxnQ0FBZ0MsT0FBTyxjIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbnMsIGZpbHRlck5vZGVzV2l0aEZpbGxzLCBEb0ltYWdlRGl0aGVyLCBtdWx0aXBsZVNlbGVjdGlvbnMsIGNsb3NlUGx1Z2luLCBnZXRJbWFnZUJ5dGVzLCBnZXRJbWFnZUZpbGxzRnJvbU5vZGUsIGFwcGx5UHJvY2Vzc1Jlc3VsdHMgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcclxubGV0IGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXc7XHJcbmZ1bmN0aW9uIHNldHVwUHJldmlldyhwcmV2aWV3Tm9kZSkge1xyXG4gICAgLy8gc2VuZCBwcmV2aWV3IGltYWdlIGJ5dGVzIHRvIHRoZSB1aVxyXG4gICAgZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlldyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShwcmV2aWV3Tm9kZSlbMF07XHJcbiAgICBnZXRJbWFnZUJ5dGVzKGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXcuaW1hZ2VGaWxsKS50aGVuKGJ5dGVzID0+IHtcclxuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IGltYWdlQnl0ZXM6IGJ5dGVzLCB0eXBlOiAncHJldmlldy1ub2RlLWltYWdlLWJ5dGVzJyB9KTtcclxuICAgIH0pO1xyXG59XHJcbi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXHJcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cclxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxyXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcclxuLy8gZnVsbCBicm93c2VyIGVudmlyb21lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cclxuaWYgKGZpbHRlck5vZGVzV2l0aEZpbGxzKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbikubGVuZ3RoID09IDApIHtcclxuICAgIGZpZ21hLm5vdGlmeSgnRmlnbWEgRGl0aGVyOiBQbGVhc2Ugc2VsZWN0IGF0IGxlYXNlIG9uZSBpdGVtIHdpdGggaW1hZ2UgZmlsbC4nKTtcclxuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBsZXQgcHJldmlld05vZGU7XHJcbiAgICBpZiAobXVsdGlwbGVTZWxlY3Rpb25zKCkpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoJ0ZpZ21hIERpdGhlcjogTW9yZSB0aGFuIG9uZSBzZWxlY3Rpb24gZGlzYWJsZXMgbGl2ZSBwcmV2aWV3LicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcHJldmlld05vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIC8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cclxuICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDI3MCB9KTtcclxuICAgIHNldHVwUHJldmlldyhwcmV2aWV3Tm9kZSk7XHJcbiAgICAvLyBDYWxscyB0byBcInBhcmVudC5wb3N0TWVzc2FnZVwiIGZyb20gd2l0aGluIHRoZSBIVE1MIHBhZ2Ugd2lsbCB0cmlnZ2VyIHRoaXNcclxuICAgIC8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxyXG4gICAgLy8gcG9zdGVkIG1lc3NhZ2UuXHJcbiAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJkaXRoZXItaW1hZ2VcIikge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9ucyA9IGZpbHRlck5vZGVzV2l0aEZpbGxzKGdldEN1cnJlbnRTZWxlY3Rpb25zKCkpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFNlbGVjdGlvbnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeSgn8J+YhSBQbGVhc2Ugc2VsZWN0IGl0ZW0ocykgd2l0aCBpbWFnZSBmaWxsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zLCBtc2cub3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQbHVnaW4ocHJldmlld05vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1zZy50eXBlID09PSBcImRpdGhlci1pbWFnZS1wcmV2aWV3XCIpIHtcclxuICAgICAgICAgICAgLy8gRG9JbWFnZURpdGhlcihbcHJldmlld05vZGVdLCBtc2cub3B0aW9ucywgdHJ1ZSlcclxuICAgICAgICAgICAgLy8gICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAvLy9cclxuICAgICAgICAgICAgLy8gICB9KTtcclxuICAgICAgICAgICAgLy9hcHBseSB0aGUgZWZmZWN0IHRvIHRoZSBwcmV2aWV3Tm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwiY2FuY2VsXCIpIHtcclxuICAgICAgICAgICAgY2xvc2VQbHVnaW4ocHJldmlld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnLnR5cGUgPT0gXCJwcm9jZXNzZWQtcHJldmlldy1pbWFnZWJ5dGVzXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2Nlc3NlZCBieXRlcycsIG1zZy5pbWFnZUJ5dGVzKTtcclxuICAgICAgICAgICAgLy8gYXBwbHkgcHJvY2Vzc2VkIGltYWdlIHRvIHByZXZpZXcgbm9kZS4uXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGxEYXRhOiBmaXJzdEltYWdlZmlsbHNEYXRhT25QcmV2aWV3LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VCeXRlczogbXNnLmltYWdlQnl0ZXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgYXBwbHlQcm9jZXNzUmVzdWx0cyhbcmVzdWx0XSwgW2ZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXddLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXZpZXcgcmVzdWx0IGFwcGxpZWQhJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnLnR5cGUgPT0gJ2Rlc3RvcnktcHJldmlldycpIHtcclxuICAgICAgICAgICAgaWYgKCFwcmV2aWV3Tm9kZS5yZW1vdmVkKVxyXG4gICAgICAgICAgICAgICAgcHJldmlld05vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PSAnc2hvdy1wcmV2aWV3Jykge1xyXG4gICAgICAgICAgICBwcmV2aWV3Tm9kZSA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvblswXS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBzZXR1cFByZXZpZXcocHJldmlld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihtc2cudHlwZSA9PSAndXNlci1jbG9zZWQtcGx1Z2luJylcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICBjbG9zZVBsdWdpbihwcmV2aWV3Tm9kZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcclxuICAgICAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cclxuICAgIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFF1ZXVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlID0gW107XHJcbiAgICB9XHJcbiAgICBlbnF1ZXVlKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlLnB1c2godmFsKTtcclxuICAgIH1cclxuICAgIGRlcXVldWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAnLi9RdWV1ZSc7XHJcbmltcG9ydCB3b3JrZXJUZW1wbGF0ZSBmcm9tICcuLi93b3JrZXIvZW50cnkuaHRtbCc7XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50IFVzZXIgU2VsZWN0aW9uKHMpXHJcbiAqIEByZXR1cm5zIHJlYWRvbmx5IFNjZW5lTm9kZVtdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG59XHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG5vZGVzIHRoYXQgaGF2ZSBJbWFnZSBmaWxscy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gbm9kZXNcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9kZXNXaXRoRmlsbHMobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGVXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiB7XHJcbiAgICAgICAgaWYgKFwiZmlsbHNcIiBpbiBub2RlKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsbCBvZiBub2RlLmZpbGxzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsbC50eXBlID09IFwiSU1BR0VcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbm9kZVdpdGhGaWxscy5sZW5ndGggPT0gMCA/IFtdIDogbm9kZVdpdGhGaWxscztcclxufVxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIGl0ZXJhdGFibGVcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuZnVuY3Rpb24gX2lzSXRlcmFibGUob2JqKSB7XHJcbiAgICAvLyBjaGVja3MgZm9yIG51bGwgYW5kIHVuZGVmaW5lZFxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmpbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBJbWFnZSBmaWxscyBmcm9tIGEgbm9kZS5cclxuICogQHBhcmFtICB7U2NlbmVOb2RlfSBub2RlIE5vZGUgdG8gZXh0cmFjdCB0aGUgaW1hZ2UgZmlsbHNcclxuICogQHJldHVybnMgSW1hZ2VGaWxsRGF0YVtdIEFuIGFycmF5IG9mIGltYWdlIGZpbGxzIG9mIHRoZSBub2RlIGFzIEltYWdlRmlsbERhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgcmVzdWx0aW5nSW1hZ2VGaWxscyA9IFtdO1xyXG4gICAgbGV0IGZpbGxzID0gbm9kZS5maWxscztcclxuICAgIGlmIChfaXNJdGVyYWJsZShmaWxscykpIHtcclxuICAgICAgICBmaWxscyA9IGZpbGxzO1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nSW1hZ2VGaWxscy5wdXNoKHsgaW1hZ2VGaWxsOiBmaWxsLCBpbmRleDogaW5kZXgsIG5vZGU6IG5vZGUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0aW5nSW1hZ2VGaWxscztcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgSW1hZ2VCeXRlcyBmcm9tIGEgSW1hZ2VQYWludCBmaWxsXHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IGZpbGxcclxuICogQHJldHVybnMgUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlQnl0ZXMoZmlsbCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKGZpbGwuaW1hZ2VIYXNoKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQWRkcyBhIGpvYiB0byB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHthbnl9IHRhc2tcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrVG9Qb29sKHRhc2ssIHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5lbnF1ZXVlKHRhc2spO1xyXG59XHJcbi8qKlxyXG4gKiBTcGF3biBhIHdvcmtlciB0byBwcm9jZXNzIHRoZSB0YXNrcyBpbiB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZSBUYXNrIHF1ZXVlXHJcbiAqIEByZXR1cm5zIFByb21pc2U8Sm9iUmVzdWx0W10+IFJldHVybnMgYW4gYXJyYXkgb2YgSm9iUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0pvYnMocXVldWUsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGpvYnMgPSBxdWV1ZS50b0FycmF5KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFsbCBqb2JzXCIsIGpvYnMpO1xyXG4gICAgLy8gQ3JlYXRlIGFuIGludmlzaWJsZSBpZnJhbWUgdG8gYWN0IGFzIGEgXCJ3b3JrZXJcIiB3aGljaFxyXG4gICAgLy8gd2lsbCBkbyB0aGUgdGFzayBvZiBkZWNvZGluZyBhbmQgc2VuZCB1cyBhIG1lc3NhZ2VcclxuICAgIC8vIHdoZW4gaXQncyBkb25lLlxyXG4gICAgZmlnbWEuc2hvd1VJKHdvcmtlclRlbXBsYXRlLCB7IHZpc2libGU6IHRydWUsIHdpZHRoOiAyMDAsIGhlaWdodDogMTI1IH0pO1xyXG4gICAgLy8gU2VuZCB0aGUgcmF3IGJ5dGVzIG9mIHRoZSBmaWxlIHRvIHRoZSB3b3JrZXIuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnc2VudCEnLCBvcHRpb25zKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgam9iczogam9icywgb3B0aW9uczogb3B0aW9ucyB9KTtcclxuICAgIC8vIFdhaXQgZm9yIHRoZSB3b3JrZXIncyByZXNwb25zZS5cclxuICAgIGNvbnN0IGpvYnNSZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gdmFsdWUgPT4gcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBqb2JzUmVzdWx0O1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBJbWFnZUJ5dGVzIHRvIEltYWdlSGFzaCBhbmQgYWRkcyB0byBJbWFnZVBhaW50XHJcbiAqIEBwYXJhbSAge1VpbnQ4QXJyYXl9IGJ5dGVzICBJbWFnZWJ5dGVzIHRvIGNvbnZlcnRcclxuICogQHBhcmFtICB7SW1hZ2VQYWludH0gcGFpbnQgSW1hZ2VQYWludCB0byBhZGQgdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2hcclxuICogQHJldHVybnMgSW1hZ2VQYWludCBSZXR1cm5zIGEgbmV3IEltYWdlUGFpbnQgd2l0aCB0aGUgY29udmVydGVkIEltYWdlSGFzaCBhZGRlZCB0byBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKGJ5dGVzLCBwYWludCkge1xyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHBhaW50IGZvciB0aGUgbmV3IGltYWdlLlxyXG4gICAgY29uc3QgbmV3UGFpbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhaW50KSk7XHJcbiAgICBuZXdQYWludC5pbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShieXRlcykuaGFzaDtcclxuICAgIHJldHVybiBuZXdQYWludDtcclxufVxyXG4vKipcclxuICogQ2Fycnkgb3V0IHRoZSBpbWFnZSBkaXRoZXJpbmcgcHJvY2Nlc3Nlcy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscywgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgVEFTS1MgPSBuZXcgUXVldWUoKTtcclxuICAgICAgICBsZXQgbm9kZUZpbGxzID0gW107XHJcbiAgICAgICAgY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoSW1hZ2VGaWxscyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGVzV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAoZmlsbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXJyeSBvdXQgZGl0aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQnl0ZXMgPSB5aWVsZCBnZXRJbWFnZUJ5dGVzKGZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVGaWxscy5wdXNoKGZpbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGFza1RvUG9vbCh7IGltYWdlQnl0ZXM6IGltYWdlQnl0ZXMsIGZpbGxEYXRhOiBmaWxsRGF0YSB9LCBUQVNLUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdGlsbCBhbGwgam9icyBhcmUgYWRkZWQuLlxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHByb2Nlc3Npbmcgam9icy4uXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlQcm9jZXNzUmVzdWx0cyh5aWVsZCBwcm9jZXNzSm9icyhUQVNLUywgb3B0aW9ucyksIG5vZGVGaWxscywgb3B0aW9ucy5rZWVwX2ltYWdlLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQXBwbGllcyB0aGUgcHJvY2Vzc2VkIGRpdGhlciBlZmZlY3QgdG8gYXBwcm9wcmlhdGUgbm9kZXNcclxuICogQHBhcmFtICB7Sm9iUmVzdWx0W119IHJlc3VsdHNcclxuICogQHBhcmFtICB7SW1hZ2VGaWxsRGF0YVtdfSBub2RlRmlsbHNcclxuICogQHBhcmFtICB7a2VlcH0ga2VlcEltYWdlRmlsbHMgS2VlcHMgdGhlIG9yaWdpbmFsIGltYWdlIGZpbGwgaW5zdGVhZCBvZiByZXBsYWNpbmcgaXQuLlxyXG4gKiBAcGFyYW0gIHthbnl9IHJlc29sdmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseVByb2Nlc3NSZXN1bHRzKHJlc3VsdHMsIG5vZGVGaWxscywga2VlcEltYWdlRmlsbHMgPSBmYWxzZSwgcmVzb2x2ZSkge1xyXG4gICAgLy8gY29uc29sZS5sb2cobm9kZUZpbGxzKTtcclxuICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9jZXNzRGl0aGVyRWZmZWN0ID0gQnl0ZXNUb0ltYWdlUGFpbnRIYXNoSW1hZ2UocmVzdWx0LmltYWdlQnl0ZXMsIHJlc3VsdC5maWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgIC8vIGNsb25lIHRoZSBub2RlIGZpbGxzXHJcbiAgICAgICAgY29uc3QgY29weU5vZGVGaWxscyA9IFsuLi5ub2RlRmlsbHNbaW5kZXhdLm5vZGUuZmlsbHNdO1xyXG4gICAgICAgIGlmICgha2VlcEltYWdlRmlsbHMpIHtcclxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgaW1hZ2UgZmlsdGVyXHJcbiAgICAgICAgICAgIGNvcHlOb2RlRmlsbHMuc3BsaWNlKHJlc3VsdC5maWxsRGF0YS5pbmRleCwgMSwgcHJvY2Vzc0RpdGhlckVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGUgbmV3IGltYWcgZmlsdGVyIHRvIHRoZSB0b3AuLlxyXG4gICAgICAgICAgICBjb3B5Tm9kZUZpbGxzLnB1c2gocHJvY2Vzc0RpdGhlckVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxscyA9IGNvcHlOb2RlRmlsbHM7XHJcbiAgICB9KTtcclxuICAgIC8vIHJlc29sdmUgdGhyZSBwcm9taXNlIGFmdGVyIGFwcGx5aW5nIGRpdGhlcmluZyBlZmZlY3QuXHJcbiAgICByZXNvbHZlKCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGxlU2VsZWN0aW9ucygpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcclxuICAgIHJldHVybiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSA/IGZhbHNlIDogdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQbHVnaW4ocHJldmlld05vZGUpIHtcclxuICAgIGlmIChwcmV2aWV3Tm9kZSlcclxuICAgICAgICBwcmV2aWV3Tm9kZS5yZW1vdmUoKTtcclxuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3R5bGU+XFxyXFxuICBib2R5LFxcclxcbiAgaHRtbCB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgfVxcclxcblxcclxcbiAgKiB7XFxyXFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRlckNvbnRhaW5lciB7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDY0cHg7XFxyXFxuICAgIGhlaWdodDogNjRweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRpbmctdGV4dCB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcclxcbiAgICBmb250LXNpemU6IDExcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgY29sb3I6ICM1NTU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2IHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDUxcHg7XFxyXFxuICAgIGhlaWdodDogNTFweDtcXHJcXG4gICAgYm9yZGVyOiA2cHggc29saWQgIzAwYWNlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDBhY2VkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGxkcy1yaW5nIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG48L3N0eWxlPlxcclxcblxcclxcblxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImxvYWRlckNvbnRhaW5lclxcXCI+XFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJsZHMtcmluZ1xcXCI+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImxvYWRpbmctdGV4dFxcXCI+XFxyXFxuICAgIGRpdGhlcmluZy4uXFxyXFxuICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG48c2NyaXB0PiAgICBcXHJcXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gV0VCIFdPUktFUiBzY3JpcHQgaW4gc3RyaW5nLi4uXFxyXFxuXFxyXFxuICAvLyBUaGUgY29kZSBjb250YWluZWQgaW4gdGhpcyBzdHJpbmcgaXMgdGhlIGFjdHVhbCBsb2dpY3MgdG8gbWFuaXB1bGF0ZSAgY2FudmFzIGltYWdlXFxyXFxuICAvLyBhbmQgY2Fycnkgb3V0IHRoZSBkaXRoZXJpbmcgZWZmZWN0Li5cXHJcXG5cXHJcXG4gIGNvbnN0IHdvcmtlclNjcmlwdCA9IGBcXHJcXG4gIC8vIENvbnZlcnQgaW1hZ2UgZGF0YSB0byBncmV5c2NhbGUgYmFzZWQgb24gbHVtaW5hbmNlLlxcclxcbmZ1bmN0aW9uIGdyZXlzY2FsZV9sdW1pbmFuY2UoaW1hZ2UpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMl0gPSBwYXJzZUludChcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2ldICogMC4yMSArXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpICsgMV0gKiAwLjcxICtcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2kgKyAyXSAqIDAuMDcsXFxyXFxuICAgICAgICAgICAgMTBcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGltYWdlO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDb252ZXJ0IGltYWdlIGRhdGEgdG8gZ3JleXNjYWxlIGJhc2VkIG9uIGF2ZXJhZ2Ugb2YgUiwgRyBhbmQgQiB2YWx1ZXMuXFxyXFxuZnVuY3Rpb24gZ3JleXNjYWxlX2F2ZXJhZ2UoaW1hZ2UpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMl0gPSBwYXJzZUludChcXHJcXG4gICAgICAgICAgICAoaW1hZ2UuZGF0YVtpXSArIGltYWdlLmRhdGFbaSArIDFdICsgaW1hZ2UuZGF0YVtpICsgMl0pIC8gMyxcXHJcXG4gICAgICAgICAgICAxMFxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfVxcclxcbiAgICByZXR1cm4gaW1hZ2U7XFxyXFxufVxcclxcblxcclxcbi8vIEFwcGx5IEF0a2luc29uIERpdGhlciB0byBJbWFnZSBEYXRhXFxyXFxuZnVuY3Rpb24gZGl0aGVyX2F0a2luc29uKGltYWdlLCBpbWFnZVdpZHRoLCBkcmF3Q29sb3VyKSB7XFxyXFxuICAgIHNraXBQaXhlbHMgPSA0O1xcclxcblxcclxcbiAgICBpZiAoIWRyYXdDb2xvdXIpIGRyYXdDb2xvdXIgPSBmYWxzZTtcXHJcXG5cXHJcXG4gICAgaWYgKGRyYXdDb2xvdXIgPT0gdHJ1ZSkgc2tpcFBpeGVscyA9IDE7XFxyXFxuXFxyXFxuICAgIGltYWdlTGVuZ3RoID0gaW1hZ2UuZGF0YS5sZW5ndGg7XFxyXFxuXFxyXFxuICAgIGZvciAoXFxyXFxuICAgICAgICBjdXJyZW50UGl4ZWwgPSAwO1xcclxcbiAgICAgICAgY3VycmVudFBpeGVsIDw9IGltYWdlTGVuZ3RoO1xcclxcbiAgICAgICAgY3VycmVudFBpeGVsICs9IHNraXBQaXhlbHNcXHJcXG4gICAgKSB7XFxyXFxuICAgICAgICBpZiAoaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdIDw9IDEyOCkge1xcclxcbiAgICAgICAgICAgIG5ld1BpeGVsQ29sb3VyID0gMDtcXHJcXG4gICAgICAgIH0gZWxzZSB7XFxyXFxuICAgICAgICAgICAgbmV3UGl4ZWxDb2xvdXIgPSAyNTU7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBlcnIgPSBwYXJzZUludCgoaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdIC0gbmV3UGl4ZWxDb2xvdXIpIC8gOCwgMTApO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdID0gbmV3UGl4ZWxDb2xvdXI7XFxyXFxuXFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDRdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgOF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0ICogaW1hZ2VXaWR0aCAtIDRdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGhdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGggKyA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDggKiBpbWFnZVdpZHRoXSArPSBlcnI7XFxyXFxuXFxyXFxuICAgICAgICBpZiAoZHJhd0NvbG91ciA9PSBmYWxzZSlcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDFdID0gaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyAyXSA9XFxyXFxuICAgICAgICAgICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsXTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICByZXR1cm4gaW1hZ2UuZGF0YTtcXHJcXG59XFxyXFxuXFxyXFxuZnVuY3Rpb24gZGl0aGVyX3RocmVzaG9sZChpbWFnZSwgdGhyZXNob2xkX3ZhbHVlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2ldID4gdGhyZXNob2xkX3ZhbHVlID8gMjU1IDogMDtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMV0gPiB0aHJlc2hvbGRfdmFsdWUgPyAyNTUgOiAwO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpICsgMl0gPSBpbWFnZS5kYXRhW2kgKyAyXSA+IHRocmVzaG9sZF92YWx1ZSA/IDI1NSA6IDA7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuZnVuY3Rpb24gcmVwbGFjZV9jb2xvdXJzKGltYWdlLCBibGFjaywgd2hpdGUpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaV0gPCAxMjcgPyBibGFjay5yIDogd2hpdGUucjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMV0gPCAxMjcgPyBibGFjay5nIDogd2hpdGUuZztcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDJdID0gaW1hZ2UuZGF0YVtpICsgMl0gPCAxMjcgPyBibGFjay5iIDogd2hpdGUuYjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDNdID1cXHJcXG4gICAgICAgICAgICAoaW1hZ2UuZGF0YVtpXSArIGltYWdlLmRhdGFbaSArIDFdICsgaW1hZ2UuZGF0YVtpICsgMl0pIC8gMyA8IDEyN1xcclxcbiAgICAgICAgICAgICAgICA/IGJsYWNrLmFcXHJcXG4gICAgICAgICAgICAgICAgOiB3aGl0ZS5hO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIGRpdGhlcihkYXRhKSB7XFxyXFxuICAgIGlmIChkYXRhLnByb2Nlc3NpbmcuZ3JleXNjYWxlTWV0aG9kID09IFxcXCJMdW1pbmFuY2VcXFwiKSB7XFxyXFxuICAgICAgICBncmV5c2NhbGVfbHVtaW5hbmNlKGRhdGEuaW1hZ2UuZGF0YSk7XFxyXFxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiUkdCIEF2ZXJhZ2VcXFwiKSB7XFxyXFxuICAgICAgICBncmV5c2NhbGVfYXZlcmFnZShkYXRhLmltYWdlLmRhdGEpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGlmIChkYXRhLnByb2Nlc3NpbmcuZGl0aGVyTWV0aG9kID09IFxcXCJBdGtpbnNvbiBEaXRoZXJpbmdcXFwiKSB7XFxyXFxuICAgICAgICBkaXRoZXJfYXRraW5zb24oXFxyXFxuICAgICAgICAgICAgZGF0YS5pbWFnZS5kYXRhLFxcclxcbiAgICAgICAgICAgIGRhdGEuaW1hZ2Uud2lkdGgsXFxyXFxuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiRGlzYWJsZWRcXFwiXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvY2Vzc2luZy5kaXRoZXJNZXRob2QgPT0gXFxcIlRocmVzaG9sZFxcXCIpIHtcXHJcXG4gICAgICAgIGRpdGhlcl90aHJlc2hvbGQoZGF0YS5pbWFnZS5kYXRhLCBkYXRhLnByb2Nlc3NpbmcuZGl0aGVyVGhyZXNob2xkKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLnJlcGxhY2VDb2xvdXJzID09IHRydWUpIHtcXHJcXG4gICAgICAgIHJlcGxhY2VfY29sb3VycyhcXHJcXG4gICAgICAgICAgICBkYXRhLmltYWdlLmRhdGEsXFxyXFxuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nLnJlcGxhY2VDb2xvdXJNYXAuYmxhY2ssXFxyXFxuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nLnJlcGxhY2VDb2xvdXJNYXAud2hpdGVcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGRhdGE7XFxyXFxufVxcclxcblxcclxcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcXFwibWVzc2FnZVxcXCIsIGZ1bmN0aW9uIChlKSB7IHNlbGYucG9zdE1lc3NhZ2UoZGl0aGVyKGUuZGF0YSkpOyB9LCBmYWxzZSk7XFxyXFxuICBgO1xcclxcblxcclxcbiAgLy8gU2luY2Ugd2UgY2Fubm90IGxvYWQgZXh0ZXJuYWwgc2NyaXB0IGJ1dCB3ZWJ3b3JrZXIgbmVlZHMgYSBVUkxcXHJcXG4gIC8vIGNvbnZlcnQgdGhlIGNvZGUgdGhhbiBpcyBtZWFudCB0byBydW4gaW4gdGhlIHdlYndvcmtlciB0b1xcclxcbiAgLy8gVVJMIEJMT0IgYW5kIHBhc3MgaXQgaW50byB0aGUgd2Vid29ya2VyLlxcclxcbiAgLy8gTmVhdCB0cmljazpcXHJcXG5cXHJcXG4gIGZ1bmN0aW9uIGxvYWRXZWJXb3JrZXIoc2NyaXB0KSB7XFxyXFxuICAgIHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3NjcmlwdF0pKSk7XFxyXFxuICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBMT0dJQ1MgZm9yIGpvYiBwcm9jZXNzaW5nXFxyXFxuICAvLy8vLyBFbnRyeSBwb2ludCB0byBkaXRoZXJpbmcgb2YgdGhlIHByb3ZpZGVkIGltYWdlIGpvYnMgLi4uXFxyXFxuXFxyXFxuXFxyXFxuICAvLyBFbmNvZGluZyBhbiBpbWFnZSBpcyBhbHNvIGRvbmUgYnkgc3RpY2tpbmcgcGl4ZWxzIGluIGFuXFxyXFxuICAvLyBIVE1MIGNhbnZhcyBhbmQgYnkgYXNraW5nIHRoZSBjYW52YXMgdG8gc2VyaWFsaXplIGl0IGludG9cXHJcXG4gIC8vIGFuIGFjdHVhbCBQTkcgZmlsZSB2aWEgY2FudmFzLnRvQmxvYigpLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZW5jb2RlKGNhbnZhcywgY3R4LCBpbWFnZURhdGEpIHtcXHJcXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXFxyXFxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHtcXHJcXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcXHJcXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpKVxcclxcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdDb3VsZCBub3QgcmVhZCBmcm9tIGJsb2InKSlcXHJcXG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxcclxcbiAgICAgIH0pXFxyXFxuICAgIH0pXFxyXFxuICB9XFxyXFxuXFxyXFxuICAvLyBEZWNvZGluZyBhbiBpbWFnZSBjYW4gYmUgZG9uZSBieSBzdGlja2luZyBpdCBpbiBhbiBIVE1MXFxyXFxuICAvLyBjYW52YXMsIGFzIHdlIGNhbiByZWFkIGluZGl2aWR1YWwgcGl4ZWxzIG9mZiB0aGUgY2FudmFzLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcykge1xcclxcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtieXRlc10pKVxcclxcbiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXHJcXG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxcclxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltZylcXHJcXG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHJlamVjdCgpXFxyXFxuICAgICAgaW1nLnNyYyA9IHVybFxcclxcbiAgICB9KVxcclxcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aFxcclxcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XFxyXFxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXFxyXFxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodClcXHJcXG4gICAgcmV0dXJuIHtcXHJcXG4gICAgICBpbWFnZURhdGE6IGltYWdlRGF0YSxcXHJcXG4gICAgICB3aWR0aDogaW1hZ2Uud2lkdGgsXFxyXFxuICAgICAgaGVpZ2h0OiBpbWFnZS53aWR0aFxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAxLiBTcGluIG9uIG91ciBtYWdpbmZpY2llbnQgd2Vid29ya2VyIC4uLlxcclxcbiAgd2luZG93LkRJVEhFUl9XT1JLRVIgPSBsb2FkV2ViV29ya2VyKHdvcmtlclNjcmlwdCk7XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vIDIuIENoaWxsLCB0aWxsIHRoZSB1c2VyIHNlbmRzIGEgam9iLi4uLlxcclxcbiAgLy8gQ3JlYXRlIGFuIGV2ZW50IGhhbmRsZXIgdG8gcmVjZWl2ZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluXFxyXFxuICAvLyB0aHJlYWQuXFxyXFxuICB3aW5kb3cub25tZXNzYWdlID0gYXN5bmMgZXZlbnQgPT4ge1xcclxcbiAgICAvLyBKdXN0IGdldCB0aGUgYnl0ZXMgZGlyZWN0bHkgZnJvbSB0aGUgcGx1Z2luTWVzc2FnZSBzaW5jZVxcclxcbiAgICAvLyB0aGF0J3MgdGhlIG9ubHkgdHlwZSBvZiBtZXNzYWdlIHdlJ2xsIHJlY2VpdmUgaW4gdGhpc1xcclxcbiAgICAvLyBwbHVnaW4uIEluIG1vcmUgY29tcGxleCBwbHVnaW5zLCB5b3UnbGwgd2FudCB0byBjaGVjayB0aGVcXHJcXG4gICAgLy8gdHlwZSBvZiB0aGUgbWVzc2FnZS5cXHJcXG5cXHJcXG4gICAgLy8gY29udGFpbiB0aGUgcHJvY2Vzc2VkIChkaXRoZXJlZCkgaW1hZ2VieXRlcy4uLlxcclxcbiAgICBjb25zdCByZXN1bHRzID0gW107XFxyXFxuXFxyXFxuICAgIC8vICA9PiBUYWtlIGEgbG9vayBhdCB0aGUgc2VudCBkYXRhLlxcclxcbiAgICBjb25zdCByZWN2ZWREYXRhID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xcclxcblxcclxcbiAgICAvLyBFeHRyYWN0IHRoZSBqb2JzLi5cXHJcXG4gICAgY29uc3Qgam9icyA9IHJlY3ZlZERhdGEuam9icztcXHJcXG5cXHJcXG4gICAgLy8gV2UgcHJvY2VzcyB0aGUgam9iIG9uZSBhZnRlciB0aGUgb3RoZXIuLi5cXHJcXG4gICAgZm9yIChjb25zdCBqb2Igb2Ygam9icykge1xcclxcblxcclxcbiAgICAgIC8vIHllYWggd2UgbmVlZCB0byByZXNsb3ZlIHR3byBwcm9taXNlcyBiZWZvcmUgd2UgcHJvY2VlZCB0byB0aGUgbmV4dCBqb2JcXHJcXG4gICAgICByZXN1bHRzLnB1c2goe1xcclxcbiAgICAgICAgaW1hZ2VCeXRlczogYXdhaXQgKGF3YWl0IHByb2Nlc3NEaXRoZXIoam9iLCByZWN2ZWREYXRhLm9wdGlvbnMpKSxcXHJcXG4gICAgICAgIGZpbGxEYXRhOiBqb2IuZmlsbERhdGFcXHJcXG4gICAgICB9KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAvLyBTaW5jZSB3ZSBhcmUgY29tcGxldGVseSBkb25lIHdpdGggb3VyIGpvYnMsIGtpbGwgdGhlIFdlYndvcmtlci4uLlxcclxcbiAgICB3aW5kb3cuRElUSEVSX1dPUktFUi50ZXJtaW5hdGUoKTtcXHJcXG5cXHJcXG4gICAgLy8gU2VuZCB0aGUgcmVzdWx0IGJhY2sgdG8gdGhlIFVzZXIuLlxcclxcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcXHJcXG4gICAgICBwbHVnaW5NZXNzYWdlOiByZXN1bHRzXFxyXFxuICAgIH0sIFxcXCIqXFxcIik7XFxyXFxuICB9O1xcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vIDMuIFRoaXMgbWV0aG9kIHNlbmRzIGEgam9iIHJlcXVlc3QgdG8gdGhlIHdlYiB3b3JrZXIgYW5kIHdhaXQgdGlsbCBzb21ldGhpbmcgaGFwcGVucy4uXFxyXFxuXFxyXFxuICBhc3luYyBmdW5jdGlvbiBwcm9jZXNzRGl0aGVyKGpvYiwgb3B0aW9ucykge1xcclxcbiAgICBjb25zdCBieXRlcyA9IGpvYi5pbWFnZUJ5dGVzO1xcclxcblxcclxcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxcXCJjYW52YXNcXFwiKTtcXHJcXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXFxcIjJkXFxcIik7XFxyXFxuXFxyXFxuICAgIGNvbnN0IGltYWdlRGV0YWlscyA9IGF3YWl0IGRlY29kZShjYW52YXMsIGN0eCwgYnl0ZXMpO1xcclxcbiAgICAvLyBjb25zb2xlLmxvZyhpbWFnZURldGFpbHMpO1xcclxcbiAgICBjb25zdCBwcmVzZXQgPSB7XFxyXFxuICAgICAgaW1hZ2U6IHtcXHJcXG4gICAgICAgIGRhdGE6IGltYWdlRGV0YWlscy5pbWFnZURhdGEsXFxyXFxuICAgICAgICB3aWR0aDogaW1hZ2VEZXRhaWxzLndpZHRoLFxcclxcbiAgICAgICAgaGVpZ2h0OiBpbWFnZURldGFpbHMuaGVpZ2h0XFxyXFxuICAgICAgfSxcXHJcXG4gICAgICBwcm9jZXNzaW5nOiB7XFxyXFxuICAgICAgICBncmV5c2NhbGVNZXRob2Q6IG9wdGlvbnMuZ3JleXNjYWxlX21ldGhvZCxcXHJcXG4gICAgICAgIGRpdGhlck1ldGhvZDogb3B0aW9ucy5kaXRoZXJfbWV0aG9kLFxcclxcbiAgICAgICAgZGl0aGVyVGhyZXNob2xkOiBvcHRpb25zLnRocmVzaG9sZCxcXHJcXG4gICAgICAgIHJlcGxhY2VDb2xvdXJzOiBvcHRpb25zLmNoa19yZXBsYWNlX2NvbG91cnMsXFxyXFxuICAgICAgICByZXBsYWNlQ29sb3VyTWFwOiB7XFxyXFxuICAgICAgICAgIGJsYWNrOiB7XFxyXFxuICAgICAgICAgICAgcjogb3B0aW9ucy5yZXBfYmxhY2tbMF0sXFxyXFxuICAgICAgICAgICAgZzogb3B0aW9ucy5yZXBfYmxhY2tbMV0sXFxyXFxuICAgICAgICAgICAgYjogb3B0aW9ucy5yZXBfYmxhY2tbMl0sXFxyXFxuICAgICAgICAgICAgYTogb3B0aW9ucy5yZXBfYmxhY2tbM11cXHJcXG4gICAgICAgICAgfSxcXHJcXG4gICAgICAgICAgd2hpdGU6IHtcXHJcXG4gICAgICAgICAgICByOiBvcHRpb25zLnJlcF93aGl0ZVswXSxcXHJcXG4gICAgICAgICAgICBnOiBvcHRpb25zLnJlcF93aGl0ZVsxXSxcXHJcXG4gICAgICAgICAgICBiOiBvcHRpb25zLnJlcF93aGl0ZVsyXSxcXHJcXG4gICAgICAgICAgICBhOiBvcHRpb25zLnJlcF93aGl0ZVszXVxcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICB9O1xcclxcblxcclxcbiAgICAvLyBTdGFydCB0aW1lciB0byB0cmFjayB0aGUgdGltZSB0aGF0IGlzIHNwZW50IG9uIHRoaXMgY3VycmVudCBqb2IgLi4uXFxyXFxuICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS50aW1lKSB7XFxyXFxuICAgICAgY29uc29sZS5sb2coXFxcIlN0YXJ0aW5nIFdlYiBXb3JrZXIgZm9yIGltYWdlIChcXFwiICsgaW1hZ2VEZXRhaWxzLndpZHRoICsgXFxcInhcXFwiICsgaW1hZ2VEZXRhaWxzLmhlaWdodCArXFxyXFxuICAgICAgICBcXFwiLCBHcmV5c2NhbGUgTWV0aG9kOiBcXFwiICsgb3B0aW9ucy5ncmV5c2NhbGVfbWV0aG9kICsgXFxcIiwgRGl0aGVyIE1ldGhvZDogXFxcIiArIG9wdGlvbnMuZGl0aGVyX21ldGhvZCArIFxcXCIpXFxcIik7XFxyXFxuICAgICAgY29uc29sZS50aW1lKFxcXCJXZWIgd29ya2VyIHRvb2tcXFwiKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAvLyBTZW5kIGpvYiB0byB3ZWJ3b3JrZXJcXHJcXG4gICAgd2luZG93LkRJVEhFUl9XT1JLRVIucG9zdE1lc3NhZ2UocHJlc2V0KTtcXHJcXG5cXHJcXG4gICAgLy8gTk9USUNFOiBIZXJlIHRvIGF2b2lkIG1lbW9yeSBsZWFrcywgd2UgYXJlIHVzaW5nIGEgb25lIHRpbWUgZXZlbnQgbGlzdG5lci4uXFxyXFxuICAgIC8vIHRoZXJlZm9yZSBlYWNoIGpvYiBhcHBsaWVzIGFuIGV2ZW50IGxpc3RuZXIgdG8gdGhlIHdvcmtlciBhbmQgb25jZSB0aGUgd29ya2Vycz1cXHJcXG4gICAgLy8gc2VuZHMgdGhlIHJlc3VsdCBiYWNrLCB3ZSBkaXNwb3NlL3VucmVnaXN0ZXIgdGhlIGV2ZW50IGxpc3RuZXIuLi5cXHJcXG5cXHJcXG4gICAgY29uc3Qgd29ya2VyUmVzdWx0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xcclxcbiAgICAgIC8vIEdldCByZXBseSBmcm9tIHdlYndvcmtlclxcclxcbiAgICAgIGNvbnN0IG9uZVRpbWVMaXN0ZW4gPSBmdW5jdGlvbiAoZSkge1xcclxcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Jlc3VsdCcsIGUpO1xcclxcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRpbWUpIHtcXHJcXG4gICAgICAgICAgY29uc29sZS50aW1lRW5kKFxcXCJXZWIgd29ya2VyIHRvb2tcXFwiKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGUuZGF0YTtcXHJcXG4gICAgICAgIGVuY29kZShjYW52YXMsIGN0eCwgcmVzdWx0LmltYWdlLmRhdGEpLnRoZW4obmV3Qnl0ZXMgPT4ge1xcclxcblxcclxcbiAgICAgICAgICAvLyBtYWtlIGl0IGEgb25lIHRpbWUgZXZlbnQgbGlzdG5lci4uLlxcclxcbiAgICAgICAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25lVGltZUxpc3Rlbik7XFxyXFxuICAgICAgICAgIHJlc29sdmUobmV3Qnl0ZXMpO1xcclxcbiAgICAgICAgfSk7XFxyXFxuICAgICAgfTtcXHJcXG5cXHJcXG4gICAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25lVGltZUxpc3RlbiwgZmFsc2UpO1xcclxcbiAgICB9KTtcXHJcXG5cXHJcXG4gICAgcmV0dXJuIHdvcmtlclJlc3VsdDtcXHJcXG4gIH1cXHJcXG48L3NjcmlwdD5cIiJdLCJzb3VyY2VSb290IjoiIn0=