import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import yaml from 'yaml';
import fs from 'fs';

console.log('Converting sites.yml to sites.json');
const sites = yaml.parse(fs.readFileSync('./sites.yml', 'utf8'));
// create temp directory if it does not exits
if (!fs.existsSync('./src/data')) fs.mkdirSync('./src/data');
fs.writeFileSync('./src/data/sites.json', JSON.stringify(sites));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		}
	},
	preprocess: preprocess({
		scss: {
			includePaths: ['src/styles']
		}
	})
};

export default config;
