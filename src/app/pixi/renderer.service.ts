import { Injectable, ApplicationRef } from '@angular/core';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RendererService {
	renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

	public ready$ = new Subject();

	constructor(app: ApplicationRef) {
		app.isStable.pipe(filter(v => v), first()).subscribe(() => {
			console.log('RendererService:Init PIXI');
			this.renderer = PIXI.autoDetectRenderer({
				transparent: true,
				autoResize: true,
			});
			this.renderer.view.style.width = '100%';
			this.renderer.view.style.height = '100%';
			this.renderer.resize(window.innerWidth, window.innerHeight);
			this.ready$.next();
		});
	}
}
