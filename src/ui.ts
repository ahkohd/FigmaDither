
document.getElementById('dither').onclick = () => {
  const textbox = document.getElementById('resolution') as HTMLInputElement;
  const count = parseInt(textbox.value, 10);
  parent.postMessage({ pluginMessage: { type: 'dither-image', count } }, '*');

}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
