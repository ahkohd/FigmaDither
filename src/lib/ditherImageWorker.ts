export const WorkerScript = `
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