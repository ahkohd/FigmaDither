import './figma-plugin-ds.min.js';
import './figma-plugin-ds.min.css';
import './ui.css';

document.getElementById('dither').onclick = () => {
  // const textbox = document.getElementById('resolution') as HTMLInputElement;
  // const count = parseInt(textbox.value, 10);
  parent.postMessage({ pluginMessage: { type: 'dither-image', count: 0 } }, '*');

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