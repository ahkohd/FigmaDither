import {
  getCurrentSelections,
  filterNodesWithFills,
  DoImageDither
} from "./lib/utils";

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {height: 500, width: 270});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  if (msg.type === "dither-image") {
    const currentSelections = filterNodesWithFills(getCurrentSelections());
    if(currentSelections.length == 0) {
      figma.notify('😅 Please select item(s) with image fill');
    } else {
      DoImageDither(currentSelections, msg.options)
      .then(function () {
        figma.closePlugin();
      });
    }
  }

  if(msg.type === "cancel")
  {
    figma.closePlugin();
  }
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
