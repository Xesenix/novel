/* tslint:disable:no-console */
import { Injectable } from '@angular/core';

import { RendererService } from 'pixi/renderer.service';

@Injectable()
export class PixiService {
	private assets: string[] = [];
	private loadPromise = null;

	public ready$ = this.renderer.ready$;

	constructor(public renderer: RendererService) {
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
