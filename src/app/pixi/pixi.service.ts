/* tslint:disable:no-console */
import { Injectable } from '@angular/core';

@Injectable()
export class PixiService {
	private assets: string[] = [];
	private loadPromise = null;

	constructor() {
		console.debug('PixiService:new');
	}

	addAsset(src) {
		if (this.assets.indexOf(src) === -1) {
			console.debug('PixiService:addAsset');
			this.assets.push(src);
			PIXI.loader.add(src);
		}

		return this;
	}

	load() {
		if (this.loadPromise === null) {
			console.debug('PixiService:load');
			this.loadPromise = new Promise(resolve => PIXI.loader.load(resolve));
		}

		return this.loadPromise;
	}

	destroy() {
		console.debug('PixiService:destroy');
	}
}
