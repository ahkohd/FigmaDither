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

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

if (filterNodesWithFills(figma.currentPage.selection).length == 0) {
  figma.notify('Figma Dither: Please select at lease one item with image fill.');
  figma.closePlugin();
} else {
  let previewNode: SceneNode;

  if (multipleSelections()) {
    figma.notify('Figma Dither: More than one selection disables live preview.');
  } else {
    previewNode = figma.currentPage.selection[0].clone();
  }

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__, { height: 500, width: 270 });



  // send preview image bytes to the ui
  let firstImagefillsDataOnPreview = getImageFillsFromNode(previewNode)[0];
  getImageBytes(firstImagefillsDataOnPreview.imageFill).then(bytes => {
    figma.ui.postMessage({imageBytes: bytes, type: 'preview-node-image-bytes'});
  });


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
            closePlugin(previewNode);
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
      closePlugin(previewNode);
    }

    if(msg.type == "processed-preview-imagebytes")
    {
      console.log('processed bytes', msg.imageBytes);
      // apply processed image to preview node..
      const result: JobResult = {
        fillData: firstImagefillsDataOnPreview,
        imageBytes: msg.imageBytes
      }
      applyProcessResults([result], [firstImagefillsDataOnPreview], false, () => {
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

