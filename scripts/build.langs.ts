#!/usr/bin/env node
const args = require('args');
const color = require('colors');
import angularCli from '@angular/cli';

args.option('app', 'Application for which build process should run.', 'app');
args.option('langs', 'Languages for which application will be build.', 'en', (val) => val.split(' '));

const { app, langs } = args.parse(process.argv);

langs.forEach((locale) => {
	console.log(color.blue(`Build application: '${app}' for locale: '${locale}'`));
	angularCli({
		cliArgs: [
			'build',
			'--aot',
			`--app=${app}`,
			`--i18n-file=src/${app}/locale/messages.${locale}.xlf`,
			`--locale=${locale}`,
			'--no-sourcemap',
			`--output-path=dist/${app}/${locale}`,
			'--prod',
			'--progress',
			'--stats-json',
			'--target=production',
		],
		inputStream: process.stdin,
		outputStream: process.stdout
	});
});
