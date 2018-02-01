#!/usr/bin/env node-ts
const throng = require('throng');
const path = require('path');
const fs = require('fs');
const express = require('express');
const locale = require('locale');
const chalk = require('chalk');
const skin = 'app';
const supportedLocales = ['en', 'pl'];
const port = process.env.PORT || 8080;
const workers = process.env.WEB_CONCURRENCY || 1;
const socketPath = process.env.SOCKET_PATH || null;
const socketPerms = process.env.SOCKET_PERMS || '0600';

const content = {};
function prepareContent(lang: string): Promise<void> {
	const templateFile = path.join(`${__dirname}/../dist/${skin}/${lang}/index.html`);

	console.log(`preload ${chalk.blue('For locale')}      : ${chalk.green(lang)}`);
	console.log(`preload ${chalk.blue('Loading template')}: ${chalk.green(templateFile)}`);
	if (!fs.existsSync(templateFile)) {
		// tslint:disable
		console.log(
			`preload ${chalk.red('Error')}           : ${chalk.red("templete file doesn't exist")}\n                         ${chalk.yellow(
				'you need to build project for locale'
			)}: ${chalk.green(lang)}`
		);
		return Promise.reject(null);
	}
	return new Promise((resolve, reject) =>
		fs.readFile(templateFile, 'utf8', function(error, data) {
			if (error) {
				console.log(`preload ${chalk.red('Error')}           : ${chalk.red(error)}`);
				return reject();
			}
			console.log(`preload ${chalk.blue('Storing template content')}`);
			content[lang] = data;
			resolve();
		})
	);
}

/**
 * for preloading languages into ram in sequence
 * @param {(string) => Promise} callback
 * @param {string[]} arr
 */
const serialPreload = (callback: (string) => Promise<void>, arr: string[]) =>
	arr.length > 0 ? callback(arr.shift()).then(() => serialPreload(callback, arr), () => serialPreload(callback, arr)) : Promise.resolve();

function start(workerId) {
	const app = express();

	app.use(locale(supportedLocales));
	app.use(express.static(`${__dirname}/../dist/app`));
	app.use(express.static(`${__dirname}/../dist/app/${supportedLocales[0]}`));

	app.get('/:lang/*', (req, res) => res.send(content[req.params.lang]));

	serialPreload(prepareContent, [...supportedLocales]).then(() => {
		// Start the app by listening on the default Heroku port
		app.listen(port, () => {
			console.log(`\nserver  ${chalk.blue(`Worker ${workerId} listening on`)}: ${chalk.green(`http://localhost:${port}`)}`);
		});
	});
}

// Concurrency
throng({ workers, lifetime: Infinity }, start);
