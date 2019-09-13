import {
  getCurrentSelections,
  filterNodesWithFills,
  DoImageDither,
  multipleSelections,
  closePlugin,
  getImageBytes,
  getImageFillsFromNode,
  applyProcessResults
} from "./lib/utils";
import JobResult from "./lib/IJobsResult";

let firstImagefillsDataOnPreview;
let previewNodes: SceneNode[] = [];


/**
 * Sets up the preview node and sends it image bytes to the ui
 * @param  {SceneNode} previewNode
 * @param  {ImageFillData} firstImagefillsDataOnPreview
 */

function setupPreview(previewNode: SceneNode)
{
   // send preview image bytes to the ui
   firstImagefillsDataOnPreview = getImageFillsFromNode(previewNode)[0];
   getImageBytes(firstImagefillsDataOnPreview.imageFill).then(bytes => {
     figma.ui.postMessage({imageBytes: bytes, type: 'preview-node-image-bytes'});
   });
}

/**
 * Gets the last created PreviewNode
 * @returns SceneNode
 */

function getPreview(): SceneNode {
  return previewNodes[previewNodes.length -1];
}

/**
 * Adds a new PreviewNode to the existing ones.
 * @param  {} callback? Called after a successsfull addition
 */

function addNewPreviewNode(callback?) {
  const result = filterNodesWithFills(figma.currentPage.selection);
  if( result.length == 0) {
    figma.notify('Figma Dither: Please select at lease one item with image fill.', {
      timeout: 1000
    });
    return;
  } else if(result.length > 1)
  {
    figma.notify('Figma Dither: More than one selection disables live preview.', {
      timeout: 1000
    });
    return;
  }
  previewNodes.push(figma.currentPage.selection[0].clone());
  if(callback) callback();
}

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

if (filterNodesWithFills(figma.currentPage.selection).length == 0) {
  figma.notify('Figma Dither: Please select at lease one item with image fill.');
  figma.closePlugin();
} else {


  const isMultiple = multipleSelections();
  if (isMultiple) {
    figma.notify('Figma Dither: More than one selection disables live preview.');
  } else {
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
      const currentSelections = filterNodesWithFills(getCurrentSelections());
      if (currentSelections.length == 0) {
        figma.notify('😅 Please select item(s) with image fill');
      } else {
        DoImageDither(currentSelections, msg.options)
          .then(function () {
            closePlugin(getPreview());
          });
      }
    }

  

    if (msg.type === "cancel") {
      closePlugin(getPreview());
    }

    if(msg.type == "processed-preview-imagebytes")
    {
      // console.log('processed bytes', msg.imageBytes);
      // apply processed image to preview node..
      const result: JobResult = {
        fillData: firstImagefillsDataOnPreview,
        imageBytes: msg.imageBytes
      }

      try {
        applyProcessResults([result], [firstImagefillsDataOnPreview], false, () => {
          // console.log('preview result applied!');
        });
      } catch (e) {}
    }


    // Destroys all existing PreviewNode..
    if(msg.type == 'destory-preview' || msg.type == 'disable-preview')
    {
      if(previewNodes.length!=0) {
        previewNodes.forEach(node => {
          if(!node.removed) node.remove();
        });
      }
      previewNodes = [];
    }

    // Trys to add a new PreviewNode...
    // if it fails - (1). because no GemetryMixin is selected
    // (2). More than one Nodes selected.
    if(msg.type == 'show-preview' || msg.type == 'enable-preview')
    {
      addNewPreviewNode(() => {
        figma.notify('Figma Dither: Re-rendering preview 🤳', {
          timeout: 1000
        });
        setupPreview(getPreview())
      });
    }
  };

}

