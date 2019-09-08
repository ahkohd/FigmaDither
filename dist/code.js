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

/***/ "./src/lib/ditherImageWorker.ts":
/*!**************************************!*\
  !*** ./src/lib/ditherImageWorker.ts ***!
  \**************************************/
/*! exports provided: WorkerScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerScript", function() { return WorkerScript; });
const WorkerScript = `
Dithering...
<script>
// Encoding an image is also done by sticking pixels in an
// HTML canvas and by asking the canvas to serialize it into
// an actual PNG file via canvas.toBlob().
async function encode(canvas, ctx, imageData) {
    ctx.putImageData(imageData, 0, 0)
    return await new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        const reader = new FileReader()
        reader.onload = () => resolve(new Uint8Array(reader.result))
        reader.onerror = () => reject(new Error('Could not read from blob'))
        reader.readAsArrayBuffer(blob)
      })
    })
  }
  
  // Decoding an image can be done by sticking it in an HTML
  // canvas, as we can read individual pixels off the canvas.
  async function decode(canvas, ctx, bytes) {
    const url = URL.createObjectURL(new Blob([bytes]))
    const image = await new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject()
      img.src = url
    })
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0)
    const imageData = ctx.getImageData(0, 0, image.width, image.height)
    return imageData
  }
  
// Create an event handler to receive messages from the main
// thread.
window.onmessage = async event => {
  // Just get the bytes directly from the pluginMessage since
  // that's the only type of message we'll receive in this
  // plugin. In more complex plugins, you'll want to check the
  // type of the message.
  const results = [];
  const jobs = event.data.pluginMessage;
  for(const job of jobs)
  {
    results.push({imageBytes: await processDither(job), fillData: job.fillData});
  }
  window.parent.postMessage({ pluginMessage: results }, "*");
};

async function processDither(job)
{
  const bytes = job.imageBytes;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const imageData = await decode(canvas, ctx, bytes);
  const pixels = imageData.data;

  // Do the actual work of inverting the colors.
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 0] = 255 - pixels[i + 0];
    pixels[i + 1] = 255 - pixels[i + 1];
    pixels[i + 2] = 255 - pixels[i + 2];
    // Don't invert the alpha channel.
  }

  const newBytes = await encode(canvas, ctx, imageData);
  return newBytes;
}
</script>`;


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
/* harmony import */ var _ditherImageWorker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ditherImageWorker */ "./src/lib/ditherImageWorker.ts");
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
    console.log("All jobs", jobs);
    // Create an invisible iframe to act as a "worker" which
    // will do the task of decoding and send us a message
    // when it's done.
    figma.showUI(_ditherImageWorker__WEBPACK_IMPORTED_MODULE_1__["WorkerScript"], { visible: true, width: 200, height: 100 });
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9RdWV1ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL2RpdGhlckltYWdlV29ya2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1RUFBb0IsQ0FBQyx1RUFBb0I7QUFDM0UsUUFBUSxnRUFBYTtBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckJBO0FBQUE7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2REFBNkQ7QUFDL0U7QUFDQSw2QkFBNkIseUJBQXlCO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3QiwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ2dDO0FBQ21CO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw0Q0FBNEM7QUFDdEYsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsWUFBWSxJQUFJO0FBQ2hCLFlBQVksV0FBVztBQUN2QjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwrREFBWSxHQUFHLHlDQUF5QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ087QUFDUDtBQUNBLHdCQUF3Qiw0Q0FBSztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsNkNBQTZDO0FBQ3BGLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QixZQUFZLGdCQUFnQjtBQUM1QixZQUFZLElBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbnMsIGZpbHRlck5vZGVzV2l0aEZpbGxzLCBEb0ltYWdlRGl0aGVyIH0gZnJvbSBcIi4vbGliL3V0aWxzXCI7XHJcbi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXHJcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cclxuLy8gVGhpcyBmaWxlIGhvbGRzIHRoZSBtYWluIGNvZGUgZm9yIHRoZSBwbHVnaW5zLiBJdCBoYXMgYWNjZXNzIHRvIHRoZSAqZG9jdW1lbnQqLlxyXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcclxuLy8gZnVsbCBicm93c2VyIGVudmlyb21lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cclxuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiLlxyXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xyXG4vLyBDYWxscyB0byBcInBhcmVudC5wb3N0TWVzc2FnZVwiIGZyb20gd2l0aGluIHRoZSBIVE1MIHBhZ2Ugd2lsbCB0cmlnZ2VyIHRoaXNcclxuLy8gY2FsbGJhY2suIFRoZSBjYWxsYmFjayB3aWxsIGJlIHBhc3NlZCB0aGUgXCJwbHVnaW5NZXNzYWdlXCIgcHJvcGVydHkgb2YgdGhlXHJcbi8vIHBvc3RlZCBtZXNzYWdlLlxyXG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xyXG4gICAgaWYgKG1zZy50eXBlID09PSBcImRpdGhlci1pbWFnZVwiKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGlvbnMgPSBmaWx0ZXJOb2Rlc1dpdGhGaWxscyhnZXRDdXJyZW50U2VsZWN0aW9ucygpKTtcclxuICAgICAgICBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlIHN1cmUgdG8gY2xvc2UgdGhlIHBsdWdpbiB3aGVuIHlvdSdyZSBkb25lLiBPdGhlcndpc2UgdGhlIHBsdWdpbiB3aWxsXHJcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIFF1ZXVlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlID0gW107XHJcbiAgICB9XHJcbiAgICBlbnF1ZXVlKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3N0b3JlLnB1c2godmFsKTtcclxuICAgIH1cclxuICAgIGRlcXVldWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgV29ya2VyU2NyaXB0ID0gYFxyXG5EaXRoZXJpbmcuLi5cclxuPHNjcmlwdD5cclxuLy8gRW5jb2RpbmcgYW4gaW1hZ2UgaXMgYWxzbyBkb25lIGJ5IHN0aWNraW5nIHBpeGVscyBpbiBhblxyXG4vLyBIVE1MIGNhbnZhcyBhbmQgYnkgYXNraW5nIHRoZSBjYW52YXMgdG8gc2VyaWFsaXplIGl0IGludG9cclxuLy8gYW4gYWN0dWFsIFBORyBmaWxlIHZpYSBjYW52YXMudG9CbG9iKCkuXHJcbmFzeW5jIGZ1bmN0aW9uIGVuY29kZShjYW52YXMsIGN0eCwgaW1hZ2VEYXRhKSB7XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMClcclxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNhbnZhcy50b0Jsb2IoYmxvYiA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKG5ldyBVaW50OEFycmF5KHJlYWRlci5yZXN1bHQpKVxyXG4gICAgICAgIHJlYWRlci5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignQ291bGQgbm90IHJlYWQgZnJvbSBibG9iJykpXHJcbiAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuICBcclxuICAvLyBEZWNvZGluZyBhbiBpbWFnZSBjYW4gYmUgZG9uZSBieSBzdGlja2luZyBpdCBpbiBhbiBIVE1MXHJcbiAgLy8gY2FudmFzLCBhcyB3ZSBjYW4gcmVhZCBpbmRpdmlkdWFsIHBpeGVscyBvZmYgdGhlIGNhbnZhcy5cclxuICBhc3luYyBmdW5jdGlvbiBkZWNvZGUoY2FudmFzLCBjdHgsIGJ5dGVzKSB7XHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtieXRlc10pKVxyXG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXHJcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltZylcclxuICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoKVxyXG4gICAgICBpbWcuc3JjID0gdXJsXHJcbiAgICB9KVxyXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGhcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHRcclxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApXHJcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpXHJcbiAgICByZXR1cm4gaW1hZ2VEYXRhXHJcbiAgfVxyXG4gIFxyXG4vLyBDcmVhdGUgYW4gZXZlbnQgaGFuZGxlciB0byByZWNlaXZlIG1lc3NhZ2VzIGZyb20gdGhlIG1haW5cclxuLy8gdGhyZWFkLlxyXG53aW5kb3cub25tZXNzYWdlID0gYXN5bmMgZXZlbnQgPT4ge1xyXG4gIC8vIEp1c3QgZ2V0IHRoZSBieXRlcyBkaXJlY3RseSBmcm9tIHRoZSBwbHVnaW5NZXNzYWdlIHNpbmNlXHJcbiAgLy8gdGhhdCdzIHRoZSBvbmx5IHR5cGUgb2YgbWVzc2FnZSB3ZSdsbCByZWNlaXZlIGluIHRoaXNcclxuICAvLyBwbHVnaW4uIEluIG1vcmUgY29tcGxleCBwbHVnaW5zLCB5b3UnbGwgd2FudCB0byBjaGVjayB0aGVcclxuICAvLyB0eXBlIG9mIHRoZSBtZXNzYWdlLlxyXG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcclxuICBjb25zdCBqb2JzID0gZXZlbnQuZGF0YS5wbHVnaW5NZXNzYWdlO1xyXG4gIGZvcihjb25zdCBqb2Igb2Ygam9icylcclxuICB7XHJcbiAgICByZXN1bHRzLnB1c2goe2ltYWdlQnl0ZXM6IGF3YWl0IHByb2Nlc3NEaXRoZXIoam9iKSwgZmlsbERhdGE6IGpvYi5maWxsRGF0YX0pO1xyXG4gIH1cclxuICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsgcGx1Z2luTWVzc2FnZTogcmVzdWx0cyB9LCBcIipcIik7XHJcbn07XHJcblxyXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRGl0aGVyKGpvYilcclxue1xyXG4gIGNvbnN0IGJ5dGVzID0gam9iLmltYWdlQnl0ZXM7XHJcblxyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgY29uc3QgaW1hZ2VEYXRhID0gYXdhaXQgZGVjb2RlKGNhbnZhcywgY3R4LCBieXRlcyk7XHJcbiAgY29uc3QgcGl4ZWxzID0gaW1hZ2VEYXRhLmRhdGE7XHJcblxyXG4gIC8vIERvIHRoZSBhY3R1YWwgd29yayBvZiBpbnZlcnRpbmcgdGhlIGNvbG9ycy5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBpeGVscy5sZW5ndGg7IGkgKz0gNCkge1xyXG4gICAgcGl4ZWxzW2kgKyAwXSA9IDI1NSAtIHBpeGVsc1tpICsgMF07XHJcbiAgICBwaXhlbHNbaSArIDFdID0gMjU1IC0gcGl4ZWxzW2kgKyAxXTtcclxuICAgIHBpeGVsc1tpICsgMl0gPSAyNTUgLSBwaXhlbHNbaSArIDJdO1xyXG4gICAgLy8gRG9uJ3QgaW52ZXJ0IHRoZSBhbHBoYSBjaGFubmVsLlxyXG4gIH1cclxuXHJcbiAgY29uc3QgbmV3Qnl0ZXMgPSBhd2FpdCBlbmNvZGUoY2FudmFzLCBjdHgsIGltYWdlRGF0YSk7XHJcbiAgcmV0dXJuIG5ld0J5dGVzO1xyXG59XHJcbjwvc2NyaXB0PmA7XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgUXVldWUgfSBmcm9tICcuL1F1ZXVlJztcclxuaW1wb3J0IHsgV29ya2VyU2NyaXB0IH0gZnJvbSAnLi9kaXRoZXJJbWFnZVdvcmtlcic7XHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBjdXJyZW50IFVzZXIgU2VsZWN0aW9uKHMpXHJcbiAqIEByZXR1cm5zIHJlYWRvbmx5IFNjZW5lTm9kZVtdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudFNlbGVjdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xyXG59XHJcbi8qKlxyXG4gKiBGaWx0ZXJzIG5uZGVzIHRoYXQgaGF2ZSBmaWxscy5cclxuICogQHBhcmFtICB7cmVhZG9ubHlTY2VuZU5vZGVbXX0gbm9kZXNcclxuICogQHJldHVybnMgU2NlbmVOb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyTm9kZXNXaXRoRmlsbHMobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGVXaXRoRmlsbHMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiBcImZpbGxzXCIgaW4gbm9kZSk7XHJcbiAgICByZXR1cm4gbm9kZVdpdGhGaWxscy5sZW5ndGggPT0gMCA/IFtdIDogbm9kZVdpdGhGaWxscztcclxufVxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgb2JqZWN0IGlzIGl0ZXJhdGFibGVcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuZnVuY3Rpb24gX2lzSXRlcmFibGUob2JqKSB7XHJcbiAgICAvLyBjaGVja3MgZm9yIG51bGwgYW5kIHVuZGVmaW5lZFxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmpbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xyXG59XHJcbi8qKlxyXG4gKiBHZXRzIGFsbCBJbWFnZSBmaWxscyBmcm9tIGEgbm9kZS5cclxuICogQHBhcmFtICB7U2NlbmVOb2RlfSBub2RlIE5vZGUgdG8gZXh0cmFjdCB0aGUgaW1hZ2UgZmlsbHNcclxuICogQHJldHVybnMgSW1hZ2VGaWxsRGF0YVtdIEFuIGFycmF5IG9mIGltYWdlIGZpbGxzIG9mIHRoZSBub2RlIGFzIEltYWdlRmlsbERhdGFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSkge1xyXG4gICAgY29uc3QgcmVzdWx0aW5nSW1hZ2VGaWxscyA9IFtdO1xyXG4gICAgbGV0IGZpbGxzID0gbm9kZS5maWxscztcclxuICAgIGlmIChfaXNJdGVyYWJsZShmaWxscykpIHtcclxuICAgICAgICBmaWxscyA9IGZpbGxzO1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goKGZpbGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxsLnR5cGUgPT0gXCJJTUFHRVwiKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0aW5nSW1hZ2VGaWxscy5wdXNoKHsgaW1hZ2VGaWxsOiBmaWxsLCBpbmRleDogaW5kZXgsIG5vZGU6IG5vZGUgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0aW5nSW1hZ2VGaWxscztcclxufVxyXG4vKipcclxuICogR2V0cyB0aGUgSW1hZ2VCeXRlcyBmcm9tIGEgSW1hZ2VQYWludCBmaWxsXHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IGZpbGxcclxuICogQHJldHVybnMgUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlQnl0ZXMoZmlsbCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IGZpZ21hLmdldEltYWdlQnlIYXNoKGZpbGwuaW1hZ2VIYXNoKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IHlpZWxkIGltYWdlLmdldEJ5dGVzQXN5bmMoKTtcclxuICAgICAgICByZXR1cm4gYnl0ZXM7XHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQWRkcyBhIGpvYiB0byB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHthbnl9IHRhc2tcclxuICogQHBhcmFtICB7UXVldWU8YW55Pn0gcXVldWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUYXNrVG9Qb29sKHRhc2ssIHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5lbnF1ZXVlKHRhc2spO1xyXG59XHJcbi8qKlxyXG4gKiBTcGF3biBhIHdvcmtlciB0byBwcm9jZXNzIHRoZSB0YXNrcyBpbiB0aGUgdGFzayBxdWV1ZVxyXG4gKiBAcGFyYW0gIHtRdWV1ZTxhbnk+fSBxdWV1ZSBUYXNrIHF1ZXVlXHJcbiAqIEByZXR1cm5zIFByb21pc2U8Sm9iUmVzdWx0W10+IFJldHVybnMgYW4gYXJyYXkgb2YgSm9iUmVzdWx0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0pvYnMocXVldWUpIHtcclxuICAgIGNvbnN0IGpvYnMgPSBxdWV1ZS50b0FycmF5KCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIkFsbCBqb2JzXCIsIGpvYnMpO1xyXG4gICAgLy8gQ3JlYXRlIGFuIGludmlzaWJsZSBpZnJhbWUgdG8gYWN0IGFzIGEgXCJ3b3JrZXJcIiB3aGljaFxyXG4gICAgLy8gd2lsbCBkbyB0aGUgdGFzayBvZiBkZWNvZGluZyBhbmQgc2VuZCB1cyBhIG1lc3NhZ2VcclxuICAgIC8vIHdoZW4gaXQncyBkb25lLlxyXG4gICAgZmlnbWEuc2hvd1VJKFdvcmtlclNjcmlwdCwgeyB2aXNpYmxlOiB0cnVlLCB3aWR0aDogMjAwLCBoZWlnaHQ6IDEwMCB9KTtcclxuICAgIC8vIFNlbmQgdGhlIHJhdyBieXRlcyBvZiB0aGUgZmlsZSB0byB0aGUgd29ya2VyLlxyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoam9icyk7XHJcbiAgICAvLyBXYWl0IGZvciB0aGUgd29ya2VyJ3MgcmVzcG9uc2UuXHJcbiAgICBjb25zdCBqb2JzUmVzdWx0ID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IHZhbHVlID0+IHJlc29sdmUodmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gam9ic1Jlc3VsdDtcclxufVxyXG4vKipcclxuICogQ29udmVydHMgSW1hZ2VCeXRlcyB0byBJbWFnZUhhc2ggYW5kIGFkZHMgdG8gSW1hZ2VQYWludFxyXG4gKiBAcGFyYW0gIHtVaW50OEFycmF5fSBieXRlcyAgSW1hZ2VieXRlcyB0byBjb252ZXJ0XHJcbiAqIEBwYXJhbSAge0ltYWdlUGFpbnR9IHBhaW50IEltYWdlUGFpbnQgdG8gYWRkIHRoZSBjb252ZXJ0ZWQgSW1hZ2VIYXNoXHJcbiAqIEByZXR1cm5zIEltYWdlUGFpbnQgUmV0dXJucyBhIG5ldyBJbWFnZVBhaW50IHdpdGggdGhlIGNvbnZlcnRlZCBJbWFnZUhhc2ggYWRkZWQgdG8gaXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShieXRlcywgcGFpbnQpIHtcclxuICAgIC8vIENyZWF0ZSBhIG5ldyBwYWludCBmb3IgdGhlIG5ldyBpbWFnZS5cclxuICAgIGNvbnN0IG5ld1BhaW50ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYWludCkpO1xyXG4gICAgbmV3UGFpbnQuaW1hZ2VIYXNoID0gZmlnbWEuY3JlYXRlSW1hZ2UoYnl0ZXMpLmhhc2g7XHJcbiAgICByZXR1cm4gbmV3UGFpbnQ7XHJcbn1cclxuLyoqXHJcbiAqIENhcnJ5IG91dCB0aGUgaW1hZ2UgZGl0aGVyaW5nIHByb2NjZXNzZXMuXHJcbiAqIEBwYXJhbSAge3JlYWRvbmx5U2NlbmVOb2RlW119IGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBEb0ltYWdlRGl0aGVyKGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IFRBU0tTID0gbmV3IFF1ZXVlKCk7XHJcbiAgICAgICAgbGV0IG5vZGVGaWxscyA9IFtdO1xyXG4gICAgICAgIGN1cnJlbnRTZWxlY3Rpb25zV2l0aEltYWdlRmlsbHMuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEltYWdlRmlsbHMgPSBnZXRJbWFnZUZpbGxzRnJvbU5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2Rlc1dpdGhJbWFnZUZpbGxzLmZvckVhY2goZnVuY3Rpb24gKGZpbGxEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2Fycnkgb3V0IGRpdGhlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWFnZUJ5dGVzID0geWllbGQgZ2V0SW1hZ2VCeXRlcyhmaWxsRGF0YS5pbWFnZUZpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlRmlsbHMucHVzaChmaWxsRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFRhc2tUb1Bvb2woeyBpbWFnZUJ5dGVzOiBpbWFnZUJ5dGVzLCBmaWxsRGF0YTogZmlsbERhdGEgfSwgVEFTS1MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyB3YWl0IHRpbGwgYWxsIGpvYnMgYXJlIGFkZGVkLi5cclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBjdXJyZW50U2VsZWN0aW9uc1dpdGhJbWFnZUZpbGxzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBwcm9jZXNzaW5nIGpvYnMuLlxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5UHJvY2Vzc1Jlc3VsdHMoeWllbGQgcHJvY2Vzc0pvYnMoVEFTS1MpLCBub2RlRmlsbHMsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBBcHBsaWVzIHRoZSBwcm9jZXNzZWQgZGl0aGVyIGVmZmVjdCB0byBhcHByb3ByaWF0ZSBub2Rlc1xyXG4gKiBAcGFyYW0gIHtKb2JSZXN1bHRbXX0gcmVzdWx0c1xyXG4gKiBAcGFyYW0gIHtJbWFnZUZpbGxEYXRhW119IG5vZGVGaWxsc1xyXG4gKiBAcGFyYW0gIHthbnl9IHJlc29sdmVcclxuICovXHJcbmZ1bmN0aW9uIGFwcGx5UHJvY2Vzc1Jlc3VsdHMocmVzdWx0cywgbm9kZUZpbGxzLCByZXNvbHZlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhub2RlRmlsbHMpO1xyXG4gICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2Nlc3NEaXRoZXJFZmZlY3QgPSBCeXRlc1RvSW1hZ2VQYWludEhhc2hJbWFnZShyZXN1bHQuaW1hZ2VCeXRlcywgcmVzdWx0LmZpbGxEYXRhLmltYWdlRmlsbCk7XHJcbiAgICAgICAgLy8gY2xvbmUgdGhlIG5vZGUgZmlsbHNcclxuICAgICAgICBjb25zdCBjb3B5Tm9kZUZpbGxzID0gWy4uLm5vZGVGaWxsc1tpbmRleF0ubm9kZS5maWxsc107XHJcbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgaW1hZ2UgZmlsdGVyXHJcbiAgICAgICAgY29weU5vZGVGaWxscy5zcGxpY2UocmVzdWx0LmZpbGxEYXRhLmluZGV4LCAxLCBwcm9jZXNzRGl0aGVyRWZmZWN0KTtcclxuICAgICAgICBub2RlRmlsbHNbaW5kZXhdLm5vZGUuZmlsbHMgPSBjb3B5Tm9kZUZpbGxzO1xyXG4gICAgfSk7XHJcbiAgICAvLyByZXNvbHZlIHRocmUgcHJvbWlzZSBhZnRlciBhcHBseWluZyBkaXRoZXJpbmcgZWZmZWN0LlxyXG4gICAgcmVzb2x2ZSgpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=