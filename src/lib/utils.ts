import { Queue } from './Queue';
import workerTemplate from '../worker/entry.html';
import ImageFillData from './IImageFillData';
import JobResult from './IJobsResult';
import DitherOptions from './IDitherOptions';

/**
 * Gets the current User Selection(s)
 * @returns readonly SceneNode[]
 */

export function getCurrentSelections(): readonly SceneNode[] {
  return figma.currentPage.selection;
}

/**
 * Filters nodes that have Image fills.
 * @param  {readonlySceneNode[]} nodes
 * @returns SceneNode
 */
export function filterNodesWithFills(nodes: readonly SceneNode[]): SceneNode[] {
  const nodeWithFills = nodes.filter(node => {
    if("fills" in node)
    {
      for(const fill of (node.fills as Array<any>))
      {
        if(fill.type == "IMAGE")  return true;
      }
      return false;
    } else {
      return false
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

export function getImageFillsFromNode(node: SceneNode): ImageFillData[] {
  const resultingImageFills = [];
  let fills = (node as GeometryMixin).fills;
  if (_isIterable(fills)) {
    fills = fills as Array<Paint>;
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

export async function getImageBytes(fill: ImagePaint): Promise<Uint8Array> {
  const image = figma.getImageByHash(fill.imageHash);
  const bytes = await image.getBytesAsync();
  return bytes;
}

/**
 * Adds a job to the task queue
 * @param  {any} task
 * @param  {Queue<any>} queue
 */

export function addTaskToPool(task: any, queue: Queue<any>) {
  queue.enqueue(task);
}

/**
 * Spawn a worker to process the tasks in the task queue
 * @param  {Queue<any>} queue Task queue
 * @returns Promise<JobResult[]> Returns an array of JobResult
 */

export function processJobs(queue: Queue<any>, options: DitherOptions): Promise<JobResult[]> {
  const jobs = queue.toArray();
  // console.log("All jobs", jobs);

  // Create an invisible iframe to act as a "worker" which
  // will do the task of decoding and send us a message
  // when it's done.
  figma.showUI(workerTemplate, { visible: true, width: 200, height: 125 });
  // Send the raw bytes of the file to the worker.
  // console.log('sent!', options);
  figma.ui.postMessage({ jobs: jobs, options: options });
  // Wait for the worker's response.
  const jobsResult = new Promise<JobResult[]>((resolve, reject) => {
    figma.ui.onmessage = value => resolve(value)
  });
  return jobsResult;

}


/**
 * Converts ImageBytes to ImageHash and adds to ImagePaint
 * @param  {Uint8Array} bytes  Imagebytes to convert
 * @param  {ImagePaint} paint ImagePaint to add the converted ImageHash
 * @returns ImagePaint Returns a new ImagePaint with the converted ImageHash added to it
 */
export function BytesToImagePaintHashImage(bytes: Uint8Array, paint: ImagePaint): ImagePaint {
  // Create a new paint for the new image.
  const newPaint = JSON.parse(JSON.stringify(paint));
  newPaint.imageHash = figma.createImage(bytes).hash;
  return newPaint;
}

/**
 * Carry out the image dithering proccesses.
 * @param  {readonlySceneNode[]} currentSelectionsWithImageFills
 */

export function DoImageDither(currentSelectionsWithImageFills: readonly SceneNode[], options: DitherOptions) {
  return new Promise((resolve, reject) => {
    let TASKS = new Queue();
    let nodeFills: ImageFillData[] = [];

    currentSelectionsWithImageFills.forEach(async function (node, index) {
      const nodesWithImageFills = getImageFillsFromNode(node);
      nodesWithImageFills.forEach(async function (fillData) {
        // carry out dither
        const imageBytes = await getImageBytes(fillData.imageFill);
        nodeFills.push(fillData);
        addTaskToPool({ imageBytes: imageBytes, fillData: fillData }, TASKS);
      });

      // wait till all jobs are added..
      if (index == currentSelectionsWithImageFills.length - 1) {
        // start processing jobs..
        applyProcessResults(await processJobs(TASKS, options), nodeFills, options.keep_image, resolve);
      }
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
export function applyProcessResults(results: JobResult[], nodeFills: ImageFillData[], keepImageFills: boolean = false, resolve: any) {
  // console.log(nodeFills);
  results.forEach((result, index) => {
    let processDitherEffect = BytesToImagePaintHashImage(result.imageBytes, result.fillData.imageFill);
    // clone the node fills
    const copyNodeFills = [...((nodeFills[index].node as GeometryMixin).fills as Array<ImagePaint>)];

    if (!keepImageFills) {
      // replace the image filter
      copyNodeFills.splice(result.fillData.index, 1, processDitherEffect);
    } else {
      // the new imag filter to the top..
      copyNodeFills.push(processDitherEffect);
    }

    (nodeFills[index].node as GeometryMixin).fills = copyNodeFills;
  });

  // resolve thre promise after applying dithering effect.
  resolve();
}


export function multipleSelections()
{
  const selection = figma.currentPage.selection;
  return (selection.length ==  1)  ? false : true;
}

export function closePlugin(previewNode?: SceneNode)
{
  if(previewNode) (previewNode as SceneNode).remove();
  figma.closePlugin();
}