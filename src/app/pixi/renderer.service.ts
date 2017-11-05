import { Injectable } from '@angular/core';

@Injectable()
export class RendererService {
	renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

	constructor() {
		this.renderer = PIXI.autoDetectRenderer({
			transparent: true,
			autoResize: true,
		});
		this.renderer.view.style.width = '100%';
		this.renderer.view.style.height = '100%';
		this.renderer.resize(window.innerWidth, window.innerHeight);
	}
}
