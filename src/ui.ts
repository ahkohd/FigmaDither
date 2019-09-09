import './figma-plugin-ds.min.js';
import './figma-plugin-ds.min.css';
import './ui.css';

document.getElementById('dither').onclick = () => {
  const options = {
    greyscale_method: getValue('greyscale_method'),
    dither_method: getValue('dither_method'),
    threshold: getValue('threshold'),
    chk_replace_colours: getValue('chk_replace_colours'),
    rep_black: [getValue('rep_black_r'), getValue('rep_black_b'), getValue('rep_black_g'), getValue('rep_black_a')],
    rep_white: [getValue('rep_white_r'), getValue('rep_white_b'), getValue('rep_white_g'), getValue('rep_white_a')]
  }
  console.log(options);
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