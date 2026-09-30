import puppeteer from 'puppeteer';
import fs from 'fs';
import yaml from 'js-yaml';

const config = {
	delay: 15,
	width: 1280,
	height: 720,
	darkTheme: true
};

const websites = Object.values(yaml.load(fs.readFileSync('./sites.yml', 'utf8'))).map((website) => {
	if (typeof website === 'string') {
		return { site: website, screenshot_load_delay: 0, screenshot_keep_foreground: false };
	} else {
		return { screenshot_load_delay: 0, screenshot_keep_foreground: false, ...website };
	}
});
console.log(websites);

const outDir = './static/screenshots';
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const progressState = {
	total: websites.length,
	opened: 0,
	captured: 0
};
function incrementProgress(category) {
	progressState[category]++;
	process.stdout.write(
		`total: ${progressState.total}, opened: ${progressState.opened}, captured: ${progressState.captured}\r`
	);
}

let browser = null;
let pages = [];
async function openPage(url) {
	const page = await browser.newPage();
	page.setViewport({ width: config.width, height: config.height });
	page.emulateMediaFeatures([
		{
			name: 'prefers-color-scheme',
			value: config.darkTheme ? 'dark' : 'light'
		}
	]);
	await page.goto(url);
	incrementProgress('opened');
	return page;
}
async function capturePage(page, filename) {
	await page.screenshot({ path: filename });
	incrementProgress('captured');
}
async function captureScreenshot(url, filename) {
	// if (!browser) {
	// 	browser = await puppeteer.launch({
	// 		headless: false,
	// 		args: ["--force-dark-mode"],
	// 	});
	// }
	const page = await browser.newPage();
	page.setViewport({ width: config.width, height: config.height });
	page.emulateMediaFeatures([
		{
			name: 'prefers-color-scheme',
			value: config.darkTheme ? 'dark' : 'light'
		}
	]);
	await page.goto(url);
	incrementProgress('opened');
	await delay(config.delay);
	await page.screenshot({ path: filename });
	incrementProgress('captured');
	await page.close();
}

(async () => {
	browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox']
	});
	const foregroundWebsites = websites.filter((website) => website.screenshot_keep_foreground);
	const backgroundWebsites = websites.filter((website) => !website.screenshot_keep_foreground);
	async function openNonDelayed() {
		await Promise.all(
			backgroundWebsites
				.filter((website) => website.screenshot_load_delay == 0)
				.map(async ({ site, screenshot_url }) => {
					const page = await openPage(screenshot_url ?? 'https://' + site);
					pages.push({ page, site });
				})
		);
	}
	async function openDelayed() {
		await delay(2);
		for (let i = 0; i < backgroundWebsites.length; i++) {
			const { site, screenshot_url, screenshot_load_delay } = backgroundWebsites[i];
			if (screenshot_load_delay > 0) {
				const page = await openPage(screenshot_url ?? 'https://' + site);
				console.log(`waiting ${screenshot_load_delay} seconds for ${site}`);
				delay(screenshot_load_delay);
				pages.push({ page, site });
			}
		}
	}
	await Promise.all([openNonDelayed(), openDelayed()]);
	await delay(5);
	for (let i = 0; i < pages.length; i++) {
		const { page, site } = pages[i];
		await page.bringToFront();
		await delay(1);
		await capturePage(page, outDir + '/' + site + '.png');
		await page.close();
	}
	for (let i = 0; i < foregroundWebsites.length; i++) {
		const { site, screenshot_url, screenshot_load_delay } = foregroundWebsites[i];
		const page = await openPage(screenshot_url ?? 'https://' + site);
		await page.bringToFront();
		if (screenshot_load_delay > 0) await delay(screenshot_load_delay);
		await capturePage(page, outDir + '/' + site + '.png');
		await page.close();
	}
	console.log('\ndone');
	await browser.close();
})();
