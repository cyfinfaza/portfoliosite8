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
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		})
	},
	preprocess: preprocess({
		scss: {
			includePaths: ['src/styles']
		}
	})
};

export default config;
