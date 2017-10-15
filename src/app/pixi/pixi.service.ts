import { Injectable } from '@angular/core';

@Injectable()
export class PixiService {
	private assets: string[] = [];
	private loadPromise = null;

	addAsset(src) {
		if (this.assets.indexOf(src) === -1) {
			this.assets.push(src);
			PIXI.loader.add(src);
		}

		return this;
	}

	load() {
		if (this.loadPromise === null) {
			this.loadPromise = new Promise((resolve) => PIXI.loader.load(resolve));
		}

		return this.loadPromise;
	}
}
