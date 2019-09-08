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
figma.showUI(__html__);
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


console.log(_worker_entry_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
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
    console.log("All jobs", jobs);
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
    console.log(nodeFills);
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
/* harmony default export */ __webpack_exports__["default"] = ("<style>\r\n\r\n  body, html {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n  }\r\n\r\n  body {\r\n    display: flex;\r\n  }\r\n\r\n  .loaderContainer\r\n  {\r\n    margin: auto;\r\n    text-align: center;\r\n    height: 55px;\r\n    display: flex;\r\n    flex-direction: column;\r\n  }\r\n  .lds-ring {\r\n    display: inline-block;\r\n    position: relative;\r\n    width: 64px;\r\n    height: 64px;\r\n    transform: scale(.5);\r\n    justify-content: center;\r\n    align-items: center;\r\n  }\r\n\r\n  .loading-text {\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    font-size: 10px;\r\n    text-align: center;\r\n  }\r\n\r\n  .lds-ring div {\r\n    box-sizing: border-box;\r\n    display: block;\r\n    position: absolute;\r\n    width: 51px;\r\n    height: 51px;\r\n    border: 6px solid #00aced;\r\n    border-radius: 50%;\r\n    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\r\n    border-color: #00aced transparent transparent transparent;\r\n  }\r\n\r\n  .lds-ring div:nth-child(1) {\r\n    animation-delay: -0.45s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(2) {\r\n    animation-delay: -0.3s;\r\n  }\r\n\r\n  .lds-ring div:nth-child(3) {\r\n    animation-delay: -0.15s;\r\n  }\r\n\r\n  @keyframes lds-ring {\r\n    0% {\r\n      transform: rotate(0deg);\r\n    }\r\n\r\n    100% {\r\n      transform: rotate(360deg);\r\n    }\r\n  }\r\n</style>\r\n\r\n\r\n\r\n<div class=\"loaderContainer\">\r\n    <div class=\"lds-ring\"><div></div><div></div><div></div><div></div></div>\r\n    <div class=\"loading-text\">\r\n        Dithering\r\n    </div>\r\n</div>\r\n\r\n\r\n<script>\r\n  // Encoding an image is also done by sticking pixels in an\r\n  // HTML canvas and by asking the canvas to serialize it into\r\n  // an actual PNG file via canvas.toBlob().\r\n  async function encode(canvas, ctx, imageData) {\r\n    ctx.putImageData(imageData, 0, 0)\r\n    return await new Promise((resolve, reject) => {\r\n      canvas.toBlob(blob => {\r\n        const reader = new FileReader()\r\n        reader.onload = () => resolve(new Uint8Array(reader.result))\r\n        reader.onerror = () => reject(new Error('Could not read from blob'))\r\n        reader.readAsArrayBuffer(blob)\r\n      })\r\n    })\r\n  }\r\n\r\n  // Decoding an image can be done by sticking it in an HTML\r\n  // canvas, as we can read individual pixels off the canvas.\r\n  async function decode(canvas, ctx, bytes) {\r\n    const url = URL.createObjectURL(new Blob([bytes]))\r\n    const image = await new Promise((resolve, reject) => {\r\n      const img = new Image()\r\n      img.onload = () => resolve(img)\r\n      img.onerror = () => reject()\r\n      img.src = url\r\n    })\r\n    canvas.width = image.width\r\n    canvas.height = image.height\r\n    ctx.drawImage(image, 0, 0)\r\n    const imageData = ctx.getImageData(0, 0, image.width, image.height)\r\n    return imageData\r\n  }\r\n\r\n  // Create an event handler to receive messages from the main\r\n  // thread.\r\n  window.onmessage = async event => {\r\n    // Just get the bytes directly from the pluginMessage since\r\n    // that's the only type of message we'll receive in this\r\n    // plugin. In more complex plugins, you'll want to check the\r\n    // type of the message.\r\n    const results = [];\r\n    const jobs = event.data.pluginMessage;\r\n    for (const job of jobs) {\r\n      results.push({\r\n        imageBytes: await processDither(job),\r\n        fillData: job.fillData\r\n      });\r\n    }\r\n    window.parent.postMessage({\r\n      pluginMessage: results\r\n    }, \"*\");\r\n  };\r\n\r\n  async function processDither(job) {\r\n    const bytes = job.imageBytes;\r\n\r\n    const canvas = document.createElement(\"canvas\");\r\n    const ctx = canvas.getContext(\"2d\");\r\n\r\n    const imageData = await decode(canvas, ctx, bytes);\r\n    const pixels = imageData.data;\r\n\r\n    // Do the actual work of inverting the colors.\r\n    for (let i = 0; i < pixels.length; i += 4) {\r\n      pixels[i + 0] = 255 - pixels[i + 0];\r\n      pixels[i + 1] = 255 - pixels[i + 1];\r\n      pixels[i + 2] = 255 - pixels[i + 2];\r\n      // Don't invert the alpha channel.\r\n    }\r\n\r\n    const newBytes = await encode(canvas, ctx, imageData);\r\n    return newBytes;\r\n  }\r\n</script>");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy93b3JrZXIvZW50cnkuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVFQUFvQixDQUFDLHVFQUFvQjtBQUMzRSxRQUFRLGdFQUFhO0FBQ3JCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFPO0FBQ1A7QUFD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QWlRLDhDQUE4QyxpQ0FBaUMsd0JBQXdCLDhGQUE4RixFQUFFLFNBQVMsbUNBQW1DLHlDQUF5QyxTQUFTLFFBQVEsNkNBQTZDLHFDQUFxQyw4REFBOEQsOENBQThDLCtEQUErRCxzQ0FBc0MsaUZBQWlGLG1CQUFtQixVQUFVLDhDQUE4Qyw4Q0FBOEMsOENBQThDLHFEQUFxRCxrRUFBa0Usd0JBQXdCLE9BQU8sYyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS50c1wiKTtcbiIsImltcG9ydCB7IGdldEN1cnJlbnRTZWxlY3Rpb25zLCBmaWx0ZXJOb2Rlc1dpdGhGaWxscywgRG9JbWFnZURpdGhlciB9IGZyb20gXCIuL2xpYi91dGlsc1wiO1xyXG4vLyBUaGlzIHBsdWdpbiB3aWxsIG9wZW4gYSBtb2RhbCB0byBwcm9tcHQgdGhlIHVzZXIgdG8gZW50ZXIgYSBudW1iZXIsIGFuZFxyXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIHRoYXQgbWFueSByZWN0YW5nbGVzIG9uIHRoZSBzY3JlZW4uXHJcbi8vIFRoaXMgZmlsZSBob2xkcyB0aGUgbWFpbiBjb2RlIGZvciB0aGUgcGx1Z2lucy4gSXQgaGFzIGFjY2VzcyB0byB0aGUgKmRvY3VtZW50Ki5cclxuLy8gWW91IGNhbiBhY2Nlc3MgYnJvd3NlciBBUElzIGluIHRoZSA8c2NyaXB0PiB0YWcgaW5zaWRlIFwidWkuaHRtbFwiIHdoaWNoIGhhcyBhXHJcbi8vIGZ1bGwgYnJvd3NlciBlbnZpcm9tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXHJcbi8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cclxuZmlnbWEuc2hvd1VJKF9faHRtbF9fKTtcclxuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXHJcbi8vIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBwYXNzZWQgdGhlIFwicGx1Z2luTWVzc2FnZVwiIHByb3BlcnR5IG9mIHRoZVxyXG4vLyBwb3N0ZWQgbWVzc2FnZS5cclxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcclxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJkaXRoZXItaW1hZ2VcIikge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3Rpb25zID0gZmlsdGVyTm9kZXNXaXRoRmlsbHMoZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSk7XHJcbiAgICAgICAgRG9JbWFnZURpdGhlcihjdXJyZW50U2VsZWN0aW9ucylcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxyXG4gICAgLy8ga2VlcCBydW5uaW5nLCB3aGljaCBzaG93cyB0aGUgY2FuY2VsIGJ1dHRvbiBhdCB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4uXHJcbn07XHJcbiIsImV4cG9ydCBjbGFzcyBRdWV1ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZSA9IFtdO1xyXG4gICAgfVxyXG4gICAgZW5xdWV1ZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zdG9yZS5wdXNoKHZhbCk7XHJcbiAgICB9XHJcbiAgICBkZXF1ZXVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZS5zaGlmdCgpO1xyXG4gICAgfVxyXG4gICAgdG9BcnJheSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmU7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJy4vUXVldWUnO1xyXG5pbXBvcnQgd29ya2VyVGVtcGxhdGUgZnJvbSAnLi4vd29ya2VyL2VudHJ5Lmh0bWwnO1xyXG5jb25zb2xlLmxvZyh3b3JrZXJUZW1wbGF0ZSk7XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50IFVzZXIgU2VsZWN0aW9uKHMpXHJcbiAqIEByZXR1cm5zIHJlYWRvbmx5IFNjZW5lTm9kZVtdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG59XHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG5uZGVzIHRoYXQgaGF2ZSBmaWxscy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gbm9kZXNcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9kZXNXaXRoRmlsbHMobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGVXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiBcImZpbGxzXCIgaW4gbm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZVdpdGhGaWxscy5sZW5ndGggPT0gMCA/IFtdIDogbm9kZVdpdGhGaWxscztcclxufVxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIGl0ZXJhdGFibGVcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuZnVuY3Rpb24gX2lzSXRlcmFibGUob2JqKSB7XHJcbiAgICAvLyBjaGVja3MgZm9yIG51bGwgYW5kIHVuZGVmaW5lZFxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmpbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBJbWFnZSBmaWxscyBmcm9tIGEgbm9kZS5cclxuICogQHBhcmFtICB7U2NlbmVOb2RlfSBub2RlIE5vZGUgdG8gZXh0cmFjdCB0aGUgaW1hZ2UgZmlsbHNcclxuICogQHJldHVybnMgSW1hZ2VGaWxsRGF0YVtdIEFuIGFycmF5IG9mIGltYWdlIGZpbGxzIG9mIHRoZSBub2RlIGFzIEltYWdlRmlsbERhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgcmVzdWx0aW5nSW1hZ2VGaWxscyA9IFtdO1xyXG4gICAgbGV0IGZpbGxzID0gbm9kZS5maWxscztcclxuICAgIGlmIChfaXNJdGVyYWJsZShmaWxscykpIHtcclxuICAgICAgICBmaWxscyA9IGZpbGxzO1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nSW1hZ2VGaWxscy5wdXNoKHsgaW1hZ2VGaWxsOiBmaWxsLCBpbmRleDogaW5kZXgsIG5vZGU6IG5vZGUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0aW5nSW1hZ2VGaWxscztcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgSW1hZ2VCeXRlcyBmcm9tIGEgSW1hZ2VQYWludCBmaWxsXHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IGZpbGxcclxuICogQHJldHVybnMgUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlQnl0ZXMoZmlsbCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKGZpbGwuaW1hZ2VIYXNoKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQWRkcyBhIGpvYiB0byB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHthbnl9IHRhc2tcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrVG9Qb29sKHRhc2ssIHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5lbnF1ZXVlKHRhc2spO1xyXG59XHJcbi8qKlxyXG4gKiBTcGF3biBhIHdvcmtlciB0byBwcm9jZXNzIHRoZSB0YXNrcyBpbiB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZSBUYXNrIHF1ZXVlXHJcbiAqIEByZXR1cm5zIFByb21pc2U8Sm9iUmVzdWx0W10+IFJldHVybnMgYW4gYXJyYXkgb2YgSm9iUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0pvYnMocXVldWUpIHtcclxuICAgIGNvbnN0IGpvYnMgPSBxdWV1ZS50b0FycmF5KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFsbCBqb2JzXCIsIGpvYnMpO1xyXG4gICAgLy8gQ3JlYXRlIGFuIGludmlzaWJsZSBpZnJhbWUgdG8gYWN0IGFzIGEgXCJ3b3JrZXJcIiB3aGljaFxyXG4gICAgLy8gd2lsbCBkbyB0aGUgdGFzayBvZiBkZWNvZGluZyBhbmQgc2VuZCB1cyBhIG1lc3NhZ2VcclxuICAgIC8vIHdoZW4gaXQncyBkb25lLlxyXG4gICAgZmlnbWEuc2hvd1VJKHdvcmtlclRlbXBsYXRlLCB7IHZpc2libGU6IHRydWUsIHdpZHRoOiAyMDAsIGhlaWdodDogMTI1IH0pO1xyXG4gICAgLy8gU2VuZCB0aGUgcmF3IGJ5dGVzIG9mIHRoZSBmaWxlIHRvIHRoZSB3b3JrZXIuXHJcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShqb2JzKTtcclxuICAgIC8vIFdhaXQgZm9yIHRoZSB3b3JrZXIncyByZXNwb25zZS5cclxuICAgIGNvbnN0IGpvYnNSZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZmlnbWEudWkub25tZXNzYWdlID0gdmFsdWUgPT4gcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBqb2JzUmVzdWx0O1xyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBJbWFnZUJ5dGVzIHRvIEltYWdlSGFzaCBhbmQgYWRkcyB0byBJbWFnZVBhaW50XHJcbiAqIEBwYXJhbSAge1VpbnQ4QXJyYXl9IGJ5dGVzICBJbWFnZWJ5dGVzIHRvIGNvbnZlcnRcclxuICogQHBhcmFtICB7SW1hZ2VQYWludH0gcGFpbnQgSW1hZ2VQYWludCB0byBhZGQgdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2hcclxuICogQHJldHVybnMgSW1hZ2VQYWludCBSZXR1cm5zIGEgbmV3IEltYWdlUGFpbnQgd2l0aCB0aGUgY29udmVydGVkIEltYWdlSGFzaCBhZGRlZCB0byBpdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKGJ5dGVzLCBwYWludCkge1xyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHBhaW50IGZvciB0aGUgbmV3IGltYWdlLlxyXG4gICAgY29uc3QgbmV3UGFpbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhaW50KSk7XHJcbiAgICBuZXdQYWludC5pbWFnZUhhc2ggPSBmaWdtYS5jcmVhdGVJbWFnZShieXRlcykuaGFzaDtcclxuICAgIHJldHVybiBuZXdQYWludDtcclxufVxyXG4vKipcclxuICogQ2Fycnkgb3V0IHRoZSBpbWFnZSBkaXRoZXJpbmcgcHJvY2Nlc3Nlcy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxsc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIERvSW1hZ2VEaXRoZXIoY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgVEFTS1MgPSBuZXcgUXVldWUoKTtcclxuICAgICAgICBsZXQgbm9kZUZpbGxzID0gW107XHJcbiAgICAgICAgY3VycmVudFNlbGVjdGlvbnNXaXRoSW1hZ2VGaWxscy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoSW1hZ2VGaWxscyA9IGdldEltYWdlRmlsbHNGcm9tTm9kZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGVzV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAoZmlsbERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXJyeSBvdXQgZGl0aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlQnl0ZXMgPSB5aWVsZCBnZXRJbWFnZUJ5dGVzKGZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVGaWxscy5wdXNoKGZpbGxEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkVGFza1RvUG9vbCh7IGltYWdlQnl0ZXM6IGltYWdlQnl0ZXMsIGZpbGxEYXRhOiBmaWxsRGF0YSB9LCBUQVNLUyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHdhaXQgdGlsbCBhbGwgam9icyBhcmUgYWRkZWQuLlxyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHByb2Nlc3Npbmcgam9icy4uXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlQcm9jZXNzUmVzdWx0cyh5aWVsZCBwcm9jZXNzSm9icyhUQVNLUyksIG5vZGVGaWxscywgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoqXHJcbiAqIEFwcGxpZXMgdGhlIHByb2Nlc3NlZCBkaXRoZXIgZWZmZWN0IHRvIGFwcHJvcHJpYXRlIG5vZGVzXHJcbiAqIEBwYXJhbSAge0pvYlJlc3VsdFtdfSByZXN1bHRzXHJcbiAqIEBwYXJhbSAge0ltYWdlRmlsbERhdGFbXX0gbm9kZUZpbGxzXHJcbiAqIEBwYXJhbSAge2FueX0gcmVzb2x2ZVxyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlQcm9jZXNzUmVzdWx0cyhyZXN1bHRzLCBub2RlRmlsbHMsIHJlc29sdmUpIHtcclxuICAgIGNvbnNvbGUubG9nKG5vZGVGaWxscyk7XHJcbiAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHtcclxuICAgICAgICBsZXQgcHJvY2Vzc0RpdGhlckVmZmVjdCA9IEJ5dGVzVG9JbWFnZVBhaW50SGFzaEltYWdlKHJlc3VsdC5pbWFnZUJ5dGVzLCByZXN1bHQuZmlsbERhdGEuaW1hZ2VGaWxsKTtcclxuICAgICAgICAvLyBjbG9uZSB0aGUgbm9kZSBmaWxsc1xyXG4gICAgICAgIGNvbnN0IGNvcHlOb2RlRmlsbHMgPSBbLi4ubm9kZUZpbGxzW2luZGV4XS5ub2RlLmZpbGxzXTtcclxuICAgICAgICAvLyByZXBsYWNlIHRoZSBpbWFnZSBmaWx0ZXJcclxuICAgICAgICBjb3B5Tm9kZUZpbGxzLnNwbGljZShyZXN1bHQuZmlsbERhdGEuaW5kZXgsIDEsIHByb2Nlc3NEaXRoZXJFZmZlY3QpO1xyXG4gICAgICAgIG5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxscyA9IGNvcHlOb2RlRmlsbHM7XHJcbiAgICB9KTtcclxuICAgIC8vIHJlc29sdmUgdGhyZSBwcm9taXNlIGFmdGVyIGFwcGx5aW5nIGRpdGhlcmluZyBlZmZlY3QuXHJcbiAgICByZXNvbHZlKCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgXCI8c3R5bGU+XFxyXFxuXFxyXFxuICBib2R5LCBodG1sIHtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgfVxcclxcblxcclxcbiAgYm9keSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubG9hZGVyQ29udGFpbmVyXFxyXFxuICB7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBoZWlnaHQ6IDU1cHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxuICAubGRzLXJpbmcge1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgd2lkdGg6IDY0cHg7XFxyXFxuICAgIGhlaWdodDogNjRweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSguNSk7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxvYWRpbmctdGV4dCB7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcXHJcXG4gICAgZm9udC1zaXplOiAxMHB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubGRzLXJpbmcgZGl2IHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgd2lkdGg6IDUxcHg7XFxyXFxuICAgIGhlaWdodDogNTFweDtcXHJcXG4gICAgYm9yZGVyOiA2cHggc29saWQgIzAwYWNlZDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBhbmltYXRpb246IGxkcy1yaW5nIDEuMnMgY3ViaWMtYmV6aWVyKDAuNSwgMCwgMC41LCAxKSBpbmZpbml0ZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjMDBhY2VkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgLmxkcy1yaW5nIGRpdjpudGgtY2hpbGQoMSkge1xcclxcbiAgICBhbmltYXRpb24tZGVsYXk6IC0wLjQ1cztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDIpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5sZHMtcmluZyBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNXM7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGxkcy1yaW5nIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG48L3N0eWxlPlxcclxcblxcclxcblxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcImxvYWRlckNvbnRhaW5lclxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImxkcy1yaW5nXFxcIj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkaW5nLXRleHRcXFwiPlxcclxcbiAgICAgICAgRGl0aGVyaW5nXFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblxcclxcblxcclxcbjxzY3JpcHQ+XFxyXFxuICAvLyBFbmNvZGluZyBhbiBpbWFnZSBpcyBhbHNvIGRvbmUgYnkgc3RpY2tpbmcgcGl4ZWxzIGluIGFuXFxyXFxuICAvLyBIVE1MIGNhbnZhcyBhbmQgYnkgYXNraW5nIHRoZSBjYW52YXMgdG8gc2VyaWFsaXplIGl0IGludG9cXHJcXG4gIC8vIGFuIGFjdHVhbCBQTkcgZmlsZSB2aWEgY2FudmFzLnRvQmxvYigpLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZW5jb2RlKGNhbnZhcywgY3R4LCBpbWFnZURhdGEpIHtcXHJcXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXFxyXFxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XFxyXFxuICAgICAgY2FudmFzLnRvQmxvYihibG9iID0+IHtcXHJcXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcXHJcXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpKVxcclxcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKCdDb3VsZCBub3QgcmVhZCBmcm9tIGJsb2InKSlcXHJcXG4gICAgICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxcclxcbiAgICAgIH0pXFxyXFxuICAgIH0pXFxyXFxuICB9XFxyXFxuXFxyXFxuICAvLyBEZWNvZGluZyBhbiBpbWFnZSBjYW4gYmUgZG9uZSBieSBzdGlja2luZyBpdCBpbiBhbiBIVE1MXFxyXFxuICAvLyBjYW52YXMsIGFzIHdlIGNhbiByZWFkIGluZGl2aWR1YWwgcGl4ZWxzIG9mZiB0aGUgY2FudmFzLlxcclxcbiAgYXN5bmMgZnVuY3Rpb24gZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcykge1xcclxcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtieXRlc10pKVxcclxcbiAgICBjb25zdCBpbWFnZSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcXHJcXG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxcclxcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltZylcXHJcXG4gICAgICBpbWcub25lcnJvciA9ICgpID0+IHJlamVjdCgpXFxyXFxuICAgICAgaW1nLnNyYyA9IHVybFxcclxcbiAgICB9KVxcclxcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aFxcclxcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0XFxyXFxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXFxyXFxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodClcXHJcXG4gICAgcmV0dXJuIGltYWdlRGF0YVxcclxcbiAgfVxcclxcblxcclxcbiAgLy8gQ3JlYXRlIGFuIGV2ZW50IGhhbmRsZXIgdG8gcmVjZWl2ZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluXFxyXFxuICAvLyB0aHJlYWQuXFxyXFxuICB3aW5kb3cub25tZXNzYWdlID0gYXN5bmMgZXZlbnQgPT4ge1xcclxcbiAgICAvLyBKdXN0IGdldCB0aGUgYnl0ZXMgZGlyZWN0bHkgZnJvbSB0aGUgcGx1Z2luTWVzc2FnZSBzaW5jZVxcclxcbiAgICAvLyB0aGF0J3MgdGhlIG9ubHkgdHlwZSBvZiBtZXNzYWdlIHdlJ2xsIHJlY2VpdmUgaW4gdGhpc1xcclxcbiAgICAvLyBwbHVnaW4uIEluIG1vcmUgY29tcGxleCBwbHVnaW5zLCB5b3UnbGwgd2FudCB0byBjaGVjayB0aGVcXHJcXG4gICAgLy8gdHlwZSBvZiB0aGUgbWVzc2FnZS5cXHJcXG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xcclxcbiAgICBjb25zdCBqb2JzID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xcclxcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSB7XFxyXFxuICAgICAgcmVzdWx0cy5wdXNoKHtcXHJcXG4gICAgICAgIGltYWdlQnl0ZXM6IGF3YWl0IHByb2Nlc3NEaXRoZXIoam9iKSxcXHJcXG4gICAgICAgIGZpbGxEYXRhOiBqb2IuZmlsbERhdGFcXHJcXG4gICAgICB9KTtcXHJcXG4gICAgfVxcclxcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcXHJcXG4gICAgICBwbHVnaW5NZXNzYWdlOiByZXN1bHRzXFxyXFxuICAgIH0sIFxcXCIqXFxcIik7XFxyXFxuICB9O1xcclxcblxcclxcbiAgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0RpdGhlcihqb2IpIHtcXHJcXG4gICAgY29uc3QgYnl0ZXMgPSBqb2IuaW1hZ2VCeXRlcztcXHJcXG5cXHJcXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcXFwiY2FudmFzXFxcIik7XFxyXFxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFxcXCIyZFxcXCIpO1xcclxcblxcclxcbiAgICBjb25zdCBpbWFnZURhdGEgPSBhd2FpdCBkZWNvZGUoY2FudmFzLCBjdHgsIGJ5dGVzKTtcXHJcXG4gICAgY29uc3QgcGl4ZWxzID0gaW1hZ2VEYXRhLmRhdGE7XFxyXFxuXFxyXFxuICAgIC8vIERvIHRoZSBhY3R1YWwgd29yayBvZiBpbnZlcnRpbmcgdGhlIGNvbG9ycy5cXHJcXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaXhlbHMubGVuZ3RoOyBpICs9IDQpIHtcXHJcXG4gICAgICBwaXhlbHNbaSArIDBdID0gMjU1IC0gcGl4ZWxzW2kgKyAwXTtcXHJcXG4gICAgICBwaXhlbHNbaSArIDFdID0gMjU1IC0gcGl4ZWxzW2kgKyAxXTtcXHJcXG4gICAgICBwaXhlbHNbaSArIDJdID0gMjU1IC0gcGl4ZWxzW2kgKyAyXTtcXHJcXG4gICAgICAvLyBEb24ndCBpbnZlcnQgdGhlIGFscGhhIGNoYW5uZWwuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgY29uc3QgbmV3Qnl0ZXMgPSBhd2FpdCBlbmNvZGUoY2FudmFzLCBjdHgsIGltYWdlRGF0YSk7XFxyXFxuICAgIHJldHVybiBuZXdCeXRlcztcXHJcXG4gIH1cXHJcXG48L3NjcmlwdD5cIiJdLCJzb3VyY2VSb290IjoiIn0=