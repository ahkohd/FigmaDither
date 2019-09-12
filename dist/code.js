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
let previewNodes = [];
/**
 * Sets up the preview node and sends it image bytes to the ui
 * @param  {SceneNode} previewNode
 * @param  {ImageFillData} firstImagefillsDataOnPreview
 */
function setupPreview(previewNode) {
    // send preview image bytes to the ui
    firstImagefillsDataOnPreview = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getImageFillsFromNode"])(previewNode)[0];
    Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getImageBytes"])(firstImagefillsDataOnPreview.imageFill).then(bytes => {
        figma.ui.postMessage({ imageBytes: bytes, type: 'preview-node-image-bytes' });
    });
}
function getPreview() {
    return previewNodes[previewNodes.length - 1];
}
function addNewPreviewNode(callback) {
    const result = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["filterNodesWithFills"])(figma.currentPage.selection);
    if (result.length == 0) {
        figma.notify('Figma Dither: Please select at lease one item with image fill.', {
            timeout: 1000
        });
        return;
    }
    else if (result.length > 1) {
        figma.notify('Figma Dither: More than one selection disables live preview.', {
            timeout: 1000
        });
        return;
    }
    previewNodes.push(figma.currentPage.selection[0].clone());
    if (callback)
        callback();
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
    if (Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["multipleSelections"])()) {
        figma.notify('Figma Dither: More than one selection disables live preview.');
    }
    else {
        addNewPreviewNode();
    }
    // This shows the HTML page in "ui.html".
    figma.showUI(__html__, { height: 500, width: 270 });
    setupPreview(getPreview());
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
                    Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["closePlugin"])(getPreview());
                });
            }
        }
        if (msg.type === "cancel") {
            Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["closePlugin"])(getPreview());
        }
        if (msg.type == "processed-preview-imagebytes") {
            console.log('processed bytes', msg.imageBytes);
            // apply processed image to preview node..
            const result = {
                fillData: firstImagefillsDataOnPreview,
                imageBytes: msg.imageBytes
            };
            try {
                Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["applyProcessResults"])([result], [firstImagefillsDataOnPreview], false, () => {
                    console.log('preview result applied!');
                });
            }
            catch (e) { }
        }
        if (msg.type == 'destory-preview') {
            if (previewNodes.length != 0) {
                previewNodes.forEach(node => {
                    if (!node.removed)
                        node.remove();
                });
            }
            previewNodes = [];
        }
        if (msg.type == 'show-preview') {
            addNewPreviewNode(() => {
                figma.notify('Figma Dither: Re-rendering preview 🤳', {
                    timeout: 1000
                });
                setupPreview(getPreview());
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBb0w7QUFDcEw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3RUFBcUI7QUFDeEQsSUFBSSxnRUFBYTtBQUNqQiw4QkFBOEIsc0RBQXNEO0FBQ3BGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVFQUFvQjtBQUN2QztB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LyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbnMsIGZpbHRlck5vZGVzV2l0aEZpbGxzLCBEb0ltYWdlRGl0aGVyLCBtdWx0aXBsZVNlbGVjdGlvbnMsIGNsb3NlUGx1Z2luLCBnZXRJbWFnZUJ5dGVzLCBnZXRJbWFnZUZpbGxzRnJvbU5vZGUsIGFwcGx5UHJvY2Vzc1Jlc3VsdHMgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcclxubGV0IGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXc7XHJcbmxldCBwcmV2aWV3Tm9kZXMgPSBbXTtcclxuLyoqXHJcbiAqIFNldHMgdXAgdGhlIHByZXZpZXcgbm9kZSBhbmQgc2VuZHMgaXQgaW1hZ2UgYnl0ZXMgdG8gdGhlIHVpXHJcbiAqIEBwYXJhbSAge1NjZW5lTm9kZX0gcHJldmlld05vZGVcclxuICogQHBhcmFtICB7SW1hZ2VGaWxsRGF0YX0gZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlld1xyXG4gKi9cclxuZnVuY3Rpb24gc2V0dXBQcmV2aWV3KHByZXZpZXdOb2RlKSB7XHJcbiAgICAvLyBzZW5kIHByZXZpZXcgaW1hZ2UgYnl0ZXMgdG8gdGhlIHVpXHJcbiAgICBmaXJzdEltYWdlZmlsbHNEYXRhT25QcmV2aWV3ID0gZ2V0SW1hZ2VGaWxsc0Zyb21Ob2RlKHByZXZpZXdOb2RlKVswXTtcclxuICAgIGdldEltYWdlQnl0ZXMoZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlldy5pbWFnZUZpbGwpLnRoZW4oYnl0ZXMgPT4ge1xyXG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgaW1hZ2VCeXRlczogYnl0ZXMsIHR5cGU6ICdwcmV2aWV3LW5vZGUtaW1hZ2UtYnl0ZXMnIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UHJldmlldygpIHtcclxuICAgIHJldHVybiBwcmV2aWV3Tm9kZXNbcHJldmlld05vZGVzLmxlbmd0aCAtIDFdO1xyXG59XHJcbmZ1bmN0aW9uIGFkZE5ld1ByZXZpZXdOb2RlKGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBmaWx0ZXJOb2Rlc1dpdGhGaWxscyhmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pO1xyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeSgnRmlnbWEgRGl0aGVyOiBQbGVhc2Ugc2VsZWN0IGF0IGxlYXNlIG9uZSBpdGVtIHdpdGggaW1hZ2UgZmlsbC4nLCB7XHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeSgnRmlnbWEgRGl0aGVyOiBNb3JlIHRoYW4gb25lIHNlbGVjdGlvbiBkaXNhYmxlcyBsaXZlIHByZXZpZXcuJywge1xyXG4gICAgICAgICAgICB0aW1lb3V0OiAxMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHJldmlld05vZGVzLnB1c2goZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uWzBdLmNsb25lKCkpO1xyXG4gICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbn1cclxuLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgbW9kYWwgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbnVtYmVyLCBhbmRcclxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgcmVjdGFuZ2xlcyBvbiB0aGUgc2NyZWVuLlxyXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXHJcbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxyXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxyXG5pZiAoZmlsdGVyTm9kZXNXaXRoRmlsbHMoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKS5sZW5ndGggPT0gMCkge1xyXG4gICAgZmlnbWEubm90aWZ5KCdGaWdtYSBEaXRoZXI6IFBsZWFzZSBzZWxlY3QgYXQgbGVhc2Ugb25lIGl0ZW0gd2l0aCBpbWFnZSBmaWxsLicpO1xyXG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxufVxyXG5lbHNlIHtcclxuICAgIGlmIChtdWx0aXBsZVNlbGVjdGlvbnMoKSkge1xyXG4gICAgICAgIGZpZ21hLm5vdGlmeSgnRmlnbWEgRGl0aGVyOiBNb3JlIHRoYW4gb25lIHNlbGVjdGlvbiBkaXNhYmxlcyBsaXZlIHByZXZpZXcuJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBhZGROZXdQcmV2aWV3Tm9kZSgpO1xyXG4gICAgfVxyXG4gICAgLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG4gICAgZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IGhlaWdodDogNTAwLCB3aWR0aDogMjcwIH0pO1xyXG4gICAgc2V0dXBQcmV2aWV3KGdldFByZXZpZXcoKSk7XHJcbiAgICAvLyBDYWxscyB0byBcInBhcmVudC5wb3N0TWVzc2FnZVwiIGZyb20gd2l0aGluIHRoZSBIVE1MIHBhZ2Ugd2lsbCB0cmlnZ2VyIHRoaXNcclxuICAgIC8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxyXG4gICAgLy8gcG9zdGVkIG1lc3NhZ2UuXHJcbiAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJkaXRoZXItaW1hZ2VcIikge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9ucyA9IGZpbHRlck5vZGVzV2l0aEZpbGxzKGdldEN1cnJlbnRTZWxlY3Rpb25zKCkpO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFNlbGVjdGlvbnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeSgn8J+YhSBQbGVhc2Ugc2VsZWN0IGl0ZW0ocykgd2l0aCBpbWFnZSBmaWxsJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zLCBtc2cub3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQbHVnaW4oZ2V0UHJldmlldygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PT0gXCJjYW5jZWxcIikge1xyXG4gICAgICAgICAgICBjbG9zZVBsdWdpbihnZXRQcmV2aWV3KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnLnR5cGUgPT0gXCJwcm9jZXNzZWQtcHJldmlldy1pbWFnZWJ5dGVzXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Byb2Nlc3NlZCBieXRlcycsIG1zZy5pbWFnZUJ5dGVzKTtcclxuICAgICAgICAgICAgLy8gYXBwbHkgcHJvY2Vzc2VkIGltYWdlIHRvIHByZXZpZXcgbm9kZS4uXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGxEYXRhOiBmaXJzdEltYWdlZmlsbHNEYXRhT25QcmV2aWV3LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VCeXRlczogbXNnLmltYWdlQnl0ZXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGFwcGx5UHJvY2Vzc1Jlc3VsdHMoW3Jlc3VsdF0sIFtmaXJzdEltYWdlZmlsbHNEYXRhT25QcmV2aWV3XSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJldmlldyByZXN1bHQgYXBwbGllZCEnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1zZy50eXBlID09ICdkZXN0b3J5LXByZXZpZXcnKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmV2aWV3Tm9kZXMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHByZXZpZXdOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZS5yZW1vdmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlld05vZGVzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PSAnc2hvdy1wcmV2aWV3Jykge1xyXG4gICAgICAgICAgICBhZGROZXdQcmV2aWV3Tm9kZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoJ0ZpZ21hIERpdGhlcjogUmUtcmVuZGVyaW5nIHByZXZpZXcg8J+ksycsIHtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMDAwXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHNldHVwUHJldmlldyhnZXRQcmV2aWV3KCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBRdWV1ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZW5xdWV1ZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcbiAgICBkZXF1ZXVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZS5zaGlmdCgpO1xyXG4gICAgfVxyXG4gICAgdG9BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJy4vUXVldWUnO1xyXG5pbXBvcnQgd29ya2VyVGVtcGxhdGUgZnJvbSAnLi4vd29ya2VyL2VudHJ5Lmh0bWwnO1xyXG4vKipcclxuICogR2V0cyB0aGUgY3VycmVudCBVc2VyIFNlbGVjdGlvbihzKVxyXG4gKiBAcmV0dXJucyByZWFkb25seSBTY2VuZU5vZGVbXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTZWxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcclxufVxyXG4vKipcclxuICogRmlsdGVycyBub2RlcyB0aGF0IGhhdmUgSW1hZ2UgZmlsbHMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IG5vZGVzXHJcbiAqIEByZXR1cm5zIFNjZW5lTm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlck5vZGVzV2l0aEZpbGxzKG5vZGVzKSB7XHJcbiAgICBjb25zdCBub2RlV2l0aEZpbGxzID0gbm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xyXG4gICAgICAgIGlmIChcImZpbGxzXCIgaW4gbm9kZSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGwgb2Ygbm9kZS5maWxscykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGwudHlwZSA9PSBcIklNQUdFXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5vZGVXaXRoRmlsbHMubGVuZ3RoID09IDAgPyBbXSA6IG5vZGVXaXRoRmlsbHM7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG9iamVjdCBpcyBpdGVyYXRhYmxlXHJcbiAqIEBwYXJhbSBvYmpcclxuICovXHJcbmZ1bmN0aW9uIF9pc0l0ZXJhYmxlKG9iaikge1xyXG4gICAgLy8gY2hlY2tzIGZvciBudWxsIGFuZCB1bmRlZmluZWRcclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2Ygb2JqW1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIjtcclxufVxyXG4vKipcclxuICogR2V0cyBhbGwgSW1hZ2UgZmlsbHMgZnJvbSBhIG5vZGUuXHJcbiAqIEBwYXJhbSAge1NjZW5lTm9kZX0gbm9kZSBOb2RlIHRvIGV4dHJhY3QgdGhlIGltYWdlIGZpbGxzXHJcbiAqIEByZXR1cm5zIEltYWdlRmlsbERhdGFbXSBBbiBhcnJheSBvZiBpbWFnZSBmaWxscyBvZiB0aGUgbm9kZSBhcyBJbWFnZUZpbGxEYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VGaWxsc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIGNvbnN0IHJlc3VsdGluZ0ltYWdlRmlsbHMgPSBbXTtcclxuICAgIGxldCBmaWxscyA9IG5vZGUuZmlsbHM7XHJcbiAgICBpZiAoX2lzSXRlcmFibGUoZmlsbHMpKSB7XHJcbiAgICAgICAgZmlsbHMgPSBmaWxscztcclxuICAgICAgICBmaWxscy5mb3JFYWNoKChmaWxsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsbC50eXBlID09IFwiSU1BR0VcIilcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ0ltYWdlRmlsbHMucHVzaCh7IGltYWdlRmlsbDogZmlsbCwgaW5kZXg6IGluZGV4LCBub2RlOiBub2RlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdGluZ0ltYWdlRmlsbHM7XHJcbn1cclxuLyoqXHJcbiAqIEdldHMgdGhlIEltYWdlQnl0ZXMgZnJvbSBhIEltYWdlUGFpbnQgZmlsbFxyXG4gKiBAcGFyYW0gIHtJbWFnZVBhaW50fSBmaWxsXHJcbiAqIEByZXR1cm5zIFByb21pc2U8VWludDhBcnJheT5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUJ5dGVzKGZpbGwpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWdtYS5nZXRJbWFnZUJ5SGFzaChmaWxsLmltYWdlSGFzaCk7XHJcbiAgICAgICAgY29uc3QgYnl0ZXMgPSB5aWVsZCBpbWFnZS5nZXRCeXRlc0FzeW5jKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFkZHMgYSBqb2IgdG8gdGhlIHRhc2sgcXVldWVcclxuICogQHBhcmFtICB7YW55fSB0YXNrXHJcbiAqIEBwYXJhbSAge1F1ZXVlPGFueT59IHF1ZXVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVGFza1RvUG9vbCh0YXNrLCBxdWV1ZSkge1xyXG4gICAgcXVldWUuZW5xdWV1ZSh0YXNrKTtcclxufVxyXG4vKipcclxuICogU3Bhd24gYSB3b3JrZXIgdG8gcHJvY2VzcyB0aGUgdGFza3MgaW4gdGhlIHRhc2sgcXVldWVcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWUgVGFzayBxdWV1ZVxyXG4gKiBAcmV0dXJucyBQcm9taXNlPEpvYlJlc3VsdFtdPiBSZXR1cm5zIGFuIGFycmF5IG9mIEpvYlJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NKb2JzKHF1ZXVlLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBqb2JzID0gcXVldWUudG9BcnJheSgpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJBbGwgam9ic1wiLCBqb2JzKTtcclxuICAgIC8vIENyZWF0ZSBhbiBpbnZpc2libGUgaWZyYW1lIHRvIGFjdCBhcyBhIFwid29ya2VyXCIgd2hpY2hcclxuICAgIC8vIHdpbGwgZG8gdGhlIHRhc2sgb2YgZGVjb2RpbmcgYW5kIHNlbmQgdXMgYSBtZXNzYWdlXHJcbiAgICAvLyB3aGVuIGl0J3MgZG9uZS5cclxuICAgIGZpZ21hLnNob3dVSSh3b3JrZXJUZW1wbGF0ZSwgeyB2aXNpYmxlOiB0cnVlLCB3aWR0aDogMjAwLCBoZWlnaHQ6IDEyNSB9KTtcclxuICAgIC8vIFNlbmQgdGhlIHJhdyBieXRlcyBvZiB0aGUgZmlsZSB0byB0aGUgd29ya2VyLlxyXG4gICAgLy8gY29uc29sZS5sb2coJ3NlbnQhJywgb3B0aW9ucyk7XHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IGpvYnM6IGpvYnMsIG9wdGlvbnM6IG9wdGlvbnMgfSk7XHJcbiAgICAvLyBXYWl0IGZvciB0aGUgd29ya2VyJ3MgcmVzcG9uc2UuXHJcbiAgICBjb25zdCBqb2JzUmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IHZhbHVlID0+IHJlc29sdmUodmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gam9ic1Jlc3VsdDtcclxufVxyXG4vKipcclxuICogQ29udmVydHMgSW1hZ2VCeXRlcyB0byBJbWFnZUhhc2ggYW5kIGFkZHMgdG8gSW1hZ2VQYWludFxyXG4gKiBAcGFyYW0gIHtVaW50OEFycmF5fSBieXRlcyAgSW1hZ2VieXRlcyB0byBjb252ZXJ0XHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IHBhaW50IEltYWdlUGFpbnQgdG8gYWRkIHRoZSBjb252ZXJ0ZWQgSW1hZ2VIYXNoXHJcbiAqIEByZXR1cm5zIEltYWdlUGFpbnQgUmV0dXJucyBhIG5ldyBJbWFnZVBhaW50IHdpdGggdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2ggYWRkZWQgdG8gaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShieXRlcywgcGFpbnQpIHtcclxuICAgIC8vIENyZWF0ZSBhIG5ldyBwYWludCBmb3IgdGhlIG5ldyBpbWFnZS5cclxuICAgIGNvbnN0IG5ld1BhaW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYWludCkpO1xyXG4gICAgbmV3UGFpbnQuaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UoYnl0ZXMpLmhhc2g7XHJcbiAgICByZXR1cm4gbmV3UGFpbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhcnJ5IG91dCB0aGUgaW1hZ2UgZGl0aGVyaW5nIHByb2NjZXNzZXMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMsIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IFRBU0tTID0gbmV3IFF1ZXVlKCk7XHJcbiAgICAgICAgbGV0IG5vZGVGaWxscyA9IFtdO1xyXG4gICAgICAgIGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEltYWdlRmlsbHMgPSBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2Rlc1dpdGhJbWFnZUZpbGxzLmZvckVhY2goZnVuY3Rpb24gKGZpbGxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2Fycnkgb3V0IGRpdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUJ5dGVzID0geWllbGQgZ2V0SW1hZ2VCeXRlcyhmaWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlRmlsbHMucHVzaChmaWxsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRhc2tUb1Bvb2woeyBpbWFnZUJ5dGVzOiBpbWFnZUJ5dGVzLCBmaWxsRGF0YTogZmlsbERhdGEgfSwgVEFTS1MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB3YWl0IHRpbGwgYWxsIGpvYnMgYXJlIGFkZGVkLi5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBwcm9jZXNzaW5nIGpvYnMuLlxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5UHJvY2Vzc1Jlc3VsdHMoeWllbGQgcHJvY2Vzc0pvYnMoVEFTS1MsIG9wdGlvbnMpLCBub2RlRmlsbHMsIG9wdGlvbnMua2VlcF9pbWFnZSwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFwcGxpZXMgdGhlIHByb2Nlc3NlZCBkaXRoZXIgZWZmZWN0IHRvIGFwcHJvcHJpYXRlIG5vZGVzXHJcbiAqIEBwYXJhbSAge0pvYlJlc3VsdFtdfSByZXN1bHRzXHJcbiAqIEBwYXJhbSAge0ltYWdlRmlsbERhdGFbXX0gbm9kZUZpbGxzXHJcbiAqIEBwYXJhbSAge2tlZXB9IGtlZXBJbWFnZUZpbGxzIEtlZXBzIHRoZSBvcmlnaW5hbCBpbWFnZSBmaWxsIGluc3RlYWQgb2YgcmVwbGFjaW5nIGl0Li5cclxuICogQHBhcmFtICB7YW55fSByZXNvbHZlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQcm9jZXNzUmVzdWx0cyhyZXN1bHRzLCBub2RlRmlsbHMsIGtlZXBJbWFnZUZpbGxzID0gZmFsc2UsIHJlc29sdmUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKG5vZGVGaWxscyk7XHJcbiAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvY2Vzc0RpdGhlckVmZmVjdCA9IEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKHJlc3VsdC5pbWFnZUJ5dGVzLCByZXN1bHQuZmlsbERhdGEuaW1hZ2VGaWxsKTtcclxuICAgICAgICAvLyBjbG9uZSB0aGUgbm9kZSBmaWxsc1xyXG4gICAgICAgIGNvbnN0IGNvcHlOb2RlRmlsbHMgPSBbLi4ubm9kZUZpbGxzW2luZGV4XS5ub2RlLmZpbGxzXTtcclxuICAgICAgICBpZiAoIWtlZXBJbWFnZUZpbGxzKSB7XHJcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGltYWdlIGZpbHRlclxyXG4gICAgICAgICAgICBjb3B5Tm9kZUZpbGxzLnNwbGljZShyZXN1bHQuZmlsbERhdGEuaW5kZXgsIDEsIHByb2Nlc3NEaXRoZXJFZmZlY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhlIG5ldyBpbWFnIGZpbHRlciB0byB0aGUgdG9wLi5cclxuICAgICAgICAgICAgY29weU5vZGVGaWxscy5wdXNoKHByb2Nlc3NEaXRoZXJFZmZlY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlRmlsbHNbaW5kZXhdLm5vZGUuZmlsbHMgPSBjb3B5Tm9kZUZpbGxzO1xyXG4gICAgfSk7XHJcbiAgICAvLyByZXNvbHZlIHRocmUgcHJvbWlzZSBhZnRlciBhcHBseWluZyBkaXRoZXJpbmcgZWZmZWN0LlxyXG4gICAgcmVzb2x2ZSgpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBsZVNlbGVjdGlvbnMoKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XHJcbiAgICByZXR1cm4gKHNlbGVjdGlvbi5sZW5ndGggPT0gMSkgPyBmYWxzZSA6IHRydWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUGx1Z2luKHByZXZpZXdOb2RlKSB7XHJcbiAgICBpZiAocHJldmlld05vZGUpXHJcbiAgICAgICAgcHJldmlld05vZGUucmVtb3ZlKCk7XHJcbiAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IFwiPHN0eWxlPlxcclxcbiAgYm9keSxcXHJcXG4gIGh0bWwge1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICoge1xcclxcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sb2FkZXJDb250YWluZXIge1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgaGVpZ2h0OiA1NXB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiA2NHB4O1xcclxcbiAgICBoZWlnaHQ6IDY0cHg7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoLjUpO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sb2FkaW5nLXRleHQge1xcclxcbiAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXHJcXG4gICAgZm9udC1zaXplOiAxMXB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGNvbG9yOiAjNTU1O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdiB7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHdpZHRoOiA1MXB4O1xcclxcbiAgICBoZWlnaHQ6IDUxcHg7XFxyXFxuICAgIGJvcmRlcjogNnB4IHNvbGlkICMwMGFjZWQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYW5pbWF0aW9uOiBsZHMtcmluZyAxLjJzIGN1YmljLWJlemllcigwLjUsIDAsIDAuNSwgMSkgaW5maW5pdGU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogIzAwYWNlZCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDEpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC40NXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgyKSB7XFxyXFxuICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMTVzO1xcclxcbiAgfVxcclxcblxcclxcbiAgQGtleWZyYW1lcyBsZHMtcmluZyB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuPC9zdHlsZT5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG48ZGl2IGNsYXNzPVxcXCJsb2FkZXJDb250YWluZXJcXFwiPlxcclxcbiAgPGRpdiBjbGFzcz1cXFwibGRzLXJpbmdcXFwiPlxcclxcbiAgICA8ZGl2PjwvZGl2PlxcclxcbiAgICA8ZGl2PjwvZGl2PlxcclxcbiAgICA8ZGl2PjwvZGl2PlxcclxcbiAgICA8ZGl2PjwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJsb2FkaW5nLXRleHRcXFwiPlxcclxcbiAgICBkaXRoZXJpbmcuLlxcclxcbiAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXFxyXFxuPHNjcmlwdD4gICAgXFxyXFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFdFQiBXT1JLRVIgc2NyaXB0IGluIHN0cmluZy4uLlxcclxcblxcclxcbiAgLy8gVGhlIGNvZGUgY29udGFpbmVkIGluIHRoaXMgc3RyaW5nIGlzIHRoZSBhY3R1YWwgbG9naWNzIHRvIG1hbmlwdWxhdGUgIGNhbnZhcyBpbWFnZVxcclxcbiAgLy8gYW5kIGNhcnJ5IG91dCB0aGUgZGl0aGVyaW5nIGVmZmVjdC4uXFxyXFxuXFxyXFxuICBjb25zdCB3b3JrZXJTY3JpcHQgPSBgXFxyXFxuICAvLyBDb252ZXJ0IGltYWdlIGRhdGEgdG8gZ3JleXNjYWxlIGJhc2VkIG9uIGx1bWluYW5jZS5cXHJcXG5mdW5jdGlvbiBncmV5c2NhbGVfbHVtaW5hbmNlKGltYWdlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDJdID0gcGFyc2VJbnQoXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpXSAqIDAuMjEgK1xcclxcbiAgICAgICAgICAgIGltYWdlLmRhdGFbaSArIDFdICogMC43MSArXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpICsgMl0gKiAwLjA3LFxcclxcbiAgICAgICAgICAgIDEwXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBpbWFnZTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ29udmVydCBpbWFnZSBkYXRhIHRvIGdyZXlzY2FsZSBiYXNlZCBvbiBhdmVyYWdlIG9mIFIsIEcgYW5kIEIgdmFsdWVzLlxcclxcbmZ1bmN0aW9uIGdyZXlzY2FsZV9hdmVyYWdlKGltYWdlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDJdID0gcGFyc2VJbnQoXFxyXFxuICAgICAgICAgICAgKGltYWdlLmRhdGFbaV0gKyBpbWFnZS5kYXRhW2kgKyAxXSArIGltYWdlLmRhdGFbaSArIDJdKSAvIDMsXFxyXFxuICAgICAgICAgICAgMTBcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGltYWdlO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBBcHBseSBBdGtpbnNvbiBEaXRoZXIgdG8gSW1hZ2UgRGF0YVxcclxcbmZ1bmN0aW9uIGRpdGhlcl9hdGtpbnNvbihpbWFnZSwgaW1hZ2VXaWR0aCwgZHJhd0NvbG91cikge1xcclxcbiAgICBza2lwUGl4ZWxzID0gNDtcXHJcXG5cXHJcXG4gICAgaWYgKCFkcmF3Q29sb3VyKSBkcmF3Q29sb3VyID0gZmFsc2U7XFxyXFxuXFxyXFxuICAgIGlmIChkcmF3Q29sb3VyID09IHRydWUpIHNraXBQaXhlbHMgPSAxO1xcclxcblxcclxcbiAgICBpbWFnZUxlbmd0aCA9IGltYWdlLmRhdGEubGVuZ3RoO1xcclxcblxcclxcbiAgICBmb3IgKFxcclxcbiAgICAgICAgY3VycmVudFBpeGVsID0gMDtcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCA8PSBpbWFnZUxlbmd0aDtcXHJcXG4gICAgICAgIGN1cnJlbnRQaXhlbCArPSBza2lwUGl4ZWxzXFxyXFxuICAgICkge1xcclxcbiAgICAgICAgaWYgKGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSA8PSAxMjgpIHtcXHJcXG4gICAgICAgICAgICBuZXdQaXhlbENvbG91ciA9IDA7XFxyXFxuICAgICAgICB9IGVsc2Uge1xcclxcbiAgICAgICAgICAgIG5ld1BpeGVsQ29sb3VyID0gMjU1O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZXJyID0gcGFyc2VJbnQoKGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSAtIG5ld1BpeGVsQ29sb3VyKSAvIDgsIDEwKTtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsXSA9IG5ld1BpeGVsQ29sb3VyO1xcclxcblxcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDhdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGggLSA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoXSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDQgKiBpbWFnZVdpZHRoICsgNF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA4ICogaW1hZ2VXaWR0aF0gKz0gZXJyO1xcclxcblxcclxcbiAgICAgICAgaWYgKGRyYXdDb2xvdXIgPT0gZmFsc2UpXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyAxXSA9IGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgMl0gPVxcclxcbiAgICAgICAgICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbF07XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgcmV0dXJuIGltYWdlLmRhdGE7XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIGRpdGhlcl90aHJlc2hvbGQoaW1hZ2UsIHRocmVzaG9sZF92YWx1ZSkge1xcclxcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBpbWFnZS5kYXRhLmxlbmd0aDsgaSArPSA0KSB7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2ldID0gaW1hZ2UuZGF0YVtpXSA+IHRocmVzaG9sZF92YWx1ZSA/IDI1NSA6IDA7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDFdID4gdGhyZXNob2xkX3ZhbHVlID8gMjU1IDogMDtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDJdID0gaW1hZ2UuZGF0YVtpICsgMl0gPiB0aHJlc2hvbGRfdmFsdWUgPyAyNTUgOiAwO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIHJlcGxhY2VfY29sb3VycyhpbWFnZSwgYmxhY2ssIHdoaXRlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2ldIDwgMTI3ID8gYmxhY2suciA6IHdoaXRlLnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAxXSA9IGltYWdlLmRhdGFbaSArIDFdIDwgMTI3ID8gYmxhY2suZyA6IHdoaXRlLmc7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAyXSA9IGltYWdlLmRhdGFbaSArIDJdIDwgMTI3ID8gYmxhY2suYiA6IHdoaXRlLmI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2kgKyAzXSA9XFxyXFxuICAgICAgICAgICAgKGltYWdlLmRhdGFbaV0gKyBpbWFnZS5kYXRhW2kgKyAxXSArIGltYWdlLmRhdGFbaSArIDJdKSAvIDMgPCAxMjdcXHJcXG4gICAgICAgICAgICAgICAgPyBibGFjay5hXFxyXFxuICAgICAgICAgICAgICAgIDogd2hpdGUuYTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5mdW5jdGlvbiBkaXRoZXIoZGF0YSkge1xcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiTHVtaW5hbmNlXFxcIikge1xcclxcbiAgICAgICAgZ3JleXNjYWxlX2x1bWluYW5jZShkYXRhLmltYWdlLmRhdGEpO1xcclxcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIlJHQiBBdmVyYWdlXFxcIikge1xcclxcbiAgICAgICAgZ3JleXNjYWxlX2F2ZXJhZ2UoZGF0YS5pbWFnZS5kYXRhKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLmRpdGhlck1ldGhvZCA9PSBcXFwiQXRraW5zb24gRGl0aGVyaW5nXFxcIikge1xcclxcbiAgICAgICAgZGl0aGVyX2F0a2luc29uKFxcclxcbiAgICAgICAgICAgIGRhdGEuaW1hZ2UuZGF0YSxcXHJcXG4gICAgICAgICAgICBkYXRhLmltYWdlLndpZHRoLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5ncmV5c2NhbGVNZXRob2QgPT0gXFxcIkRpc2FibGVkXFxcIlxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfSBlbHNlIGlmIChkYXRhLnByb2Nlc3NpbmcuZGl0aGVyTWV0aG9kID09IFxcXCJUaHJlc2hvbGRcXFwiKSB7XFxyXFxuICAgICAgICBkaXRoZXJfdGhyZXNob2xkKGRhdGEuaW1hZ2UuZGF0YSwgZGF0YS5wcm9jZXNzaW5nLmRpdGhlclRocmVzaG9sZCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaWYgKGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VycyA9PSB0cnVlKSB7XFxyXFxuICAgICAgICByZXBsYWNlX2NvbG91cnMoXFxyXFxuICAgICAgICAgICAgZGF0YS5pbWFnZS5kYXRhLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VyTWFwLmJsYWNrLFxcclxcbiAgICAgICAgICAgIGRhdGEucHJvY2Vzc2luZy5yZXBsYWNlQ29sb3VyTWFwLndoaXRlXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9XFxyXFxuICAgIHJldHVybiBkYXRhO1xcclxcbn1cXHJcXG5cXHJcXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXFxcIm1lc3NhZ2VcXFwiLCBmdW5jdGlvbiAoZSkgeyBzZWxmLnBvc3RNZXNzYWdlKGRpdGhlcihlLmRhdGEpKTsgfSwgZmFsc2UpO1xcclxcbiAgYDtcXHJcXG5cXHJcXG4gIC8vIFNpbmNlIHdlIGNhbm5vdCBsb2FkIGV4dGVybmFsIHNjcmlwdCBidXQgd2Vid29ya2VyIG5lZWRzIGEgVVJMXFxyXFxuICAvLyBjb252ZXJ0IHRoZSBjb2RlIHRoYW4gaXMgbWVhbnQgdG8gcnVuIGluIHRoZSB3ZWJ3b3JrZXIgdG9cXHJcXG4gIC8vIFVSTCBCTE9CIGFuZCBwYXNzIGl0IGludG8gdGhlIHdlYndvcmtlci5cXHJcXG4gIC8vIE5lYXQgdHJpY2s6XFxyXFxuXFxyXFxuICBmdW5jdGlvbiBsb2FkV2ViV29ya2VyKHNjcmlwdCkge1xcclxcbiAgICByZXR1cm4gbmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtzY3JpcHRdKSkpO1xcclxcbiAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gTE9HSUNTIGZvciBqb2IgcHJvY2Vzc2luZ1xcclxcbiAgLy8vLy8gRW50cnkgcG9pbnQgdG8gZGl0aGVyaW5nIG9mIHRoZSBwcm92aWRlZCBpbWFnZSBqb2JzIC4uLlxcclxcblxcclxcblxcclxcbiAgLy8gRW5jb2RpbmcgYW4gaW1hZ2UgaXMgYWxzbyBkb25lIGJ5IHN0aWNraW5nIHBpeGVscyBpbiBhblxcclxcbiAgLy8gSFRNTCBjYW52YXMgYW5kIGJ5IGFza2luZyB0aGUgY2FudmFzIHRvIHNlcmlhbGl6ZSBpdCBpbnRvXFxyXFxuICAvLyBhbiBhY3R1YWwgUE5HIGZpbGUgdmlhIGNhbnZhcy50b0Jsb2IoKS5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIGVuY29kZShjYW52YXMsIGN0eCwgaW1hZ2VEYXRhKSB7XFxyXFxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKVxcclxcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xcclxcbiAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XFxyXFxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXFxyXFxuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4gcmVzb2x2ZShuZXcgVWludDhBcnJheShyZWFkZXIucmVzdWx0KSlcXHJcXG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignQ291bGQgbm90IHJlYWQgZnJvbSBibG9iJykpXFxyXFxuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcXHJcXG4gICAgICB9KVxcclxcbiAgICB9KVxcclxcbiAgfVxcclxcblxcclxcbiAgLy8gRGVjb2RpbmcgYW4gaW1hZ2UgY2FuIGJlIGRvbmUgYnkgc3RpY2tpbmcgaXQgaW4gYW4gSFRNTFxcclxcbiAgLy8gY2FudmFzLCBhcyB3ZSBjYW4gcmVhZCBpbmRpdmlkdWFsIHBpeGVscyBvZmYgdGhlIGNhbnZhcy5cXHJcXG4gIGFzeW5jIGZ1bmN0aW9uIGRlY29kZShjYW52YXMsIGN0eCwgYnl0ZXMpIHtcXHJcXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYnl0ZXNdKSlcXHJcXG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcXHJcXG4gICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpXFxyXFxuICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoKVxcclxcbiAgICAgIGltZy5zcmMgPSB1cmxcXHJcXG4gICAgfSlcXHJcXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGhcXHJcXG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodFxcclxcbiAgICBjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwKVxcclxcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpXFxyXFxuICAgIHJldHVybiB7XFxyXFxuICAgICAgaW1hZ2VEYXRhOiBpbWFnZURhdGEsXFxyXFxuICAgICAgd2lkdGg6IGltYWdlLndpZHRoLFxcclxcbiAgICAgIGhlaWdodDogaW1hZ2Uud2lkdGhcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gMS4gU3BpbiBvbiBvdXIgbWFnaW5maWNpZW50IHdlYndvcmtlciAuLi5cXHJcXG4gIHdpbmRvdy5ESVRIRVJfV09SS0VSID0gbG9hZFdlYldvcmtlcih3b3JrZXJTY3JpcHQpO1xcclxcblxcclxcblxcclxcbiAgLy8vLy8vLyAyLiBDaGlsbCwgdGlsbCB0aGUgdXNlciBzZW5kcyBhIGpvYi4uLi5cXHJcXG4gIC8vIENyZWF0ZSBhbiBldmVudCBoYW5kbGVyIHRvIHJlY2VpdmUgbWVzc2FnZXMgZnJvbSB0aGUgbWFpblxcclxcbiAgLy8gdGhyZWFkLlxcclxcbiAgd2luZG93Lm9ubWVzc2FnZSA9IGFzeW5jIGV2ZW50ID0+IHtcXHJcXG4gICAgLy8gSnVzdCBnZXQgdGhlIGJ5dGVzIGRpcmVjdGx5IGZyb20gdGhlIHBsdWdpbk1lc3NhZ2Ugc2luY2VcXHJcXG4gICAgLy8gdGhhdCdzIHRoZSBvbmx5IHR5cGUgb2YgbWVzc2FnZSB3ZSdsbCByZWNlaXZlIGluIHRoaXNcXHJcXG4gICAgLy8gcGx1Z2luLiBJbiBtb3JlIGNvbXBsZXggcGx1Z2lucywgeW91J2xsIHdhbnQgdG8gY2hlY2sgdGhlXFxyXFxuICAgIC8vIHR5cGUgb2YgdGhlIG1lc3NhZ2UuXFxyXFxuXFxyXFxuICAgIC8vIGNvbnRhaW4gdGhlIHByb2Nlc3NlZCAoZGl0aGVyZWQpIGltYWdlYnl0ZXMuLi5cXHJcXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xcclxcblxcclxcbiAgICAvLyAgPT4gVGFrZSBhIGxvb2sgYXQgdGhlIHNlbnQgZGF0YS5cXHJcXG4gICAgY29uc3QgcmVjdmVkRGF0YSA9IGV2ZW50LmRhdGEucGx1Z2luTWVzc2FnZTtcXHJcXG5cXHJcXG4gICAgLy8gRXh0cmFjdCB0aGUgam9icy4uXFxyXFxuICAgIGNvbnN0IGpvYnMgPSByZWN2ZWREYXRhLmpvYnM7XFxyXFxuXFxyXFxuICAgIC8vIFdlIHByb2Nlc3MgdGhlIGpvYiBvbmUgYWZ0ZXIgdGhlIG90aGVyLi4uXFxyXFxuICAgIGZvciAoY29uc3Qgam9iIG9mIGpvYnMpIHtcXHJcXG5cXHJcXG4gICAgICAvLyB5ZWFoIHdlIG5lZWQgdG8gcmVzbG92ZSB0d28gcHJvbWlzZXMgYmVmb3JlIHdlIHByb2NlZWQgdG8gdGhlIG5leHQgam9iXFxyXFxuICAgICAgcmVzdWx0cy5wdXNoKHtcXHJcXG4gICAgICAgIGltYWdlQnl0ZXM6IGF3YWl0IChhd2FpdCBwcm9jZXNzRGl0aGVyKGpvYiwgcmVjdmVkRGF0YS5vcHRpb25zKSksXFxyXFxuICAgICAgICBmaWxsRGF0YTogam9iLmZpbGxEYXRhXFxyXFxuICAgICAgfSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLy8gU2luY2Ugd2UgYXJlIGNvbXBsZXRlbHkgZG9uZSB3aXRoIG91ciBqb2JzLCBraWxsIHRoZSBXZWJ3b3JrZXIuLi5cXHJcXG4gICAgd2luZG93LkRJVEhFUl9XT1JLRVIudGVybWluYXRlKCk7XFxyXFxuXFxyXFxuICAgIC8vIFNlbmQgdGhlIHJlc3VsdCBiYWNrIHRvIHRoZSBVc2VyLi5cXHJcXG4gICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XFxyXFxuICAgICAgcGx1Z2luTWVzc2FnZTogcmVzdWx0c1xcclxcbiAgICB9LCBcXFwiKlxcXCIpO1xcclxcbiAgfTtcXHJcXG5cXHJcXG5cXHJcXG4gIC8vLy8vLy8vLy8vLyAzLiBUaGlzIG1ldGhvZCBzZW5kcyBhIGpvYiByZXF1ZXN0IHRvIHRoZSB3ZWIgd29ya2VyIGFuZCB3YWl0IHRpbGwgc29tZXRoaW5nIGhhcHBlbnMuLlxcclxcblxcclxcbiAgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0RpdGhlcihqb2IsIG9wdGlvbnMpIHtcXHJcXG4gICAgY29uc3QgYnl0ZXMgPSBqb2IuaW1hZ2VCeXRlcztcXHJcXG5cXHJcXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcXFwiY2FudmFzXFxcIik7XFxyXFxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFxcXCIyZFxcXCIpO1xcclxcblxcclxcbiAgICBjb25zdCBpbWFnZURldGFpbHMgPSBhd2FpdCBkZWNvZGUoY2FudmFzLCBjdHgsIGJ5dGVzKTtcXHJcXG4gICAgLy8gY29uc29sZS5sb2coaW1hZ2VEZXRhaWxzKTtcXHJcXG4gICAgY29uc3QgcHJlc2V0ID0ge1xcclxcbiAgICAgIGltYWdlOiB7XFxyXFxuICAgICAgICBkYXRhOiBpbWFnZURldGFpbHMuaW1hZ2VEYXRhLFxcclxcbiAgICAgICAgd2lkdGg6IGltYWdlRGV0YWlscy53aWR0aCxcXHJcXG4gICAgICAgIGhlaWdodDogaW1hZ2VEZXRhaWxzLmhlaWdodFxcclxcbiAgICAgIH0sXFxyXFxuICAgICAgcHJvY2Vzc2luZzoge1xcclxcbiAgICAgICAgZ3JleXNjYWxlTWV0aG9kOiBvcHRpb25zLmdyZXlzY2FsZV9tZXRob2QsXFxyXFxuICAgICAgICBkaXRoZXJNZXRob2Q6IG9wdGlvbnMuZGl0aGVyX21ldGhvZCxcXHJcXG4gICAgICAgIGRpdGhlclRocmVzaG9sZDogb3B0aW9ucy50aHJlc2hvbGQsXFxyXFxuICAgICAgICByZXBsYWNlQ29sb3Vyczogb3B0aW9ucy5jaGtfcmVwbGFjZV9jb2xvdXJzLFxcclxcbiAgICAgICAgcmVwbGFjZUNvbG91ck1hcDoge1xcclxcbiAgICAgICAgICBibGFjazoge1xcclxcbiAgICAgICAgICAgIHI6IG9wdGlvbnMucmVwX2JsYWNrWzBdLFxcclxcbiAgICAgICAgICAgIGc6IG9wdGlvbnMucmVwX2JsYWNrWzFdLFxcclxcbiAgICAgICAgICAgIGI6IG9wdGlvbnMucmVwX2JsYWNrWzJdLFxcclxcbiAgICAgICAgICAgIGE6IG9wdGlvbnMucmVwX2JsYWNrWzNdXFxyXFxuICAgICAgICAgIH0sXFxyXFxuICAgICAgICAgIHdoaXRlOiB7XFxyXFxuICAgICAgICAgICAgcjogb3B0aW9ucy5yZXBfd2hpdGVbMF0sXFxyXFxuICAgICAgICAgICAgZzogb3B0aW9ucy5yZXBfd2hpdGVbMV0sXFxyXFxuICAgICAgICAgICAgYjogb3B0aW9ucy5yZXBfd2hpdGVbMl0sXFxyXFxuICAgICAgICAgICAgYTogb3B0aW9ucy5yZXBfd2hpdGVbM11cXHJcXG4gICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcbiAgICAgIH1cXHJcXG4gICAgfTtcXHJcXG5cXHJcXG4gICAgLy8gU3RhcnQgdGltZXIgdG8gdHJhY2sgdGhlIHRpbWUgdGhhdCBpcyBzcGVudCBvbiB0aGlzIGN1cnJlbnQgam9iIC4uLlxcclxcbiAgICBpZiAod2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUudGltZSkge1xcclxcbiAgICAgIGNvbnNvbGUubG9nKFxcXCJTdGFydGluZyBXZWIgV29ya2VyIGZvciBpbWFnZSAoXFxcIiArIGltYWdlRGV0YWlscy53aWR0aCArIFxcXCJ4XFxcIiArIGltYWdlRGV0YWlscy5oZWlnaHQgK1xcclxcbiAgICAgICAgXFxcIiwgR3JleXNjYWxlIE1ldGhvZDogXFxcIiArIG9wdGlvbnMuZ3JleXNjYWxlX21ldGhvZCArIFxcXCIsIERpdGhlciBNZXRob2Q6IFxcXCIgKyBvcHRpb25zLmRpdGhlcl9tZXRob2QgKyBcXFwiKVxcXCIpO1xcclxcbiAgICAgIGNvbnNvbGUudGltZShcXFwiV2ViIHdvcmtlciB0b29rXFxcIik7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLy8gU2VuZCBqb2IgdG8gd2Vid29ya2VyXFxyXFxuICAgIHdpbmRvdy5ESVRIRVJfV09SS0VSLnBvc3RNZXNzYWdlKHByZXNldCk7XFxyXFxuXFxyXFxuICAgIC8vIE5PVElDRTogSGVyZSB0byBhdm9pZCBtZW1vcnkgbGVha3MsIHdlIGFyZSB1c2luZyBhIG9uZSB0aW1lIGV2ZW50IGxpc3RuZXIuLlxcclxcbiAgICAvLyB0aGVyZWZvcmUgZWFjaCBqb2IgYXBwbGllcyBhbiBldmVudCBsaXN0bmVyIHRvIHRoZSB3b3JrZXIgYW5kIG9uY2UgdGhlIHdvcmtlcnM9XFxyXFxuICAgIC8vIHNlbmRzIHRoZSByZXN1bHQgYmFjaywgd2UgZGlzcG9zZS91bnJlZ2lzdGVyIHRoZSBldmVudCBsaXN0bmVyLi4uXFxyXFxuXFxyXFxuICAgIGNvbnN0IHdvcmtlclJlc3VsdCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcXHJcXG4gICAgICAvLyBHZXQgcmVwbHkgZnJvbSB3ZWJ3b3JrZXJcXHJcXG4gICAgICBjb25zdCBvbmVUaW1lTGlzdGVuID0gZnVuY3Rpb24gKGUpIHtcXHJcXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXN1bHQnLCBlKTtcXHJcXG4gICAgICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS50aW1lKSB7XFxyXFxuICAgICAgICAgIGNvbnNvbGUudGltZUVuZChcXFwiV2ViIHdvcmtlciB0b29rXFxcIik7XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgICBjb25zdCByZXN1bHQgPSBlLmRhdGE7XFxyXFxuICAgICAgICBlbmNvZGUoY2FudmFzLCBjdHgsIHJlc3VsdC5pbWFnZS5kYXRhKS50aGVuKG5ld0J5dGVzID0+IHtcXHJcXG5cXHJcXG4gICAgICAgICAgLy8gbWFrZSBpdCBhIG9uZSB0aW1lIGV2ZW50IGxpc3RuZXIuLi5cXHJcXG4gICAgICAgICAgd2luZG93LkRJVEhFUl9XT1JLRVIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uZVRpbWVMaXN0ZW4pO1xcclxcbiAgICAgICAgICByZXNvbHZlKG5ld0J5dGVzKTtcXHJcXG4gICAgICAgIH0pO1xcclxcbiAgICAgIH07XFxyXFxuXFxyXFxuICAgICAgd2luZG93LkRJVEhFUl9XT1JLRVIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uZVRpbWVMaXN0ZW4sIGZhbHNlKTtcXHJcXG4gICAgfSk7XFxyXFxuXFxyXFxuICAgIHJldHVybiB3b3JrZXJSZXN1bHQ7XFxyXFxuICB9XFxyXFxuPC9zY3JpcHQ+XCIiXSwic291cmNlUm9vdCI6IiJ9