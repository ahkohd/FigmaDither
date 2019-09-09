import './figma-plugin-ds.min.js';
import './figma-plugin-ds.min.css';
import './ui.css';

document.getElementById('dither').onclick = () => {
  const options = {
    greyscale_method: getValue('greyscale_method'),
    dither_method: getValue('dither_method'),
    threshold: parseInt(getValue('threshold')),
    chk_replace_colours: (document.getElementById('chk_replace_colours') as HTMLInputElement).checked,
    rep_black: [parseInt(getValue('rep_black_r')), parseInt(getValue('rep_black_b')), parseInt(getValue('rep_black_g')), parseInt(getValue('rep_black_a'))],
    rep_white: [parseInt(getValue('rep_white_r')), parseInt(getValue('rep_white_b')), parseInt(getValue('rep_white_g')), parseInt(getValue('rep_white_a'))],
    keep_image: (document.getElementById('keep_image') as HTMLInputElement).checked
  }
  parent.postMessage({ pluginMessage: { type: 'dither-image', options: options } }, '*');
}

function getValue(selector) {
  return (document.getElementById(selector) as HTMLInputElement).value;
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}

//initialize javascript
(window as any).selectMenu.init();

//settings
(window as any).selectMenu.init({
  position: 'positionToSelection' //other options: 'under', 'overlap'
});



// When user change dithering method to Treshold, then enable the treshhold input box ...
document.getElementById('dither_method').onchange = function () {
  const treshInputElem = document.getElementById('threshold');
  // seems like a glitch with figma component library used slow  down value update. 
  // lets append to task queue. This hack fix the bug.
  setTimeout(() => {
    const value = (document.getElementById('dither_method') as HTMLInputElement).value;

    if (value == "Threshold") {
      treshInputElem.removeAttribute('disabled');
    } else {
      treshInputElem.setAttribute('disabled', (true as any));
    }
  }, 0);
};


// Activate color input boxes when user enables replace with color..
document.getElementById('chk_replace_colours').onchange = function (e) {
  const value = (document.getElementById('chk_replace_colours') as HTMLInputElement).checked;
  const colorInputs = document.getElementsByClassName('ci');
  for (let i = 0; i < colorInputs.length; i++) {
    if (value) {
      (colorInputs[i] as HTMLInputElement).removeAttribute('disabled');
    } else {
      (colorInputs[i] as HTMLInputElement).setAttribute('disabled', (true as any));
    }
  }
}
