#!/usr/bin/env node
const args = require('args');
const color = require('colors');
import angularCli from '@angular/cli';

args.option('app', 'Application for which build process should run.', 'app');
args.option('langs', 'Languages for which application will be build.', 'en', val => val.split(' '));
args.option('progress', "Don't display standard output.", 'true');

const { app, langs, progress } = args.parse(process.argv);

console.log(`Start building project`);

Promise.all(
	langs.map(locale => {
		console.log(color.grey(`Build ${color.yellow(app)} for locale: ${color.yellow(locale)}`));
		return angularCli({
			cliArgs: [
				'build',
				'--aot',
				`--app=${app}`,
				`--i18n-file=src/${app}/locale/messages.${locale}.xlf`,
				`--locale=${locale}`,
				'--no-sourcemap',
				`--output-path=dist/${app}/${locale}`,
				'--prod',
				`--progress=${progress}`,
				'--show-circular-dependencies',
				'--subresource-integrity',
				'--stats-json',
				'--target=production',
			],
			inputStream: process.stdin,
			outputStream: process.stdout,
		}).then(
			() => console.log(color.grey(`Finished building ${color.yellow(app)} for locale: ${color.yellow(locale)}`)),
			() => console.log(color.red(`Failed building '${color.yellow(app)}' for locale: ${color.yellow(locale)}`))
		);
	})
).then(() => console.log(color.green(`Successfully finished building project`)), () => console.log(color.red(`Failed building project`)));
