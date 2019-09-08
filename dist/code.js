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
figma.showUI(__html__, { height: 500 });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    if (msg.type === "dither-image") {
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
/* harmony default export */ __webpack_exports__["default"] = ("<style>\r\n\r\n  body, html {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  body {\r\n    display: flex;\r\n  }\r\n\r\n  .loaderContainer\r\n  {\r\n    margin: auto;\r\n    text-align: center;\r\n    height: 55px;\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  .lds-ring {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 64px;\r\n    height: 64px;\r\n    transform: scale(.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n\r\n  .loading-text {\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    font-size: 10px;\r\n    text-align: center;\r\n  }\r\n\r\n  .lds-ring div {\r\n    box-sizing: border-box;\r\n    display: block;\r\n    position: absolute;\r\n    width: 51px;\r\n    height: 51px;\r\n    border: 6px solid #00aced;\r\n    border-radius: 50%;\r\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n    border-color: #00aced transparent transparent transparent;\r\n  }\r\n\r\n  .lds-ring div:nth-child(1) {\r\n    animation-delay: -0.45s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(2) {\r\n    animation-delay: -0.3s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(3) {\r\n    animation-delay: -0.15s;\r\n  }\r\n\r\n  @keyframes lds-ring {\r\n    0% {\r\n      transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n</style>\r\n\r\n\r\n\r\n<div class=\"loaderContainer\">\r\n    <div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div>\r\n    <div class=\"loading-text\">\r\n        Dithering\r\n    </div>\r\n</div>\r\n<script>\r\n  // Encoding an image is also done by sticking pixels in an\r\n  // HTML canvas and by asking the canvas to serialize it into\r\n  // an actual PNG file via canvas.toBlob().\r\n  async function encode(canvas, ctx, imageData) {\r\n    ctx.putImageData(imageData, 0, 0)\r\n    return await new Promise((resolve, reject) => {\r\n      canvas.toBlob(blob => {\r\n        const reader = new FileReader()\r\n        reader.onload = () => resolve(new Uint8Array(reader.result))\r\n        reader.onerror = () => reject(new Error('Could not read from blob'))\r\n        reader.readAsArrayBuffer(blob)\r\n      })\r\n    })\r\n  }\r\n\r\n  // Decoding an image can be done by sticking it in an HTML\r\n  // canvas, as we can read individual pixels off the canvas.\r\n  async function decode(canvas, ctx, bytes) {\r\n    const url = URL.createObjectURL(new Blob([bytes]))\r\n    const image = await new Promise((resolve, reject) => {\r\n      const img = new Image()\r\n      img.onload = () => resolve(img)\r\n      img.onerror = () => reject()\r\n      img.src = url\r\n    })\r\n    canvas.width = image.width\r\n    canvas.height = image.height\r\n    ctx.drawImage(image, 0, 0)\r\n    const imageData = ctx.getImageData(0, 0, image.width, image.height)\r\n    return imageData\r\n  }\r\n\r\n  // Create an event handler to receive messages from the main\r\n  // thread.\r\n  window.onmessage = async event => {\r\n    // Just get the bytes directly from the pluginMessage since\r\n    // that's the only type of message we'll receive in this\r\n    // plugin. In more complex plugins, you'll want to check the\r\n    // type of the message.\r\n    const results = [];\r\n    const jobs = event.data.pluginMessage;\r\n    for (const job of jobs) {\r\n      results.push({\r\n        imageBytes: await processDither(job),\r\n        fillData: job.fillData\r\n      });\r\n    }\r\n    window.parent.postMessage({\r\n      pluginMessage: results\r\n    }, \"*\");\r\n  };\r\n\r\n  async function processDither(job) {\r\n    const bytes = job.imageBytes;\r\n\r\n    const canvas = document.createElement(\"canvas\");\r\n    const ctx = canvas.getContext(\"2d\");\r\n\r\n    const imageData = await decode(canvas, ctx, bytes);\r\n    const pixels = imageData.data;\r\n\r\n    // Do the actual work of inverting the colors.\r\n    for (let i = 0; i < pixels.length; i += 4) {\r\n      pixels[i + 0] = 255 - pixels[i + 0];\r\n      pixels[i + 1] = 255 - pixels[i + 1];\r\n      pixels[i + 2] = 255 - pixels[i + 2];\r\n      // Don't invert the alpha channel.\r\n    }\r\n\r\n    const newBytes = await encode(canvas, ctx, imageData);\r\n    return newBytes;\r\n  }\r\n</script>");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1RUFBb0IsQ0FBQyx1RUFBb0I7QUFDM0UsUUFBUSxnRUFBYTtBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7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LCtIQUErSCxpUUFBaVEsOENBQThDLGlDQUFpQyx3QkFBd0IsOEZBQThGLEVBQUUsU0FBUyxtQ0FBbUMseUNBQXlDLFNBQVMsUUFBUSw2Q0FBNkMscUNBQXFDLDhEQUE4RCw4Q0FBOEMsK0RBQStELHNDQUFzQyxpRkFBaUYsbUJBQW1CLFVBQVUsOENBQThDLDhDQUE4Qyw4Q0FBOEMscURBQXFELGtFQUFrRSx3QkFBd0IsT0FBTyxjIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbnMsIGZpbHRlck5vZGVzV2l0aEZpbGxzLCBEb0ltYWdlRGl0aGVyIH0gZnJvbSBcIi4vbGliL3V0aWxzXCI7XHJcbi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXHJcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cclxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxyXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcclxuLy8gZnVsbCBicm93c2VyIGVudmlyb21lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cclxuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgaGVpZ2h0OiA1MDAgfSk7XHJcbi8vIENhbGxzIHRvIFwicGFyZW50LnBvc3RNZXNzYWdlXCIgZnJvbSB3aXRoaW4gdGhlIEhUTUwgcGFnZSB3aWxsIHRyaWdnZXIgdGhpc1xyXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcclxuLy8gcG9zdGVkIG1lc3NhZ2UuXHJcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XHJcbiAgICBpZiAobXNnLnR5cGUgPT09IFwiZGl0aGVyLWltYWdlXCIpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9ucyA9IGZpbHRlck5vZGVzV2l0aEZpbGxzKGdldEN1cnJlbnRTZWxlY3Rpb25zKCkpO1xyXG4gICAgICAgIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJjYW5jZWxcIikge1xyXG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlIHN1cmUgdG8gY2xvc2UgdGhlIHBsdWdpbiB3aGVuIHlvdSdyZSBkb25lLiBPdGhlcndpc2UgdGhlIHBsdWdpbiB3aWxsXHJcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIFF1ZXVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlID0gW107XHJcbiAgICB9XHJcbiAgICBlbnF1ZXVlKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlLnB1c2godmFsKTtcclxuICAgIH1cclxuICAgIGRlcXVldWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAnLi9RdWV1ZSc7XHJcbmltcG9ydCB3b3JrZXJUZW1wbGF0ZSBmcm9tICcuLi93b3JrZXIvZW50cnkuaHRtbCc7XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50IFVzZXIgU2VsZWN0aW9uKHMpXHJcbiAqIEByZXR1cm5zIHJlYWRvbmx5IFNjZW5lTm9kZVtdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG59XHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG5uZGVzIHRoYXQgaGF2ZSBmaWxscy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gbm9kZXNcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9kZXNXaXRoRmlsbHMobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGVXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiBcImZpbGxzXCIgaW4gbm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZVdpdGhGaWxscy5sZW5ndGggPT0gMCA/IFtdIDogbm9kZVdpdGhGaWxscztcclxufVxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIGl0ZXJhdGFibGVcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuZnVuY3Rpb24gX2lzSXRlcmFibGUob2JqKSB7XHJcbiAgICAvLyBjaGVja3MgZm9yIG51bGwgYW5kIHVuZGVmaW5lZFxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmpbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBJbWFnZSBmaWxscyBmcm9tIGEgbm9kZS5cclxuICogQHBhcmFtICB7U2NlbmVOb2RlfSBub2RlIE5vZGUgdG8gZXh0cmFjdCB0aGUgaW1hZ2UgZmlsbHNcclxuICogQHJldHVybnMgSW1hZ2VGaWxsRGF0YVtdIEFuIGFycmF5IG9mIGltYWdlIGZpbGxzIG9mIHRoZSBub2RlIGFzIEltYWdlRmlsbERhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgcmVzdWx0aW5nSW1hZ2VGaWxscyA9IFtdO1xyXG4gICAgbGV0IGZpbGxzID0gbm9kZS5maWxscztcclxuICAgIGlmIChfaXNJdGVyYWJsZShmaWxscykpIHtcclxuICAgICAgICBmaWxscyA9IGZpbGxzO1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nSW1hZ2VGaWxscy5wdXNoKHsgaW1hZ2VGaWxsOiBmaWxsLCBpbmRleDogaW5kZXgsIG5vZGU6IG5vZGUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0aW5nSW1hZ2VGaWxscztcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgSW1hZ2VCeXRlcyBmcm9tIGEgSW1hZ2VQYWludCBmaWxsXHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IGZpbGxcclxuICogQHJldHVybnMgUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlQnl0ZXMoZmlsbCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKGZpbGwuaW1hZ2VIYXNoKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQWRkcyBhIGpvYiB0byB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHthbnl9IHRhc2tcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrVG9Qb29sKHRhc2ssIHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5lbnF1ZXVlKHRhc2spO1xyXG59XHJcbi8qKlxyXG4gKiBTcGF3biBhIHdvcmtlciB0byBwcm9jZXNzIHRoZSB0YXNrcyBpbiB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZSBUYXNrIHF1ZXVlXHJcbiAqIEByZXR1cm5zIFByb21pc2U8Sm9iUmVzdWx0W10+IFJldHVybnMgYW4gYXJyYXkgb2YgSm9iUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0pvYnMocXVldWUpIHtcclxuICAgIGNvbnN0IGpvYnMgPSBxdWV1ZS50b0FycmF5KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFsbCBqb2JzXCIsIGpvYnMpO1xyXG4gICAgLy8gQ3JlYXRlIGFuIGludmlzaWJsZSBpZnJhbWUgdG8gYWN0IGFzIGEgXCJ3b3JrZXJcIiB3aGljaFxyXG4gICAgLy8gd2lsbCBkbyB0aGUgdGFzayBvZiBkZWNvZGluZyBhbmQgc2VuZCB1cyBhIG1lc3NhZ2VcclxuICAgIC8vIHdoZW4gaXQncyBkb25lLlxyXG4gICAgZmlnbWEuc2hvd1VJKHdvcmtlclRlbXBsYXRlLCB7IHZpc2libGU6IHRydWUsIHdpZHRoOiAyMDAsIGhlaWdodDogMTI1IH0pO1xyXG4gICAgLy8gU2VuZCB0aGUgcmF3IGJ5dGVzIG9mIHRoZSBmaWxlIHRvIHRoZSB3b3JrZXIuXHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShqb2JzKTtcclxuICAgIC8vIFdhaXQgZm9yIHRoZSB3b3JrZXIncyByZXNwb25zZS5cclxuICAgIGNvbnN0IGpvYnNSZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gdmFsdWUgPT4gcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBqb2JzUmVzdWx0O1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBJbWFnZUJ5dGVzIHRvIEltYWdlSGFzaCBhbmQgYWRkcyB0byBJbWFnZVBhaW50XHJcbiAqIEBwYXJhbSAge1VpbnQ4QXJyYXl9IGJ5dGVzICBJbWFnZWJ5dGVzIHRvIGNvbnZlcnRcclxuICogQHBhcmFtICB7SW1hZ2VQYWludH0gcGFpbnQgSW1hZ2VQYWludCB0byBhZGQgdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2hcclxuICogQHJldHVybnMgSW1hZ2VQYWludCBSZXR1cm5zIGEgbmV3IEltYWdlUGFpbnQgd2l0aCB0aGUgY29udmVydGVkIEltYWdlSGFzaCBhZGRlZCB0byBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKGJ5dGVzLCBwYWludCkge1xyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHBhaW50IGZvciB0aGUgbmV3IGltYWdlLlxyXG4gICAgY29uc3QgbmV3UGFpbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhaW50KSk7XHJcbiAgICBuZXdQYWludC5pbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShieXRlcykuaGFzaDtcclxuICAgIHJldHVybiBuZXdQYWludDtcclxufVxyXG4vKipcclxuICogQ2Fycnkgb3V0IHRoZSBpbWFnZSBkaXRoZXJpbmcgcHJvY2Nlc3Nlcy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgVEFTS1MgPSBuZXcgUXVldWUoKTtcclxuICAgICAgICBsZXQgbm9kZUZpbGxzID0gW107XHJcbiAgICAgICAgY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoSW1hZ2VGaWxscyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGVzV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAoZmlsbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXJyeSBvdXQgZGl0aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQnl0ZXMgPSB5aWVsZCBnZXRJbWFnZUJ5dGVzKGZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVGaWxscy5wdXNoKGZpbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGFza1RvUG9vbCh7IGltYWdlQnl0ZXM6IGltYWdlQnl0ZXMsIGZpbGxEYXRhOiBmaWxsRGF0YSB9LCBUQVNLUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdGlsbCBhbGwgam9icyBhcmUgYWRkZWQuLlxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHByb2Nlc3Npbmcgam9icy4uXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlQcm9jZXNzUmVzdWx0cyh5aWVsZCBwcm9jZXNzSm9icyhUQVNLUyksIG5vZGVGaWxscywgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFwcGxpZXMgdGhlIHByb2Nlc3NlZCBkaXRoZXIgZWZmZWN0IHRvIGFwcHJvcHJpYXRlIG5vZGVzXHJcbiAqIEBwYXJhbSAge0pvYlJlc3VsdFtdfSByZXN1bHRzXHJcbiAqIEBwYXJhbSAge0ltYWdlRmlsbERhdGFbXX0gbm9kZUZpbGxzXHJcbiAqIEBwYXJhbSAge2FueX0gcmVzb2x2ZVxyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlQcm9jZXNzUmVzdWx0cyhyZXN1bHRzLCBub2RlRmlsbHMsIHJlc29sdmUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKG5vZGVGaWxscyk7XHJcbiAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvY2Vzc0RpdGhlckVmZmVjdCA9IEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKHJlc3VsdC5pbWFnZUJ5dGVzLCByZXN1bHQuZmlsbERhdGEuaW1hZ2VGaWxsKTtcclxuICAgICAgICAvLyBjbG9uZSB0aGUgbm9kZSBmaWxsc1xyXG4gICAgICAgIGNvbnN0IGNvcHlOb2RlRmlsbHMgPSBbLi4ubm9kZUZpbGxzW2luZGV4XS5ub2RlLmZpbGxzXTtcclxuICAgICAgICAvLyByZXBsYWNlIHRoZSBpbWFnZSBmaWx0ZXJcclxuICAgICAgICBjb3B5Tm9kZUZpbGxzLnNwbGljZShyZXN1bHQuZmlsbERhdGEuaW5kZXgsIDEsIHByb2Nlc3NEaXRoZXJFZmZlY3QpO1xyXG4gICAgICAgIG5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxscyA9IGNvcHlOb2RlRmlsbHM7XHJcbiAgICB9KTtcclxuICAgIC8vIHJlc29sdmUgdGhyZSBwcm9taXNlIGFmdGVyIGFwcGx5aW5nIGRpdGhlcmluZyBlZmZlY3QuXHJcbiAgICByZXNvbHZlKCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3R5bGU+XFxyXFxuXFxyXFxuICBib2R5LCBodG1sIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgfVxcclxcblxcclxcbiAgYm9keSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubG9hZGVyQ29udGFpbmVyXFxyXFxuICB7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxuICAubGRzLXJpbmcge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDY0cHg7XFxyXFxuICAgIGhlaWdodDogNjRweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRpbmctdGV4dCB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcXHJcXG4gICAgZm9udC1zaXplOiAxMHB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2IHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDUxcHg7XFxyXFxuICAgIGhlaWdodDogNTFweDtcXHJcXG4gICAgYm9yZGVyOiA2cHggc29saWQgIzAwYWNlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDBhY2VkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGxkcy1yaW5nIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG48L3N0eWxlPlxcclxcblxcclxcblxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImxvYWRlckNvbnRhaW5lclxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImxkcy1yaW5nXFxcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkaW5nLXRleHRcXFwiPlxcclxcbiAgICAgICAgRGl0aGVyaW5nXFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjxzY3JpcHQ+XFxyXFxuICAvLyBFbmNvZGluZyBhbiBpbWFnZSBpcyBhbHNvIGRvbmUgYnkgc3RpY2tpbmcgcGl4ZWxzIGluIGFuXFxyXFxuICAvLyBIVE1MIGNhbnZhcyBhbmQgYnkgYXNraW5nIHRoZSBjYW52YXMgdG8gc2VyaWFsaXplIGl0IGludG9cXHJcXG4gIC8vIGFuIGFjdHVhbCBQTkcgZmlsZSB2aWEgY2FudmFzLnRvQmxvYigpLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZW5jb2RlKGNhbnZhcywgY3R4LCBpbWFnZURhdGEpIHtcXHJcXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXFxyXFxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHtcXHJcXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcXHJcXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpKVxcclxcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdDb3VsZCBub3QgcmVhZCBmcm9tIGJsb2InKSlcXHJcXG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxcclxcbiAgICAgIH0pXFxyXFxuICAgIH0pXFxyXFxuICB9XFxyXFxuXFxyXFxuICAvLyBEZWNvZGluZyBhbiBpbWFnZSBjYW4gYmUgZG9uZSBieSBzdGlja2luZyBpdCBpbiBhbiBIVE1MXFxyXFxuICAvLyBjYW52YXMsIGFzIHdlIGNhbiByZWFkIGluZGl2aWR1YWwgcGl4ZWxzIG9mZiB0aGUgY2FudmFzLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcykge1xcclxcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtieXRlc10pKVxcclxcbiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXHJcXG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxcclxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltZylcXHJcXG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHJlamVjdCgpXFxyXFxuICAgICAgaW1nLnNyYyA9IHVybFxcclxcbiAgICB9KVxcclxcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aFxcclxcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XFxyXFxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXFxyXFxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodClcXHJcXG4gICAgcmV0dXJuIGltYWdlRGF0YVxcclxcbiAgfVxcclxcblxcclxcbiAgLy8gQ3JlYXRlIGFuIGV2ZW50IGhhbmRsZXIgdG8gcmVjZWl2ZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluXFxyXFxuICAvLyB0aHJlYWQuXFxyXFxuICB3aW5kb3cub25tZXNzYWdlID0gYXN5bmMgZXZlbnQgPT4ge1xcclxcbiAgICAvLyBKdXN0IGdldCB0aGUgYnl0ZXMgZGlyZWN0bHkgZnJvbSB0aGUgcGx1Z2luTWVzc2FnZSBzaW5jZVxcclxcbiAgICAvLyB0aGF0J3MgdGhlIG9ubHkgdHlwZSBvZiBtZXNzYWdlIHdlJ2xsIHJlY2VpdmUgaW4gdGhpc1xcclxcbiAgICAvLyBwbHVnaW4uIEluIG1vcmUgY29tcGxleCBwbHVnaW5zLCB5b3UnbGwgd2FudCB0byBjaGVjayB0aGVcXHJcXG4gICAgLy8gdHlwZSBvZiB0aGUgbWVzc2FnZS5cXHJcXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xcclxcbiAgICBjb25zdCBqb2JzID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xcclxcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSB7XFxyXFxuICAgICAgcmVzdWx0cy5wdXNoKHtcXHJcXG4gICAgICAgIGltYWdlQnl0ZXM6IGF3YWl0IHByb2Nlc3NEaXRoZXIoam9iKSxcXHJcXG4gICAgICAgIGZpbGxEYXRhOiBqb2IuZmlsbERhdGFcXHJcXG4gICAgICB9KTtcXHJcXG4gICAgfVxcclxcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcXHJcXG4gICAgICBwbHVnaW5NZXNzYWdlOiByZXN1bHRzXFxyXFxuICAgIH0sIFxcXCIqXFxcIik7XFxyXFxuICB9O1xcclxcblxcclxcbiAgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0RpdGhlcihqb2IpIHtcXHJcXG4gICAgY29uc3QgYnl0ZXMgPSBqb2IuaW1hZ2VCeXRlcztcXHJcXG5cXHJcXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcXFwiY2FudmFzXFxcIik7XFxyXFxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFxcXCIyZFxcXCIpO1xcclxcblxcclxcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCBkZWNvZGUoY2FudmFzLCBjdHgsIGJ5dGVzKTtcXHJcXG4gICAgY29uc3QgcGl4ZWxzID0gaW1hZ2VEYXRhLmRhdGE7XFxyXFxuXFxyXFxuICAgIC8vIERvIHRoZSBhY3R1YWwgd29yayBvZiBpbnZlcnRpbmcgdGhlIGNvbG9ycy5cXHJcXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaXhlbHMubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICBwaXhlbHNbaSArIDBdID0gMjU1IC0gcGl4ZWxzW2kgKyAwXTtcXHJcXG4gICAgICBwaXhlbHNbaSArIDFdID0gMjU1IC0gcGl4ZWxzW2kgKyAxXTtcXHJcXG4gICAgICBwaXhlbHNbaSArIDJdID0gMjU1IC0gcGl4ZWxzW2kgKyAyXTtcXHJcXG4gICAgICAvLyBEb24ndCBpbnZlcnQgdGhlIGFscGhhIGNoYW5uZWwuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgY29uc3QgbmV3Qnl0ZXMgPSBhd2FpdCBlbmNvZGUoY2FudmFzLCBjdHgsIGltYWdlRGF0YSk7XFxyXFxuICAgIHJldHVybiBuZXdCeXRlcztcXHJcXG4gIH1cXHJcXG48L3NjcmlwdD5cIiJdLCJzb3VyY2VSb290IjoiIn0=