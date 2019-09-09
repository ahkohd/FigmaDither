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
    rep_white: [parseInt(getValue('rep_white_r')), parseInt(getValue('rep_white_b')), parseInt(getValue('rep_white_g')), parseInt(getValue('rep_white_a'))]
  }
  parent.postMessage({ pluginMessage: { type: 'dither-image', options: options } }, '*');
}

function getValue(selector)
{
  return (document.getElementById(selector) as HTMLInputElement).value;
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}

 //initialize javascript
 (window as any).selectMenu.init();
 console.log((window as any).selectMenu);

 //settings
 (window as any).selectMenu.init({
   position: 'positionToSelection' //other options: 'under', 'overlap'
 });