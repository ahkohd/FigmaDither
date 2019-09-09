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
        console.log(msg);
        const currentSelections = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["filterNodesWithFills"])(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelections"])());
        Object(_lib_utils__WEBPACK_IMPORTED_MODULE_0__["DoImageDither"])(currentSelections)
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
function processJobs(queue) {
    const jobs = queue.toArray();
    // console.log("All jobs", jobs);
    // Create an invisible iframe to act as a "worker" which
    // will do the task of decoding and send us a message
    // when it's done.
    figma.showUI(_worker_entry_html__WEBPACK_IMPORTED_MODULE_1__["default"], { visible: true, width: 200, height: 125 });
    // Send the raw bytes of the file to the worker.
    figma.ui.postMessage(jobs);
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
function DoImageDither(currentSelectionsWithImageFills) {
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
                    applyProcessResults(yield processJobs(TASKS), nodeFills, resolve);
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
/* harmony default export */ __webpack_exports__["default"] = ("<style>\r\n\r\n  body, html {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  body {\r\n    display: flex;\r\n  }\r\n\r\n  .loaderContainer\r\n  {\r\n    margin: auto;\r\n    text-align: center;\r\n    height: 55px;\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  .lds-ring {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 64px;\r\n    height: 64px;\r\n    transform: scale(.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n\r\n  .loading-text {\r\n    font-family: sans-serif;\r\n    font-size: 11px;\r\n    text-align: center;\r\n    color: #555;\r\n  }\r\n\r\n  .lds-ring div {\r\n    box-sizing: border-box;\r\n    display: block;\r\n    position: absolute;\r\n    width: 51px;\r\n    height: 51px;\r\n    border: 6px solid #00aced;\r\n    border-radius: 50%;\r\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n    border-color: #00aced transparent transparent transparent;\r\n  }\r\n\r\n  .lds-ring div:nth-child(1) {\r\n    animation-delay: -0.45s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(2) {\r\n    animation-delay: -0.3s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(3) {\r\n    animation-delay: -0.15s;\r\n  }\r\n\r\n  @keyframes lds-ring {\r\n    0% {\r\n      transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n</style>\r\n\r\n\r\n\r\n<div class=\"loaderContainer\">\r\n    <div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div>\r\n    <div class=\"loading-text\">\r\n        dithering..\r\n    </div>\r\n</div>\r\n<script>\r\n  // Encoding an image is also done by sticking pixels in an\r\n  // HTML canvas and by asking the canvas to serialize it into\r\n  // an actual PNG file via canvas.toBlob().\r\n  async function encode(canvas, ctx, imageData) {\r\n    ctx.putImageData(imageData, 0, 0)\r\n    return await new Promise((resolve, reject) => {\r\n      canvas.toBlob(blob => {\r\n        const reader = new FileReader()\r\n        reader.onload = () => resolve(new Uint8Array(reader.result))\r\n        reader.onerror = () => reject(new Error('Could not read from blob'))\r\n        reader.readAsArrayBuffer(blob)\r\n      })\r\n    })\r\n  }\r\n\r\n  // Decoding an image can be done by sticking it in an HTML\r\n  // canvas, as we can read individual pixels off the canvas.\r\n  async function decode(canvas, ctx, bytes) {\r\n    const url = URL.createObjectURL(new Blob([bytes]))\r\n    const image = await new Promise((resolve, reject) => {\r\n      const img = new Image()\r\n      img.onload = () => resolve(img)\r\n      img.onerror = () => reject()\r\n      img.src = url\r\n    })\r\n    canvas.width = image.width\r\n    canvas.height = image.height\r\n    ctx.drawImage(image, 0, 0)\r\n    const imageData = ctx.getImageData(0, 0, image.width, image.height)\r\n    return imageData\r\n  }\r\n\r\n  // Create an event handler to receive messages from the main\r\n  // thread.\r\n  window.onmessage = async event => {\r\n    // Just get the bytes directly from the pluginMessage since\r\n    // that's the only type of message we'll receive in this\r\n    // plugin. In more complex plugins, you'll want to check the\r\n    // type of the message.\r\n    const results = [];\r\n    const jobs = event.data.pluginMessage;\r\n    for (const job of jobs) {\r\n      results.push({\r\n        imageBytes: await processDither(job),\r\n        fillData: job.fillData\r\n      });\r\n    }\r\n    window.parent.postMessage({\r\n      pluginMessage: results\r\n    }, \"*\");\r\n  };\r\n\r\n  async function processDither(job) {\r\n    const bytes = job.imageBytes;\r\n\r\n    const canvas = document.createElement(\"canvas\");\r\n    const ctx = canvas.getContext(\"2d\");\r\n\r\n    const imageData = await decode(canvas, ctx, bytes);\r\n    const pixels = imageData.data;\r\n\r\n    // Do the actual work of inverting the colors.\r\n    for (let i = 0; i < pixels.length; i += 4) {\r\n      pixels[i + 0] = 255 - pixels[i + 0];\r\n      pixels[i + 1] = 255 - pixels[i + 1];\r\n      pixels[i + 2] = 255 - pixels[i + 2];\r\n      // Don't invert the alpha channel.\r\n    }\r\n\r\n    const newBytes = await encode(canvas, ctx, imageData);\r\n    return newBytes;\r\n  }\r\n</script>");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBCQUEwQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUVBQW9CLENBQUMsdUVBQW9CO0FBQzNFLFFBQVEsZ0VBQWE7QUFDckI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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LGdKQUFnSixtTkFBbU4sK0hBQStILGlRQUFpUSw4Q0FBOEMsaUNBQWlDLHdCQUF3Qiw4RkFBOEYsRUFBRSxTQUFTLG1DQUFtQyx5Q0FBeUMsU0FBUyxRQUFRLDZDQUE2QyxxQ0FBcUMsOERBQThELDhDQUE4QywrREFBK0Qsc0NBQXNDLGlGQUFpRixtQkFBbUIsVUFBVSw4Q0FBOEMsOENBQThDLDhDQUE4QyxxREFBcUQsa0VBQWtFLHdCQUF3QixPQUFPLGMiLCJmaWxlIjoiY29kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvZGUudHNcIik7XG4iLCJpbXBvcnQgeyBnZXRDdXJyZW50U2VsZWN0aW9ucywgZmlsdGVyTm9kZXNXaXRoRmlsbHMsIERvSW1hZ2VEaXRoZXIgfSBmcm9tIFwiLi9saWIvdXRpbHNcIjtcclxuLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgbW9kYWwgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbnVtYmVyLCBhbmRcclxuLy8gaXQgd2lsbCB0aGVuIGNyZWF0ZSB0aGF0IG1hbnkgcmVjdGFuZ2xlcyBvbiB0aGUgc2NyZWVuLlxyXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXHJcbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxyXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbWVudCAoc2VlIGRvY3VtZW50YXRpb24pLlxyXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXHJcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyBoZWlnaHQ6IDUwMCwgd2lkdGg6IDI3MCB9KTtcclxuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXHJcbi8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxyXG4vLyBwb3N0ZWQgbWVzc2FnZS5cclxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkaXRoZXItaW1hZ2VcIikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGlvbnMgPSBmaWx0ZXJOb2Rlc1dpdGhGaWxscyhnZXRDdXJyZW50U2VsZWN0aW9ucygpKTtcclxuICAgICAgICBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiY2FuY2VsXCIpIHtcclxuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG4gICAgfVxyXG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxyXG4gICAgLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBRdWV1ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZW5xdWV1ZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcbiAgICBkZXF1ZXVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZS5zaGlmdCgpO1xyXG4gICAgfVxyXG4gICAgdG9BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJy4vUXVldWUnO1xyXG5pbXBvcnQgd29ya2VyVGVtcGxhdGUgZnJvbSAnLi4vd29ya2VyL2VudHJ5Lmh0bWwnO1xyXG4vKipcclxuICogR2V0cyB0aGUgY3VycmVudCBVc2VyIFNlbGVjdGlvbihzKVxyXG4gKiBAcmV0dXJucyByZWFkb25seSBTY2VuZU5vZGVbXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTZWxlY3Rpb25zKCkge1xyXG4gICAgcmV0dXJuIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcclxufVxyXG4vKipcclxuICogRmlsdGVycyBubmRlcyB0aGF0IGhhdmUgZmlsbHMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IG5vZGVzXHJcbiAqIEByZXR1cm5zIFNjZW5lTm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlck5vZGVzV2l0aEZpbGxzKG5vZGVzKSB7XHJcbiAgICBjb25zdCBub2RlV2l0aEZpbGxzID0gbm9kZXMuZmlsdGVyKG5vZGUgPT4gXCJmaWxsc1wiIGluIG5vZGUpO1xyXG4gICAgcmV0dXJuIG5vZGVXaXRoRmlsbHMubGVuZ3RoID09IDAgPyBbXSA6IG5vZGVXaXRoRmlsbHM7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG9iamVjdCBpcyBpdGVyYXRhYmxlXHJcbiAqIEBwYXJhbSBvYmpcclxuICovXHJcbmZ1bmN0aW9uIF9pc0l0ZXJhYmxlKG9iaikge1xyXG4gICAgLy8gY2hlY2tzIGZvciBudWxsIGFuZCB1bmRlZmluZWRcclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlb2Ygb2JqW1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIjtcclxufVxyXG4vKipcclxuICogR2V0cyBhbGwgSW1hZ2UgZmlsbHMgZnJvbSBhIG5vZGUuXHJcbiAqIEBwYXJhbSAge1NjZW5lTm9kZX0gbm9kZSBOb2RlIHRvIGV4dHJhY3QgdGhlIGltYWdlIGZpbGxzXHJcbiAqIEByZXR1cm5zIEltYWdlRmlsbERhdGFbXSBBbiBhcnJheSBvZiBpbWFnZSBmaWxscyBvZiB0aGUgbm9kZSBhcyBJbWFnZUZpbGxEYXRhXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VGaWxsc0Zyb21Ob2RlKG5vZGUpIHtcclxuICAgIGNvbnN0IHJlc3VsdGluZ0ltYWdlRmlsbHMgPSBbXTtcclxuICAgIGxldCBmaWxscyA9IG5vZGUuZmlsbHM7XHJcbiAgICBpZiAoX2lzSXRlcmFibGUoZmlsbHMpKSB7XHJcbiAgICAgICAgZmlsbHMgPSBmaWxscztcclxuICAgICAgICBmaWxscy5mb3JFYWNoKChmaWxsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsbC50eXBlID09IFwiSU1BR0VcIilcclxuICAgICAgICAgICAgICAgIHJlc3VsdGluZ0ltYWdlRmlsbHMucHVzaCh7IGltYWdlRmlsbDogZmlsbCwgaW5kZXg6IGluZGV4LCBub2RlOiBub2RlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdGluZ0ltYWdlRmlsbHM7XHJcbn1cclxuLyoqXHJcbiAqIEdldHMgdGhlIEltYWdlQnl0ZXMgZnJvbSBhIEltYWdlUGFpbnQgZmlsbFxyXG4gKiBAcGFyYW0gIHtJbWFnZVBhaW50fSBmaWxsXHJcbiAqIEByZXR1cm5zIFByb21pc2U8VWludDhBcnJheT5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUJ5dGVzKGZpbGwpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBmaWdtYS5nZXRJbWFnZUJ5SGFzaChmaWxsLmltYWdlSGFzaCk7XHJcbiAgICAgICAgY29uc3QgYnl0ZXMgPSB5aWVsZCBpbWFnZS5nZXRCeXRlc0FzeW5jKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ5dGVzO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFkZHMgYSBqb2IgdG8gdGhlIHRhc2sgcXVldWVcclxuICogQHBhcmFtICB7YW55fSB0YXNrXHJcbiAqIEBwYXJhbSAge1F1ZXVlPGFueT59IHF1ZXVlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVGFza1RvUG9vbCh0YXNrLCBxdWV1ZSkge1xyXG4gICAgcXVldWUuZW5xdWV1ZSh0YXNrKTtcclxufVxyXG4vKipcclxuICogU3Bhd24gYSB3b3JrZXIgdG8gcHJvY2VzcyB0aGUgdGFza3MgaW4gdGhlIHRhc2sgcXVldWVcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWUgVGFzayBxdWV1ZVxyXG4gKiBAcmV0dXJucyBQcm9taXNlPEpvYlJlc3VsdFtdPiBSZXR1cm5zIGFuIGFycmF5IG9mIEpvYlJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NKb2JzKHF1ZXVlKSB7XHJcbiAgICBjb25zdCBqb2JzID0gcXVldWUudG9BcnJheSgpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJBbGwgam9ic1wiLCBqb2JzKTtcclxuICAgIC8vIENyZWF0ZSBhbiBpbnZpc2libGUgaWZyYW1lIHRvIGFjdCBhcyBhIFwid29ya2VyXCIgd2hpY2hcclxuICAgIC8vIHdpbGwgZG8gdGhlIHRhc2sgb2YgZGVjb2RpbmcgYW5kIHNlbmQgdXMgYSBtZXNzYWdlXHJcbiAgICAvLyB3aGVuIGl0J3MgZG9uZS5cclxuICAgIGZpZ21hLnNob3dVSSh3b3JrZXJUZW1wbGF0ZSwgeyB2aXNpYmxlOiB0cnVlLCB3aWR0aDogMjAwLCBoZWlnaHQ6IDEyNSB9KTtcclxuICAgIC8vIFNlbmQgdGhlIHJhdyBieXRlcyBvZiB0aGUgZmlsZSB0byB0aGUgd29ya2VyLlxyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoam9icyk7XHJcbiAgICAvLyBXYWl0IGZvciB0aGUgd29ya2VyJ3MgcmVzcG9uc2UuXHJcbiAgICBjb25zdCBqb2JzUmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IHZhbHVlID0+IHJlc29sdmUodmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gam9ic1Jlc3VsdDtcclxufVxyXG4vKipcclxuICogQ29udmVydHMgSW1hZ2VCeXRlcyB0byBJbWFnZUhhc2ggYW5kIGFkZHMgdG8gSW1hZ2VQYWludFxyXG4gKiBAcGFyYW0gIHtVaW50OEFycmF5fSBieXRlcyAgSW1hZ2VieXRlcyB0byBjb252ZXJ0XHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IHBhaW50IEltYWdlUGFpbnQgdG8gYWRkIHRoZSBjb252ZXJ0ZWQgSW1hZ2VIYXNoXHJcbiAqIEByZXR1cm5zIEltYWdlUGFpbnQgUmV0dXJucyBhIG5ldyBJbWFnZVBhaW50IHdpdGggdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2ggYWRkZWQgdG8gaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShieXRlcywgcGFpbnQpIHtcclxuICAgIC8vIENyZWF0ZSBhIG5ldyBwYWludCBmb3IgdGhlIG5ldyBpbWFnZS5cclxuICAgIGNvbnN0IG5ld1BhaW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYWludCkpO1xyXG4gICAgbmV3UGFpbnQuaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UoYnl0ZXMpLmhhc2g7XHJcbiAgICByZXR1cm4gbmV3UGFpbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhcnJ5IG91dCB0aGUgaW1hZ2UgZGl0aGVyaW5nIHByb2NjZXNzZXMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IFRBU0tTID0gbmV3IFF1ZXVlKCk7XHJcbiAgICAgICAgbGV0IG5vZGVGaWxscyA9IFtdO1xyXG4gICAgICAgIGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEltYWdlRmlsbHMgPSBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2Rlc1dpdGhJbWFnZUZpbGxzLmZvckVhY2goZnVuY3Rpb24gKGZpbGxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2Fycnkgb3V0IGRpdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUJ5dGVzID0geWllbGQgZ2V0SW1hZ2VCeXRlcyhmaWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlRmlsbHMucHVzaChmaWxsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRhc2tUb1Bvb2woeyBpbWFnZUJ5dGVzOiBpbWFnZUJ5dGVzLCBmaWxsRGF0YTogZmlsbERhdGEgfSwgVEFTS1MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB3YWl0IHRpbGwgYWxsIGpvYnMgYXJlIGFkZGVkLi5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBwcm9jZXNzaW5nIGpvYnMuLlxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5UHJvY2Vzc1Jlc3VsdHMoeWllbGQgcHJvY2Vzc0pvYnMoVEFTS1MpLCBub2RlRmlsbHMsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBBcHBsaWVzIHRoZSBwcm9jZXNzZWQgZGl0aGVyIGVmZmVjdCB0byBhcHByb3ByaWF0ZSBub2Rlc1xyXG4gKiBAcGFyYW0gIHtKb2JSZXN1bHRbXX0gcmVzdWx0c1xyXG4gKiBAcGFyYW0gIHtJbWFnZUZpbGxEYXRhW119IG5vZGVGaWxsc1xyXG4gKiBAcGFyYW0gIHthbnl9IHJlc29sdmVcclxuICovXHJcbmZ1bmN0aW9uIGFwcGx5UHJvY2Vzc1Jlc3VsdHMocmVzdWx0cywgbm9kZUZpbGxzLCByZXNvbHZlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhub2RlRmlsbHMpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2Nlc3NEaXRoZXJFZmZlY3QgPSBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShyZXN1bHQuaW1hZ2VCeXRlcywgcmVzdWx0LmZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgLy8gY2xvbmUgdGhlIG5vZGUgZmlsbHNcclxuICAgICAgICBjb25zdCBjb3B5Tm9kZUZpbGxzID0gWy4uLm5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxsc107XHJcbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgaW1hZ2UgZmlsdGVyXHJcbiAgICAgICAgY29weU5vZGVGaWxscy5zcGxpY2UocmVzdWx0LmZpbGxEYXRhLmluZGV4LCAxLCBwcm9jZXNzRGl0aGVyRWZmZWN0KTtcclxuICAgICAgICBub2RlRmlsbHNbaW5kZXhdLm5vZGUuZmlsbHMgPSBjb3B5Tm9kZUZpbGxzO1xyXG4gICAgfSk7XHJcbiAgICAvLyByZXNvbHZlIHRocmUgcHJvbWlzZSBhZnRlciBhcHBseWluZyBkaXRoZXJpbmcgZWZmZWN0LlxyXG4gICAgcmVzb2x2ZSgpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IFwiPHN0eWxlPlxcclxcblxcclxcbiAgYm9keSwgaHRtbCB7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRlckNvbnRhaW5lclxcclxcbiAge1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgaGVpZ2h0OiA1NXB4O1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgfVxcclxcbiAgLmxkcy1yaW5nIHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHdpZHRoOiA2NHB4O1xcclxcbiAgICBoZWlnaHQ6IDY0cHg7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoLjUpO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sb2FkaW5nLXRleHQge1xcclxcbiAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXHJcXG4gICAgZm9udC1zaXplOiAxMXB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGNvbG9yOiAjNTU1O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdiB7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHdpZHRoOiA1MXB4O1xcclxcbiAgICBoZWlnaHQ6IDUxcHg7XFxyXFxuICAgIGJvcmRlcjogNnB4IHNvbGlkICMwMGFjZWQ7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgYW5pbWF0aW9uOiBsZHMtcmluZyAxLjJzIGN1YmljLWJlemllcigwLjUsIDAsIDAuNSwgMSkgaW5maW5pdGU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogIzAwYWNlZCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDEpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC40NXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgyKSB7XFxyXFxuICAgIGFuaW1hdGlvbi1kZWxheTogLTAuM3M7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMTVzO1xcclxcbiAgfVxcclxcblxcclxcbiAgQGtleWZyYW1lcyBsZHMtcmluZyB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxuPC9zdHlsZT5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG48ZGl2IGNsYXNzPVxcXCJsb2FkZXJDb250YWluZXJcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsZHMtcmluZ1xcXCI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwibG9hZGluZy10ZXh0XFxcIj5cXHJcXG4gICAgICAgIGRpdGhlcmluZy4uXFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxzY3JpcHQ+XFxyXFxuICAvLyBFbmNvZGluZyBhbiBpbWFnZSBpcyBhbHNvIGRvbmUgYnkgc3RpY2tpbmcgcGl4ZWxzIGluIGFuXFxyXFxuICAvLyBIVE1MIGNhbnZhcyBhbmQgYnkgYXNraW5nIHRoZSBjYW52YXMgdG8gc2VyaWFsaXplIGl0IGludG9cXHJcXG4gIC8vIGFuIGFjdHVhbCBQTkcgZmlsZSB2aWEgY2FudmFzLnRvQmxvYigpLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZW5jb2RlKGNhbnZhcywgY3R4LCBpbWFnZURhdGEpIHtcXHJcXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXFxyXFxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHtcXHJcXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcXHJcXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpKVxcclxcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdDb3VsZCBub3QgcmVhZCBmcm9tIGJsb2InKSlcXHJcXG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxcclxcbiAgICAgIH0pXFxyXFxuICAgIH0pXFxyXFxuICB9XFxyXFxuXFxyXFxuICAvLyBEZWNvZGluZyBhbiBpbWFnZSBjYW4gYmUgZG9uZSBieSBzdGlja2luZyBpdCBpbiBhbiBIVE1MXFxyXFxuICAvLyBjYW52YXMsIGFzIHdlIGNhbiByZWFkIGluZGl2aWR1YWwgcGl4ZWxzIG9mZiB0aGUgY2FudmFzLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcykge1xcclxcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtieXRlc10pKVxcclxcbiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXHJcXG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxcclxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltZylcXHJcXG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHJlamVjdCgpXFxyXFxuICAgICAgaW1nLnNyYyA9IHVybFxcclxcbiAgICB9KVxcclxcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aFxcclxcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XFxyXFxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXFxyXFxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodClcXHJcXG4gICAgcmV0dXJuIGltYWdlRGF0YVxcclxcbiAgfVxcclxcblxcclxcbiAgLy8gQ3JlYXRlIGFuIGV2ZW50IGhhbmRsZXIgdG8gcmVjZWl2ZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluXFxyXFxuICAvLyB0aHJlYWQuXFxyXFxuICB3aW5kb3cub25tZXNzYWdlID0gYXN5bmMgZXZlbnQgPT4ge1xcclxcbiAgICAvLyBKdXN0IGdldCB0aGUgYnl0ZXMgZGlyZWN0bHkgZnJvbSB0aGUgcGx1Z2luTWVzc2FnZSBzaW5jZVxcclxcbiAgICAvLyB0aGF0J3MgdGhlIG9ubHkgdHlwZSBvZiBtZXNzYWdlIHdlJ2xsIHJlY2VpdmUgaW4gdGhpc1xcclxcbiAgICAvLyBwbHVnaW4uIEluIG1vcmUgY29tcGxleCBwbHVnaW5zLCB5b3UnbGwgd2FudCB0byBjaGVjayB0aGVcXHJcXG4gICAgLy8gdHlwZSBvZiB0aGUgbWVzc2FnZS5cXHJcXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xcclxcbiAgICBjb25zdCBqb2JzID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xcclxcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSB7XFxyXFxuICAgICAgcmVzdWx0cy5wdXNoKHtcXHJcXG4gICAgICAgIGltYWdlQnl0ZXM6IGF3YWl0IHByb2Nlc3NEaXRoZXIoam9iKSxcXHJcXG4gICAgICAgIGZpbGxEYXRhOiBqb2IuZmlsbERhdGFcXHJcXG4gICAgICB9KTtcXHJcXG4gICAgfVxcclxcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcXHJcXG4gICAgICBwbHVnaW5NZXNzYWdlOiByZXN1bHRzXFxyXFxuICAgIH0sIFxcXCIqXFxcIik7XFxyXFxuICB9O1xcclxcblxcclxcbiAgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0RpdGhlcihqb2IpIHtcXHJcXG4gICAgY29uc3QgYnl0ZXMgPSBqb2IuaW1hZ2VCeXRlcztcXHJcXG5cXHJcXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcXFwiY2FudmFzXFxcIik7XFxyXFxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFxcXCIyZFxcXCIpO1xcclxcblxcclxcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCBkZWNvZGUoY2FudmFzLCBjdHgsIGJ5dGVzKTtcXHJcXG4gICAgY29uc3QgcGl4ZWxzID0gaW1hZ2VEYXRhLmRhdGE7XFxyXFxuXFxyXFxuICAgIC8vIERvIHRoZSBhY3R1YWwgd29yayBvZiBpbnZlcnRpbmcgdGhlIGNvbG9ycy5cXHJcXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaXhlbHMubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICBwaXhlbHNbaSArIDBdID0gMjU1IC0gcGl4ZWxzW2kgKyAwXTtcXHJcXG4gICAgICBwaXhlbHNbaSArIDFdID0gMjU1IC0gcGl4ZWxzW2kgKyAxXTtcXHJcXG4gICAgICBwaXhlbHNbaSArIDJdID0gMjU1IC0gcGl4ZWxzW2kgKyAyXTtcXHJcXG4gICAgICAvLyBEb24ndCBpbnZlcnQgdGhlIGFscGhhIGNoYW5uZWwuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgY29uc3QgbmV3Qnl0ZXMgPSBhd2FpdCBlbmNvZGUoY2FudmFzLCBjdHgsIGltYWdlRGF0YSk7XFxyXFxuICAgIHJldHVybiBuZXdCeXRlcztcXHJcXG4gIH1cXHJcXG48L3NjcmlwdD5cIiJdLCJzb3VyY2VSb290IjoiIn0=