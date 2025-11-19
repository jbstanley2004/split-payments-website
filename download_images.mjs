


import fs from 'fs/promises';
import path from 'path';

async function getHardwareData() {
  const jsonPath = path.join(process.cwd(), 'hardwaree_image_urls.json');
  const fileContent = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(fileContent);
}

function sanitizeFilename(model) {
    // Keep it simple: replace slashes and spaces with hyphens, remove special chars.
    return model.replace(/[\s/()]/g, '-').replace(/[^a-zA-Z0-9-]/g, '').replace(/--+/g, '-');
}

async function downloadImages() {
  console.log('Starting image download process...');
  const hardwareData = await getHardwareData();
  const outputDir = path.join(process.cwd(), 'public', 'hardware_images');

  console.log(`Creating output directory at: ${outputDir}`);
  await fs.mkdir(outputDir, { recursive: true });

  const downloadPromises = hardwareData.map(async (item) => {
    const url = item.image || item.image_url;
    if (!url) {
      console.warn(`No image URL found for model: ${item.model}`);
      return;
    }
    
    const model = item.model;
    const extension = path.extname(new URL(url).pathname);
    const filename = `${sanitizeFilename(model)}${extension}`;
    const outputPath = path.join(outputDir, filename);

    try {
      console.log(`Downloading: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      await fs.writeFile(outputPath, Buffer.from(buffer));
      console.log(`Successfully saved: ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${url}: ${error.message}`);
    }
  });

  await Promise.all(downloadPromises);
  console.log('Image download process complete.');
}

downloadImages();
