const puppeteer = require('puppeteer');
const path = require('path');
const { readdir, mkdir } = require('fs').promises;

async function getHtmlFiles(dir) {
  const files = await readdir(dir, { recursive: true });

  return files.filter((file) => {
    return path.extname(file).toLowerCase() === '.html';
  });
}

async function screenshotWebpage(browser, filePath, screenshotPath) {
  let page = await browser.newPage();

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  await page.goto(`file://${filePath}`, {waitUntil: 'load'});
  await page.screenshot({path: screenshotPath, fullPage: true, captureBeyondViewport: false});

  await page.close();
}

function getScreenshotFileName(htmlFilePath) {
  return htmlFilePath.replaceAll(path.sep, '-').replace(/\.html$/, '.png');
}
async function main() {
  const screenshotDirectory = path.join(__dirname, 'screenshots');
  const htmlDirectory = path.join(__dirname, '..', 'html');

  // Create screenshot directory
  await mkdir(screenshotDirectory, { recursive: true })

  // Get all html files
  const htmlFiles = await getHtmlFiles(htmlDirectory);

  // Launch browser
  const browser = await puppeteer.launch({headless: true});

  // Loop through html files and capture screenshot
  for (const htmlFile of htmlFiles) {
    const filePath = path.join(htmlDirectory, htmlFile);
    const screenshotPath = path.join(screenshotDirectory, getScreenshotFileName(htmlFile));

    // Capture screenshot
    await screenshotWebpage(browser, filePath, screenshotPath);
  }

  // Close browser
  await browser.close();
}

const nodeJsVersion = process.version.match(/(\d+)\.(\d+)\.(\d+)/);
const [majorVersion, minorVersion, patchVersion] = nodeJsVersion.slice(1).map(_ => parseInt(_));

if (majorVersion < 20 || (majorVersion === 20 && minorVersion < 1)) {
  throw new Error("NodeJS v20.1.0 is required at minimum. To use the fs.readdir recursive function!");
}

main();
