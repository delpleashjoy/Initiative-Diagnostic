import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'fs/promises';
import { join } from 'path';
import { homedir } from 'os';

const screenshotsDir = 'temporary screenshots';

async function getNextScreenshotNumber() {
  try {
    await mkdir(screenshotsDir, { recursive: true });
    const files = await readdir(screenshotsDir);
    const screenshotFiles = files.filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
    if (screenshotFiles.length === 0) return 1;
    const numbers = screenshotFiles.map(f => {
      const match = f.match(/screenshot-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    return Math.max(...numbers) + 1;
  } catch (err) {
    console.error('Error reading screenshots dir:', err);
    return 1;
  }
}

async function takeScreenshot(url, label = '') {
  const browser = await puppeteer.launch({
    userDataDir: join(homedir(), '.cache/puppeteer')
  });
  const page = await browser.newPage();
  await page.goto(url);
  const num = await getNextScreenshotNumber();
  const filename = `screenshot-${num}${label ? '-' + label : ''}.png`;
  const path = join(screenshotsDir, filename);
  await page.screenshot({ path });
  console.log(`Screenshot saved to ${path}`);
  await browser.close();
}

const url = process.argv[2];
const label = process.argv[3] || '';

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

takeScreenshot(url, label);