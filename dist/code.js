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
/**
 * Gets the last created PreviewNode
 * @returns SceneNode
 */
function getPreview() {
    return previewNodes[previewNodes.length - 1];
}
/**
 * Adds a new PreviewNode to the existing ones.
 * @param  {} callback? Called after a successsfull addition
 */
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
    const isMultiple = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["multipleSelections"])();
    if (isMultiple) {
        figma.notify('Figma Dither: More than one selection disables live preview.');
    }
    else {
        addNewPreviewNode();
    }
    // This shows the HTML page in "ui.html".
    figma.showUI(__html__, { height: 500, width: 270 });
    if (!isMultiple) {
        setupPreview(getPreview());
    }
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
            // console.log('processed bytes', msg.imageBytes);
            // apply processed image to preview node..
            const result = {
                fillData: firstImagefillsDataOnPreview,
                imageBytes: msg.imageBytes
            };
            try {
                Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["applyProcessResults"])([result], [firstImagefillsDataOnPreview], false, () => {
                    // console.log('preview result applied!');
                });
            }
            catch (e) { }
        }
        // Destroys all existing PreviewNode..
        if (msg.type == 'destory-preview' || msg.type == 'disable-preview') {
            if (previewNodes.length != 0) {
                previewNodes.forEach(node => {
                    if (!node.removed)
                        node.remove();
                });
            }
            previewNodes = [];
        }
        // Trys to add a new PreviewNode...
        // if it fails - (1). because no GemetryMixin is selected
        // (2). More than one Nodes selected.
        if (msg.type == 'show-preview' || msg.type == 'enable-preview') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBb0w7QUFDcEw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFVBQVU7QUFDdEIsWUFBWSxjQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3RUFBcUI7QUFDeEQsSUFBSSxnRUFBYTtBQUNqQiw4QkFBOEIsc0RBQXNEO0FBQ3BGLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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RUFBRSxZQUFZLHFGQUFxRixTQUFTLEVBQUUsZ0NBQWdDLE9BQU8sYyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImltcG9ydCB7IGdldEN1cnJlbnRTZWxlY3Rpb25zLCBmaWx0ZXJOb2Rlc1dpdGhGaWxscywgRG9JbWFnZURpdGhlciwgbXVsdGlwbGVTZWxlY3Rpb25zLCBjbG9zZVBsdWdpbiwgZ2V0SW1hZ2VCeXRlcywgZ2V0SW1hZ2VGaWxsc0Zyb21Ob2RlLCBhcHBseVByb2Nlc3NSZXN1bHRzIH0gZnJvbSBcIi4vbGliL3V0aWxzXCI7XHJcbmxldCBmaXJzdEltYWdlZmlsbHNEYXRhT25QcmV2aWV3O1xyXG5sZXQgcHJldmlld05vZGVzID0gW107XHJcbi8qKlxyXG4gKiBTZXRzIHVwIHRoZSBwcmV2aWV3IG5vZGUgYW5kIHNlbmRzIGl0IGltYWdlIGJ5dGVzIHRvIHRoZSB1aVxyXG4gKiBAcGFyYW0gIHtTY2VuZU5vZGV9IHByZXZpZXdOb2RlXHJcbiAqIEBwYXJhbSAge0ltYWdlRmlsbERhdGF9IGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXdcclxuICovXHJcbmZ1bmN0aW9uIHNldHVwUHJldmlldyhwcmV2aWV3Tm9kZSkge1xyXG4gICAgLy8gc2VuZCBwcmV2aWV3IGltYWdlIGJ5dGVzIHRvIHRoZSB1aVxyXG4gICAgZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlldyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShwcmV2aWV3Tm9kZSlbMF07XHJcbiAgICBnZXRJbWFnZUJ5dGVzKGZpcnN0SW1hZ2VmaWxsc0RhdGFPblByZXZpZXcuaW1hZ2VGaWxsKS50aGVuKGJ5dGVzID0+IHtcclxuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IGltYWdlQnl0ZXM6IGJ5dGVzLCB0eXBlOiAncHJldmlldy1ub2RlLWltYWdlLWJ5dGVzJyB9KTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBsYXN0IGNyZWF0ZWQgUHJldmlld05vZGVcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQcmV2aWV3KCkge1xyXG4gICAgcmV0dXJuIHByZXZpZXdOb2Rlc1twcmV2aWV3Tm9kZXMubGVuZ3RoIC0gMV07XHJcbn1cclxuLyoqXHJcbiAqIEFkZHMgYSBuZXcgUHJldmlld05vZGUgdG8gdGhlIGV4aXN0aW5nIG9uZXMuXHJcbiAqIEBwYXJhbSAge30gY2FsbGJhY2s/IENhbGxlZCBhZnRlciBhIHN1Y2Nlc3NzZnVsbCBhZGRpdGlvblxyXG4gKi9cclxuZnVuY3Rpb24gYWRkTmV3UHJldmlld05vZGUoY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGZpbHRlck5vZGVzV2l0aEZpbGxzKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KCdGaWdtYSBEaXRoZXI6IFBsZWFzZSBzZWxlY3QgYXQgbGVhc2Ugb25lIGl0ZW0gd2l0aCBpbWFnZSBmaWxsLicsIHtcclxuICAgICAgICAgICAgdGltZW91dDogMTAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZmlnbWEubm90aWZ5KCdGaWdtYSBEaXRoZXI6IE1vcmUgdGhhbiBvbmUgc2VsZWN0aW9uIGRpc2FibGVzIGxpdmUgcHJldmlldy4nLCB7XHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDBcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwcmV2aWV3Tm9kZXMucHVzaChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb25bMF0uY2xvbmUoKSk7XHJcbiAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgY2FsbGJhY2soKTtcclxufVxyXG4vLyBUaGlzIHBsdWdpbiB3aWxsIG9wZW4gYSBtb2RhbCB0byBwcm9tcHQgdGhlIHVzZXIgdG8gZW50ZXIgYSBudW1iZXIsIGFuZFxyXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIHRoYXQgbWFueSByZWN0YW5nbGVzIG9uIHRoZSBzY3JlZW4uXHJcbi8vIFRoaXMgZmlsZSBob2xkcyB0aGUgbWFpbiBjb2RlIGZvciB0aGUgcGx1Z2lucy4gSXQgaGFzIGFjY2VzcyB0byB0aGUgKmRvY3VtZW50Ki5cclxuLy8gWW91IGNhbiBhY2Nlc3MgYnJvd3NlciBBUElzIGluIHRoZSA8c2NyaXB0PiB0YWcgaW5zaWRlIFwidWkuaHRtbFwiIHdoaWNoIGhhcyBhXHJcbi8vIGZ1bGwgYnJvd3NlciBlbnZpcm9tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXHJcbmlmIChmaWx0ZXJOb2Rlc1dpdGhGaWxscyhmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pLmxlbmd0aCA9PSAwKSB7XHJcbiAgICBmaWdtYS5ub3RpZnkoJ0ZpZ21hIERpdGhlcjogUGxlYXNlIHNlbGVjdCBhdCBsZWFzZSBvbmUgaXRlbSB3aXRoIGltYWdlIGZpbGwuJyk7XHJcbiAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgY29uc3QgaXNNdWx0aXBsZSA9IG11bHRpcGxlU2VsZWN0aW9ucygpO1xyXG4gICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICBmaWdtYS5ub3RpZnkoJ0ZpZ21hIERpdGhlcjogTW9yZSB0aGFuIG9uZSBzZWxlY3Rpb24gZGlzYWJsZXMgbGl2ZSBwcmV2aWV3LicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgYWRkTmV3UHJldmlld05vZGUoKTtcclxuICAgIH1cclxuICAgIC8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cclxuICAgIGZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDI3MCB9KTtcclxuICAgIGlmICghaXNNdWx0aXBsZSkge1xyXG4gICAgICAgIHNldHVwUHJldmlldyhnZXRQcmV2aWV3KCkpO1xyXG4gICAgfVxyXG4gICAgLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXHJcbiAgICAvLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcclxuICAgIC8vIHBvc3RlZCBtZXNzYWdlLlxyXG4gICAgZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwiZGl0aGVyLWltYWdlXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGlvbnMgPSBmaWx0ZXJOb2Rlc1dpdGhGaWxscyhnZXRDdXJyZW50U2VsZWN0aW9ucygpKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3Rpb25zLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmaWdtYS5ub3RpZnkoJ/CfmIUgUGxlYXNlIHNlbGVjdCBpdGVtKHMpIHdpdGggaW1hZ2UgZmlsbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgRG9JbWFnZURpdGhlcihjdXJyZW50U2VsZWN0aW9ucywgbXNnLm9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGx1Z2luKGdldFByZXZpZXcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnLnR5cGUgPT09IFwiY2FuY2VsXCIpIHtcclxuICAgICAgICAgICAgY2xvc2VQbHVnaW4oZ2V0UHJldmlldygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1zZy50eXBlID09IFwicHJvY2Vzc2VkLXByZXZpZXctaW1hZ2VieXRlc1wiKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcm9jZXNzZWQgYnl0ZXMnLCBtc2cuaW1hZ2VCeXRlcyk7XHJcbiAgICAgICAgICAgIC8vIGFwcGx5IHByb2Nlc3NlZCBpbWFnZSB0byBwcmV2aWV3IG5vZGUuLlxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsRGF0YTogZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlldyxcclxuICAgICAgICAgICAgICAgIGltYWdlQnl0ZXM6IG1zZy5pbWFnZUJ5dGVzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBhcHBseVByb2Nlc3NSZXN1bHRzKFtyZXN1bHRdLCBbZmlyc3RJbWFnZWZpbGxzRGF0YU9uUHJldmlld10sIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXZpZXcgcmVzdWx0IGFwcGxpZWQhJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERlc3Ryb3lzIGFsbCBleGlzdGluZyBQcmV2aWV3Tm9kZS4uXHJcbiAgICAgICAgaWYgKG1zZy50eXBlID09ICdkZXN0b3J5LXByZXZpZXcnIHx8IG1zZy50eXBlID09ICdkaXNhYmxlLXByZXZpZXcnKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmV2aWV3Tm9kZXMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHByZXZpZXdOb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZS5yZW1vdmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmlld05vZGVzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFRyeXMgdG8gYWRkIGEgbmV3IFByZXZpZXdOb2RlLi4uXHJcbiAgICAgICAgLy8gaWYgaXQgZmFpbHMgLSAoMSkuIGJlY2F1c2Ugbm8gR2VtZXRyeU1peGluIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgLy8gKDIpLiBNb3JlIHRoYW4gb25lIE5vZGVzIHNlbGVjdGVkLlxyXG4gICAgICAgIGlmIChtc2cudHlwZSA9PSAnc2hvdy1wcmV2aWV3JyB8fCBtc2cudHlwZSA9PSAnZW5hYmxlLXByZXZpZXcnKSB7XHJcbiAgICAgICAgICAgIGFkZE5ld1ByZXZpZXdOb2RlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpZ21hLm5vdGlmeSgnRmlnbWEgRGl0aGVyOiBSZS1yZW5kZXJpbmcgcHJldmlldyDwn6SzJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc2V0dXBQcmV2aWV3KGdldFByZXZpZXcoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFF1ZXVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlID0gW107XHJcbiAgICB9XHJcbiAgICBlbnF1ZXVlKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlLnB1c2godmFsKTtcclxuICAgIH1cclxuICAgIGRlcXVldWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAnLi9RdWV1ZSc7XHJcbmltcG9ydCB3b3JrZXJUZW1wbGF0ZSBmcm9tICcuLi93b3JrZXIvZW50cnkuaHRtbCc7XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50IFVzZXIgU2VsZWN0aW9uKHMpXHJcbiAqIEByZXR1cm5zIHJlYWRvbmx5IFNjZW5lTm9kZVtdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG59XHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG5vZGVzIHRoYXQgaGF2ZSBJbWFnZSBmaWxscy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gbm9kZXNcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9kZXNXaXRoRmlsbHMobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGVXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiB7XHJcbiAgICAgICAgaWYgKFwiZmlsbHNcIiBpbiBub2RlKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZmlsbCBvZiBub2RlLmZpbGxzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsbC50eXBlID09IFwiSU1BR0VcIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbm9kZVdpdGhGaWxscy5sZW5ndGggPT0gMCA/IFtdIDogbm9kZVdpdGhGaWxscztcclxufVxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIGl0ZXJhdGFibGVcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuZnVuY3Rpb24gX2lzSXRlcmFibGUob2JqKSB7XHJcbiAgICAvLyBjaGVja3MgZm9yIG51bGwgYW5kIHVuZGVmaW5lZFxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmpbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBJbWFnZSBmaWxscyBmcm9tIGEgbm9kZS5cclxuICogQHBhcmFtICB7U2NlbmVOb2RlfSBub2RlIE5vZGUgdG8gZXh0cmFjdCB0aGUgaW1hZ2UgZmlsbHNcclxuICogQHJldHVybnMgSW1hZ2VGaWxsRGF0YVtdIEFuIGFycmF5IG9mIGltYWdlIGZpbGxzIG9mIHRoZSBub2RlIGFzIEltYWdlRmlsbERhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgcmVzdWx0aW5nSW1hZ2VGaWxscyA9IFtdO1xyXG4gICAgbGV0IGZpbGxzID0gbm9kZS5maWxscztcclxuICAgIGlmIChfaXNJdGVyYWJsZShmaWxscykpIHtcclxuICAgICAgICBmaWxscyA9IGZpbGxzO1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nSW1hZ2VGaWxscy5wdXNoKHsgaW1hZ2VGaWxsOiBmaWxsLCBpbmRleDogaW5kZXgsIG5vZGU6IG5vZGUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0aW5nSW1hZ2VGaWxscztcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgSW1hZ2VCeXRlcyBmcm9tIGEgSW1hZ2VQYWludCBmaWxsXHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IGZpbGxcclxuICogQHJldHVybnMgUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlQnl0ZXMoZmlsbCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKGZpbGwuaW1hZ2VIYXNoKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQWRkcyBhIGpvYiB0byB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHthbnl9IHRhc2tcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrVG9Qb29sKHRhc2ssIHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5lbnF1ZXVlKHRhc2spO1xyXG59XHJcbi8qKlxyXG4gKiBTcGF3biBhIHdvcmtlciB0byBwcm9jZXNzIHRoZSB0YXNrcyBpbiB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZSBUYXNrIHF1ZXVlXHJcbiAqIEByZXR1cm5zIFByb21pc2U8Sm9iUmVzdWx0W10+IFJldHVybnMgYW4gYXJyYXkgb2YgSm9iUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0pvYnMocXVldWUsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGpvYnMgPSBxdWV1ZS50b0FycmF5KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFsbCBqb2JzXCIsIGpvYnMpO1xyXG4gICAgLy8gQ3JlYXRlIGFuIGludmlzaWJsZSBpZnJhbWUgdG8gYWN0IGFzIGEgXCJ3b3JrZXJcIiB3aGljaFxyXG4gICAgLy8gd2lsbCBkbyB0aGUgdGFzayBvZiBkZWNvZGluZyBhbmQgc2VuZCB1cyBhIG1lc3NhZ2VcclxuICAgIC8vIHdoZW4gaXQncyBkb25lLlxyXG4gICAgZmlnbWEuc2hvd1VJKHdvcmtlclRlbXBsYXRlLCB7IHZpc2libGU6IHRydWUsIHdpZHRoOiAyMDAsIGhlaWdodDogMTI1IH0pO1xyXG4gICAgLy8gU2VuZCB0aGUgcmF3IGJ5dGVzIG9mIHRoZSBmaWxlIHRvIHRoZSB3b3JrZXIuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnc2VudCEnLCBvcHRpb25zKTtcclxuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgam9iczogam9icywgb3B0aW9uczogb3B0aW9ucyB9KTtcclxuICAgIC8vIFdhaXQgZm9yIHRoZSB3b3JrZXIncyByZXNwb25zZS5cclxuICAgIGNvbnN0IGpvYnNSZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gdmFsdWUgPT4gcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBqb2JzUmVzdWx0O1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBJbWFnZUJ5dGVzIHRvIEltYWdlSGFzaCBhbmQgYWRkcyB0byBJbWFnZVBhaW50XHJcbiAqIEBwYXJhbSAge1VpbnQ4QXJyYXl9IGJ5dGVzICBJbWFnZWJ5dGVzIHRvIGNvbnZlcnRcclxuICogQHBhcmFtICB7SW1hZ2VQYWludH0gcGFpbnQgSW1hZ2VQYWludCB0byBhZGQgdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2hcclxuICogQHJldHVybnMgSW1hZ2VQYWludCBSZXR1cm5zIGEgbmV3IEltYWdlUGFpbnQgd2l0aCB0aGUgY29udmVydGVkIEltYWdlSGFzaCBhZGRlZCB0byBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKGJ5dGVzLCBwYWludCkge1xyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHBhaW50IGZvciB0aGUgbmV3IGltYWdlLlxyXG4gICAgY29uc3QgbmV3UGFpbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhaW50KSk7XHJcbiAgICBuZXdQYWludC5pbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShieXRlcykuaGFzaDtcclxuICAgIHJldHVybiBuZXdQYWludDtcclxufVxyXG4vKipcclxuICogQ2Fycnkgb3V0IHRoZSBpbWFnZSBkaXRoZXJpbmcgcHJvY2Nlc3Nlcy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscywgb3B0aW9ucykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgVEFTS1MgPSBuZXcgUXVldWUoKTtcclxuICAgICAgICBsZXQgbm9kZUZpbGxzID0gW107XHJcbiAgICAgICAgY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoSW1hZ2VGaWxscyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGVzV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAoZmlsbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXJyeSBvdXQgZGl0aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQnl0ZXMgPSB5aWVsZCBnZXRJbWFnZUJ5dGVzKGZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVGaWxscy5wdXNoKGZpbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGFza1RvUG9vbCh7IGltYWdlQnl0ZXM6IGltYWdlQnl0ZXMsIGZpbGxEYXRhOiBmaWxsRGF0YSB9LCBUQVNLUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdGlsbCBhbGwgam9icyBhcmUgYWRkZWQuLlxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHByb2Nlc3Npbmcgam9icy4uXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlQcm9jZXNzUmVzdWx0cyh5aWVsZCBwcm9jZXNzSm9icyhUQVNLUywgb3B0aW9ucyksIG5vZGVGaWxscywgb3B0aW9ucy5rZWVwX2ltYWdlLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQXBwbGllcyB0aGUgcHJvY2Vzc2VkIGRpdGhlciBlZmZlY3QgdG8gYXBwcm9wcmlhdGUgbm9kZXNcclxuICogQHBhcmFtICB7Sm9iUmVzdWx0W119IHJlc3VsdHNcclxuICogQHBhcmFtICB7SW1hZ2VGaWxsRGF0YVtdfSBub2RlRmlsbHNcclxuICogQHBhcmFtICB7a2VlcH0ga2VlcEltYWdlRmlsbHMgS2VlcHMgdGhlIG9yaWdpbmFsIGltYWdlIGZpbGwgaW5zdGVhZCBvZiByZXBsYWNpbmcgaXQuLlxyXG4gKiBAcGFyYW0gIHthbnl9IHJlc29sdmVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseVByb2Nlc3NSZXN1bHRzKHJlc3VsdHMsIG5vZGVGaWxscywga2VlcEltYWdlRmlsbHMgPSBmYWxzZSwgcmVzb2x2ZSkge1xyXG4gICAgLy8gY29uc29sZS5sb2cobm9kZUZpbGxzKTtcclxuICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9jZXNzRGl0aGVyRWZmZWN0ID0gQnl0ZXNUb0ltYWdlUGFpbnRIYXNoSW1hZ2UocmVzdWx0LmltYWdlQnl0ZXMsIHJlc3VsdC5maWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgIC8vIGNsb25lIHRoZSBub2RlIGZpbGxzXHJcbiAgICAgICAgY29uc3QgY29weU5vZGVGaWxscyA9IFsuLi5ub2RlRmlsbHNbaW5kZXhdLm5vZGUuZmlsbHNdO1xyXG4gICAgICAgIGlmICgha2VlcEltYWdlRmlsbHMpIHtcclxuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgaW1hZ2UgZmlsdGVyXHJcbiAgICAgICAgICAgIGNvcHlOb2RlRmlsbHMuc3BsaWNlKHJlc3VsdC5maWxsRGF0YS5pbmRleCwgMSwgcHJvY2Vzc0RpdGhlckVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0aGUgbmV3IGltYWcgZmlsdGVyIHRvIHRoZSB0b3AuLlxyXG4gICAgICAgICAgICBjb3B5Tm9kZUZpbGxzLnB1c2gocHJvY2Vzc0RpdGhlckVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxscyA9IGNvcHlOb2RlRmlsbHM7XHJcbiAgICB9KTtcclxuICAgIC8vIHJlc29sdmUgdGhyZSBwcm9taXNlIGFmdGVyIGFwcGx5aW5nIGRpdGhlcmluZyBlZmZlY3QuXHJcbiAgICByZXNvbHZlKCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGxlU2VsZWN0aW9ucygpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcclxuICAgIHJldHVybiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAxKSA/IGZhbHNlIDogdHJ1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQbHVnaW4ocHJldmlld05vZGUpIHtcclxuICAgIGlmIChwcmV2aWV3Tm9kZSlcclxuICAgICAgICBwcmV2aWV3Tm9kZS5yZW1vdmUoKTtcclxuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3R5bGU+XFxyXFxuICBib2R5LFxcclxcbiAgaHRtbCB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgfVxcclxcblxcclxcbiAgKiB7XFxyXFxuICAgIHVzZXItc2VsZWN0OiBub25lO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRlckNvbnRhaW5lciB7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDY0cHg7XFxyXFxuICAgIGhlaWdodDogNjRweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRpbmctdGV4dCB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcclxcbiAgICBmb250LXNpemU6IDExcHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgY29sb3I6ICM1NTU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2IHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDUxcHg7XFxyXFxuICAgIGhlaWdodDogNTFweDtcXHJcXG4gICAgYm9yZGVyOiA2cHggc29saWQgIzAwYWNlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDBhY2VkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGxkcy1yaW5nIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG48L3N0eWxlPlxcclxcblxcclxcblxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImxvYWRlckNvbnRhaW5lclxcXCI+XFxyXFxuICA8ZGl2IGNsYXNzPVxcXCJsZHMtcmluZ1xcXCI+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICAgIDxkaXY+PC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG4gIDxkaXYgY2xhc3M9XFxcImxvYWRpbmctdGV4dFxcXCI+XFxyXFxuICAgIGRpdGhlcmluZy4uXFxyXFxuICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG48c2NyaXB0PiAgICBcXHJcXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gV0VCIFdPUktFUiBzY3JpcHQgaW4gc3RyaW5nLi4uXFxyXFxuXFxyXFxuICAvLyBUaGUgY29kZSBjb250YWluZWQgaW4gdGhpcyBzdHJpbmcgaXMgdGhlIGFjdHVhbCBsb2dpY3MgdG8gbWFuaXB1bGF0ZSAgY2FudmFzIGltYWdlXFxyXFxuICAvLyBhbmQgY2Fycnkgb3V0IHRoZSBkaXRoZXJpbmcgZWZmZWN0Li5cXHJcXG5cXHJcXG4gIGNvbnN0IHdvcmtlclNjcmlwdCA9IGBcXHJcXG4gIC8vIENvbnZlcnQgaW1hZ2UgZGF0YSB0byBncmV5c2NhbGUgYmFzZWQgb24gbHVtaW5hbmNlLlxcclxcbmZ1bmN0aW9uIGdyZXlzY2FsZV9sdW1pbmFuY2UoaW1hZ2UpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMl0gPSBwYXJzZUludChcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2ldICogMC4yMSArXFxyXFxuICAgICAgICAgICAgaW1hZ2UuZGF0YVtpICsgMV0gKiAwLjcxICtcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2kgKyAyXSAqIDAuMDcsXFxyXFxuICAgICAgICAgICAgMTBcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGltYWdlO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDb252ZXJ0IGltYWdlIGRhdGEgdG8gZ3JleXNjYWxlIGJhc2VkIG9uIGF2ZXJhZ2Ugb2YgUiwgRyBhbmQgQiB2YWx1ZXMuXFxyXFxuZnVuY3Rpb24gZ3JleXNjYWxlX2F2ZXJhZ2UoaW1hZ2UpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMl0gPSBwYXJzZUludChcXHJcXG4gICAgICAgICAgICAoaW1hZ2UuZGF0YVtpXSArIGltYWdlLmRhdGFbaSArIDFdICsgaW1hZ2UuZGF0YVtpICsgMl0pIC8gMyxcXHJcXG4gICAgICAgICAgICAxMFxcclxcbiAgICAgICAgKTtcXHJcXG4gICAgfVxcclxcbiAgICByZXR1cm4gaW1hZ2U7XFxyXFxufVxcclxcblxcclxcbi8vIEFwcGx5IEF0a2luc29uIERpdGhlciB0byBJbWFnZSBEYXRhXFxyXFxuZnVuY3Rpb24gZGl0aGVyX2F0a2luc29uKGltYWdlLCBpbWFnZVdpZHRoLCBkcmF3Q29sb3VyKSB7XFxyXFxuICAgIHNraXBQaXhlbHMgPSA0O1xcclxcblxcclxcbiAgICBpZiAoIWRyYXdDb2xvdXIpIGRyYXdDb2xvdXIgPSBmYWxzZTtcXHJcXG5cXHJcXG4gICAgaWYgKGRyYXdDb2xvdXIgPT0gdHJ1ZSkgc2tpcFBpeGVscyA9IDE7XFxyXFxuXFxyXFxuICAgIGltYWdlTGVuZ3RoID0gaW1hZ2UuZGF0YS5sZW5ndGg7XFxyXFxuXFxyXFxuICAgIGZvciAoXFxyXFxuICAgICAgICBjdXJyZW50UGl4ZWwgPSAwO1xcclxcbiAgICAgICAgY3VycmVudFBpeGVsIDw9IGltYWdlTGVuZ3RoO1xcclxcbiAgICAgICAgY3VycmVudFBpeGVsICs9IHNraXBQaXhlbHNcXHJcXG4gICAgKSB7XFxyXFxuICAgICAgICBpZiAoaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdIDw9IDEyOCkge1xcclxcbiAgICAgICAgICAgIG5ld1BpeGVsQ29sb3VyID0gMDtcXHJcXG4gICAgICAgIH0gZWxzZSB7XFxyXFxuICAgICAgICAgICAgbmV3UGl4ZWxDb2xvdXIgPSAyNTU7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBlcnIgPSBwYXJzZUludCgoaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdIC0gbmV3UGl4ZWxDb2xvdXIpIC8gOCwgMTApO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWxdID0gbmV3UGl4ZWxDb2xvdXI7XFxyXFxuXFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDRdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgOF0gKz0gZXJyO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyA0ICogaW1hZ2VXaWR0aCAtIDRdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGhdICs9IGVycjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsICsgNCAqIGltYWdlV2lkdGggKyA0XSArPSBlcnI7XFxyXFxuICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDggKiBpbWFnZVdpZHRoXSArPSBlcnI7XFxyXFxuXFxyXFxuICAgICAgICBpZiAoZHJhd0NvbG91ciA9PSBmYWxzZSlcXHJcXG4gICAgICAgICAgICBpbWFnZS5kYXRhW2N1cnJlbnRQaXhlbCArIDFdID0gaW1hZ2UuZGF0YVtjdXJyZW50UGl4ZWwgKyAyXSA9XFxyXFxuICAgICAgICAgICAgICAgIGltYWdlLmRhdGFbY3VycmVudFBpeGVsXTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICByZXR1cm4gaW1hZ2UuZGF0YTtcXHJcXG59XFxyXFxuXFxyXFxuZnVuY3Rpb24gZGl0aGVyX3RocmVzaG9sZChpbWFnZSwgdGhyZXNob2xkX3ZhbHVlKSB7XFxyXFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGltYWdlLmRhdGEubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaV0gPSBpbWFnZS5kYXRhW2ldID4gdGhyZXNob2xkX3ZhbHVlID8gMjU1IDogMDtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMV0gPiB0aHJlc2hvbGRfdmFsdWUgPyAyNTUgOiAwO1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpICsgMl0gPSBpbWFnZS5kYXRhW2kgKyAyXSA+IHRocmVzaG9sZF92YWx1ZSA/IDI1NSA6IDA7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuZnVuY3Rpb24gcmVwbGFjZV9jb2xvdXJzKGltYWdlLCBibGFjaywgd2hpdGUpIHtcXHJcXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gaW1hZ2UuZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xcclxcbiAgICAgICAgaW1hZ2UuZGF0YVtpXSA9IGltYWdlLmRhdGFbaV0gPCAxMjcgPyBibGFjay5yIDogd2hpdGUucjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDFdID0gaW1hZ2UuZGF0YVtpICsgMV0gPCAxMjcgPyBibGFjay5nIDogd2hpdGUuZztcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDJdID0gaW1hZ2UuZGF0YVtpICsgMl0gPCAxMjcgPyBibGFjay5iIDogd2hpdGUuYjtcXHJcXG4gICAgICAgIGltYWdlLmRhdGFbaSArIDNdID1cXHJcXG4gICAgICAgICAgICAoaW1hZ2UuZGF0YVtpXSArIGltYWdlLmRhdGFbaSArIDFdICsgaW1hZ2UuZGF0YVtpICsgMl0pIC8gMyA8IDEyN1xcclxcbiAgICAgICAgICAgICAgICA/IGJsYWNrLmFcXHJcXG4gICAgICAgICAgICAgICAgOiB3aGl0ZS5hO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbmZ1bmN0aW9uIGRpdGhlcihkYXRhKSB7XFxyXFxuICAgIGlmIChkYXRhLnByb2Nlc3NpbmcuZ3JleXNjYWxlTWV0aG9kID09IFxcXCJMdW1pbmFuY2VcXFwiKSB7XFxyXFxuICAgICAgICBncmV5c2NhbGVfbHVtaW5hbmNlKGRhdGEuaW1hZ2UuZGF0YSk7XFxyXFxuICAgIH0gZWxzZSBpZiAoZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiUkdCIEF2ZXJhZ2VcXFwiKSB7XFxyXFxuICAgICAgICBncmV5c2NhbGVfYXZlcmFnZShkYXRhLmltYWdlLmRhdGEpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGlmIChkYXRhLnByb2Nlc3NpbmcuZGl0aGVyTWV0aG9kID09IFxcXCJBdGtpbnNvbiBEaXRoZXJpbmdcXFwiKSB7XFxyXFxuICAgICAgICBkaXRoZXJfYXRraW5zb24oXFxyXFxuICAgICAgICAgICAgZGF0YS5pbWFnZS5kYXRhLFxcclxcbiAgICAgICAgICAgIGRhdGEuaW1hZ2Uud2lkdGgsXFxyXFxuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nLmdyZXlzY2FsZU1ldGhvZCA9PSBcXFwiRGlzYWJsZWRcXFwiXFxyXFxuICAgICAgICApO1xcclxcbiAgICB9IGVsc2UgaWYgKGRhdGEucHJvY2Vzc2luZy5kaXRoZXJNZXRob2QgPT0gXFxcIlRocmVzaG9sZFxcXCIpIHtcXHJcXG4gICAgICAgIGRpdGhlcl90aHJlc2hvbGQoZGF0YS5pbWFnZS5kYXRhLCBkYXRhLnByb2Nlc3NpbmcuZGl0aGVyVGhyZXNob2xkKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBpZiAoZGF0YS5wcm9jZXNzaW5nLnJlcGxhY2VDb2xvdXJzID09IHRydWUpIHtcXHJcXG4gICAgICAgIHJlcGxhY2VfY29sb3VycyhcXHJcXG4gICAgICAgICAgICBkYXRhLmltYWdlLmRhdGEsXFxyXFxuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nLnJlcGxhY2VDb2xvdXJNYXAuYmxhY2ssXFxyXFxuICAgICAgICAgICAgZGF0YS5wcm9jZXNzaW5nLnJlcGxhY2VDb2xvdXJNYXAud2hpdGVcXHJcXG4gICAgICAgICk7XFxyXFxuICAgIH1cXHJcXG4gICAgcmV0dXJuIGRhdGE7XFxyXFxufVxcclxcblxcclxcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcXFwibWVzc2FnZVxcXCIsIGZ1bmN0aW9uIChlKSB7IHNlbGYucG9zdE1lc3NhZ2UoZGl0aGVyKGUuZGF0YSkpOyB9LCBmYWxzZSk7XFxyXFxuICBgO1xcclxcblxcclxcbiAgLy8gU2luY2Ugd2UgY2Fubm90IGxvYWQgZXh0ZXJuYWwgc2NyaXB0IGJ1dCB3ZWJ3b3JrZXIgbmVlZHMgYSBVUkxcXHJcXG4gIC8vIGNvbnZlcnQgdGhlIGNvZGUgdGhhbiBpcyBtZWFudCB0byBydW4gaW4gdGhlIHdlYndvcmtlciB0b1xcclxcbiAgLy8gVVJMIEJMT0IgYW5kIHBhc3MgaXQgaW50byB0aGUgd2Vid29ya2VyLlxcclxcbiAgLy8gTmVhdCB0cmljazpcXHJcXG5cXHJcXG4gIGZ1bmN0aW9uIGxvYWRXZWJXb3JrZXIoc2NyaXB0KSB7XFxyXFxuICAgIHJldHVybiBuZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3NjcmlwdF0pKSk7XFxyXFxuICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBMT0dJQ1MgZm9yIGpvYiBwcm9jZXNzaW5nXFxyXFxuICAvLy8vLyBFbnRyeSBwb2ludCB0byBkaXRoZXJpbmcgb2YgdGhlIHByb3ZpZGVkIGltYWdlIGpvYnMgLi4uXFxyXFxuXFxyXFxuXFxyXFxuICAvLyBFbmNvZGluZyBhbiBpbWFnZSBpcyBhbHNvIGRvbmUgYnkgc3RpY2tpbmcgcGl4ZWxzIGluIGFuXFxyXFxuICAvLyBIVE1MIGNhbnZhcyBhbmQgYnkgYXNraW5nIHRoZSBjYW52YXMgdG8gc2VyaWFsaXplIGl0IGludG9cXHJcXG4gIC8vIGFuIGFjdHVhbCBQTkcgZmlsZSB2aWEgY2FudmFzLnRvQmxvYigpLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZW5jb2RlKGNhbnZhcywgY3R4LCBpbWFnZURhdGEpIHtcXHJcXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXFxyXFxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHtcXHJcXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcXHJcXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpKVxcclxcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdDb3VsZCBub3QgcmVhZCBmcm9tIGJsb2InKSlcXHJcXG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxcclxcbiAgICAgIH0pXFxyXFxuICAgIH0pXFxyXFxuICB9XFxyXFxuXFxyXFxuICAvLyBEZWNvZGluZyBhbiBpbWFnZSBjYW4gYmUgZG9uZSBieSBzdGlja2luZyBpdCBpbiBhbiBIVE1MXFxyXFxuICAvLyBjYW52YXMsIGFzIHdlIGNhbiByZWFkIGluZGl2aWR1YWwgcGl4ZWxzIG9mZiB0aGUgY2FudmFzLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcykge1xcclxcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtieXRlc10pKVxcclxcbiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXHJcXG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxcclxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltZylcXHJcXG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHJlamVjdCgpXFxyXFxuICAgICAgaW1nLnNyYyA9IHVybFxcclxcbiAgICB9KVxcclxcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aFxcclxcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XFxyXFxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXFxyXFxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodClcXHJcXG4gICAgcmV0dXJuIHtcXHJcXG4gICAgICBpbWFnZURhdGE6IGltYWdlRGF0YSxcXHJcXG4gICAgICB3aWR0aDogaW1hZ2Uud2lkdGgsXFxyXFxuICAgICAgaGVpZ2h0OiBpbWFnZS53aWR0aFxcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAxLiBTcGluIG9uIG91ciBtYWdpbmZpY2llbnQgd2Vid29ya2VyIC4uLlxcclxcbiAgd2luZG93LkRJVEhFUl9XT1JLRVIgPSBsb2FkV2ViV29ya2VyKHdvcmtlclNjcmlwdCk7XFxyXFxuXFxyXFxuXFxyXFxuICAvLy8vLy8vIDIuIENoaWxsLCB0aWxsIHRoZSB1c2VyIHNlbmRzIGEgam9iLi4uLlxcclxcbiAgLy8gQ3JlYXRlIGFuIGV2ZW50IGhhbmRsZXIgdG8gcmVjZWl2ZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluXFxyXFxuICAvLyB0aHJlYWQuXFxyXFxuICB3aW5kb3cub25tZXNzYWdlID0gYXN5bmMgZXZlbnQgPT4ge1xcclxcbiAgICAvLyBKdXN0IGdldCB0aGUgYnl0ZXMgZGlyZWN0bHkgZnJvbSB0aGUgcGx1Z2luTWVzc2FnZSBzaW5jZVxcclxcbiAgICAvLyB0aGF0J3MgdGhlIG9ubHkgdHlwZSBvZiBtZXNzYWdlIHdlJ2xsIHJlY2VpdmUgaW4gdGhpc1xcclxcbiAgICAvLyBwbHVnaW4uIEluIG1vcmUgY29tcGxleCBwbHVnaW5zLCB5b3UnbGwgd2FudCB0byBjaGVjayB0aGVcXHJcXG4gICAgLy8gdHlwZSBvZiB0aGUgbWVzc2FnZS5cXHJcXG5cXHJcXG4gICAgLy8gY29udGFpbiB0aGUgcHJvY2Vzc2VkIChkaXRoZXJlZCkgaW1hZ2VieXRlcy4uLlxcclxcbiAgICBjb25zdCByZXN1bHRzID0gW107XFxyXFxuXFxyXFxuICAgIC8vICA9PiBUYWtlIGEgbG9vayBhdCB0aGUgc2VudCBkYXRhLlxcclxcbiAgICBjb25zdCByZWN2ZWREYXRhID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xcclxcblxcclxcbiAgICAvLyBFeHRyYWN0IHRoZSBqb2JzLi5cXHJcXG4gICAgY29uc3Qgam9icyA9IHJlY3ZlZERhdGEuam9icztcXHJcXG5cXHJcXG4gICAgLy8gV2UgcHJvY2VzcyB0aGUgam9iIG9uZSBhZnRlciB0aGUgb3RoZXIuLi5cXHJcXG4gICAgZm9yIChjb25zdCBqb2Igb2Ygam9icykge1xcclxcblxcclxcbiAgICAgIC8vIHllYWggd2UgbmVlZCB0byByZXNsb3ZlIHR3byBwcm9taXNlcyBiZWZvcmUgd2UgcHJvY2VlZCB0byB0aGUgbmV4dCBqb2JcXHJcXG4gICAgICByZXN1bHRzLnB1c2goe1xcclxcbiAgICAgICAgaW1hZ2VCeXRlczogYXdhaXQgKGF3YWl0IHByb2Nlc3NEaXRoZXIoam9iLCByZWN2ZWREYXRhLm9wdGlvbnMpKSxcXHJcXG4gICAgICAgIGZpbGxEYXRhOiBqb2IuZmlsbERhdGFcXHJcXG4gICAgICB9KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAvLyBTaW5jZSB3ZSBhcmUgY29tcGxldGVseSBkb25lIHdpdGggb3VyIGpvYnMsIGtpbGwgdGhlIFdlYndvcmtlci4uLlxcclxcbiAgICB3aW5kb3cuRElUSEVSX1dPUktFUi50ZXJtaW5hdGUoKTtcXHJcXG5cXHJcXG4gICAgLy8gU2VuZCB0aGUgcmVzdWx0IGJhY2sgdG8gdGhlIFVzZXIuLlxcclxcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcXHJcXG4gICAgICBwbHVnaW5NZXNzYWdlOiByZXN1bHRzXFxyXFxuICAgIH0sIFxcXCIqXFxcIik7XFxyXFxuICB9O1xcclxcblxcclxcblxcclxcbiAgLy8vLy8vLy8vLy8vIDMuIFRoaXMgbWV0aG9kIHNlbmRzIGEgam9iIHJlcXVlc3QgdG8gdGhlIHdlYiB3b3JrZXIgYW5kIHdhaXQgdGlsbCBzb21ldGhpbmcgaGFwcGVucy4uXFxyXFxuXFxyXFxuICBhc3luYyBmdW5jdGlvbiBwcm9jZXNzRGl0aGVyKGpvYiwgb3B0aW9ucykge1xcclxcbiAgICBjb25zdCBieXRlcyA9IGpvYi5pbWFnZUJ5dGVzO1xcclxcblxcclxcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxcXCJjYW52YXNcXFwiKTtcXHJcXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXFxcIjJkXFxcIik7XFxyXFxuXFxyXFxuICAgIGNvbnN0IGltYWdlRGV0YWlscyA9IGF3YWl0IGRlY29kZShjYW52YXMsIGN0eCwgYnl0ZXMpO1xcclxcbiAgICAvLyBjb25zb2xlLmxvZyhpbWFnZURldGFpbHMpO1xcclxcbiAgICBjb25zdCBwcmVzZXQgPSB7XFxyXFxuICAgICAgaW1hZ2U6IHtcXHJcXG4gICAgICAgIGRhdGE6IGltYWdlRGV0YWlscy5pbWFnZURhdGEsXFxyXFxuICAgICAgICB3aWR0aDogaW1hZ2VEZXRhaWxzLndpZHRoLFxcclxcbiAgICAgICAgaGVpZ2h0OiBpbWFnZURldGFpbHMuaGVpZ2h0XFxyXFxuICAgICAgfSxcXHJcXG4gICAgICBwcm9jZXNzaW5nOiB7XFxyXFxuICAgICAgICBncmV5c2NhbGVNZXRob2Q6IG9wdGlvbnMuZ3JleXNjYWxlX21ldGhvZCxcXHJcXG4gICAgICAgIGRpdGhlck1ldGhvZDogb3B0aW9ucy5kaXRoZXJfbWV0aG9kLFxcclxcbiAgICAgICAgZGl0aGVyVGhyZXNob2xkOiBvcHRpb25zLnRocmVzaG9sZCxcXHJcXG4gICAgICAgIHJlcGxhY2VDb2xvdXJzOiBvcHRpb25zLmNoa19yZXBsYWNlX2NvbG91cnMsXFxyXFxuICAgICAgICByZXBsYWNlQ29sb3VyTWFwOiB7XFxyXFxuICAgICAgICAgIGJsYWNrOiB7XFxyXFxuICAgICAgICAgICAgcjogb3B0aW9ucy5yZXBfYmxhY2tbMF0sXFxyXFxuICAgICAgICAgICAgZzogb3B0aW9ucy5yZXBfYmxhY2tbMV0sXFxyXFxuICAgICAgICAgICAgYjogb3B0aW9ucy5yZXBfYmxhY2tbMl0sXFxyXFxuICAgICAgICAgICAgYTogb3B0aW9ucy5yZXBfYmxhY2tbM11cXHJcXG4gICAgICAgICAgfSxcXHJcXG4gICAgICAgICAgd2hpdGU6IHtcXHJcXG4gICAgICAgICAgICByOiBvcHRpb25zLnJlcF93aGl0ZVswXSxcXHJcXG4gICAgICAgICAgICBnOiBvcHRpb25zLnJlcF93aGl0ZVsxXSxcXHJcXG4gICAgICAgICAgICBiOiBvcHRpb25zLnJlcF93aGl0ZVsyXSxcXHJcXG4gICAgICAgICAgICBhOiBvcHRpb25zLnJlcF93aGl0ZVszXVxcclxcbiAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuICAgICAgfVxcclxcbiAgICB9O1xcclxcblxcclxcbiAgICAvLyBTdGFydCB0aW1lciB0byB0cmFjayB0aGUgdGltZSB0aGF0IGlzIHNwZW50IG9uIHRoaXMgY3VycmVudCBqb2IgLi4uXFxyXFxuICAgIGlmICh3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS50aW1lKSB7XFxyXFxuICAgICAgY29uc29sZS5sb2coXFxcIlN0YXJ0aW5nIFdlYiBXb3JrZXIgZm9yIGltYWdlIChcXFwiICsgaW1hZ2VEZXRhaWxzLndpZHRoICsgXFxcInhcXFwiICsgaW1hZ2VEZXRhaWxzLmhlaWdodCArXFxyXFxuICAgICAgICBcXFwiLCBHcmV5c2NhbGUgTWV0aG9kOiBcXFwiICsgb3B0aW9ucy5ncmV5c2NhbGVfbWV0aG9kICsgXFxcIiwgRGl0aGVyIE1ldGhvZDogXFxcIiArIG9wdGlvbnMuZGl0aGVyX21ldGhvZCArIFxcXCIpXFxcIik7XFxyXFxuICAgICAgY29uc29sZS50aW1lKFxcXCJXZWIgd29ya2VyIHRvb2tcXFwiKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAvLyBTZW5kIGpvYiB0byB3ZWJ3b3JrZXJcXHJcXG4gICAgd2luZG93LkRJVEhFUl9XT1JLRVIucG9zdE1lc3NhZ2UocHJlc2V0KTtcXHJcXG5cXHJcXG4gICAgLy8gTk9USUNFOiBIZXJlIHRvIGF2b2lkIG1lbW9yeSBsZWFrcywgd2UgYXJlIHVzaW5nIGEgb25lIHRpbWUgZXZlbnQgbGlzdG5lci4uXFxyXFxuICAgIC8vIHRoZXJlZm9yZSBlYWNoIGpvYiBhcHBsaWVzIGFuIGV2ZW50IGxpc3RuZXIgdG8gdGhlIHdvcmtlciBhbmQgb25jZSB0aGUgd29ya2Vycz1cXHJcXG4gICAgLy8gc2VuZHMgdGhlIHJlc3VsdCBiYWNrLCB3ZSBkaXNwb3NlL3VucmVnaXN0ZXIgdGhlIGV2ZW50IGxpc3RuZXIuLi5cXHJcXG5cXHJcXG4gICAgY29uc3Qgd29ya2VyUmVzdWx0ID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xcclxcbiAgICAgIC8vIEdldCByZXBseSBmcm9tIHdlYndvcmtlclxcclxcbiAgICAgIGNvbnN0IG9uZVRpbWVMaXN0ZW4gPSBmdW5jdGlvbiAoZSkge1xcclxcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3Jlc3VsdCcsIGUpO1xcclxcbiAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLnRpbWUpIHtcXHJcXG4gICAgICAgICAgY29uc29sZS50aW1lRW5kKFxcXCJXZWIgd29ya2VyIHRvb2tcXFwiKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGUuZGF0YTtcXHJcXG4gICAgICAgIGVuY29kZShjYW52YXMsIGN0eCwgcmVzdWx0LmltYWdlLmRhdGEpLnRoZW4obmV3Qnl0ZXMgPT4ge1xcclxcblxcclxcbiAgICAgICAgICAvLyBtYWtlIGl0IGEgb25lIHRpbWUgZXZlbnQgbGlzdG5lci4uLlxcclxcbiAgICAgICAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25lVGltZUxpc3Rlbik7XFxyXFxuICAgICAgICAgIHJlc29sdmUobmV3Qnl0ZXMpO1xcclxcbiAgICAgICAgfSk7XFxyXFxuICAgICAgfTtcXHJcXG5cXHJcXG4gICAgICB3aW5kb3cuRElUSEVSX1dPUktFUi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25lVGltZUxpc3RlbiwgZmFsc2UpO1xcclxcbiAgICB9KTtcXHJcXG5cXHJcXG4gICAgcmV0dXJuIHdvcmtlclJlc3VsdDtcXHJcXG4gIH1cXHJcXG48L3NjcmlwdD5cIiJdLCJzb3VyY2VSb290IjoiIn0=