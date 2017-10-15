import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import 'pixi.js';
import { Observable } from 'rxjs/Rx';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { BulgePinchFilter } from '@pixi/filter-bulge-pinch';
import { TweenObservable } from 'xes-rx-tween';

import { PixiService } from '../pixi.service';

@Component({
	selector: 'xes-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
	private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

	private stage: PIXI.Container;

	private light: PIXI.Sprite;

	private bulgeFilter: BulgePinchFilter;

	private bg: PIXI.Sprite;

	/**
	 * Something like:
	 *     _
	 *    / \
	 * \ /   \ /
	 *  v     v
	 * @private
	 * @memberof CanvasComponent
	 */
	private easing = (delta: number) => 0.5 * Math.sin(delta * Math.PI) * (1 - 1 * Math.pow(3 * (delta - 0.5), 4));

	constructor(private host: ElementRef, private pixi: PixiService) { }

	ngAfterViewInit() {
		this.initPixi();
	}

	/**
	 * Initialize PixiJs rendering engine.
	 *
	 * @memberof CanvasComponent
	 */
	initPixi() {
		// prepare renderer
		this.renderer = PIXI.autoDetectRenderer({
			transparent: true,
			autoResize: true,
		});
		this.renderer.view.style.width = '100%';
		this.renderer.view.style.height = '100%';
		this.renderer.resize(window.innerWidth, window.innerHeight);

		// attach canvas to dom
		this.host.nativeElement.appendChild(this.renderer.view);

		// preload assets
		this.pixi.addAsset('assets/ui.json').load().then(this.initScene.bind(this));
	}

	/**
	 * Initialize stage content and animations.
	 *
	 * @memberof CanvasComponent
	 */
	initScene() {
		// init stage
		this.stage = new PIXI.Container();

		// prepare background
		this.bg = PIXI.extras.TilingSprite.fromImage('bg-00');
		this.bg.x = -10;
		this.bg.y = -10;
		this.bg.width = window.innerWidth + 20;
		this.bg.height = window.innerHeight + 20;
		this.stage.addChild(this.bg);

		// prepare cursor light and shadow
		this.light = PIXI.Sprite.fromImage('light-00');
		this.light.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
		this.light.alpha = 0.125;
		this.light.anchor.set(0.5);
		this.stage.addChild(this.light);

		// prepare cursor distortion filter
		this.bulgeFilter = new BulgePinchFilter();
		this.bulgeFilter.radius = 128;
		this.bulgeFilter.strength = 1;
		this.stage.filters = [this.bulgeFilter];

		// initial draw
		this.renderer.render(this.stage);

		// event handlers
		Observable.fromEvent(window, 'mousedown')
			.switchMap(() => TweenObservable.create(1000))// schedule to requestAnimationFrame
			.map(this.easing)
			.subscribe((v) => {
				this.bulgeFilter.strength = 0.5 + 0.5 * v;
				this.bulgeFilter.radius = 128 + 128 * v;
				this.light.scale.set(1 + v);
				this.renderer.render(this.stage);
			});
		Observable.fromEvent(window, 'mousemove').throttleTime(16)
			.switchMap((ev) => Observable.of(ev, animationFrame))// schedule to requestAnimationFrame
			.subscribe((event: MouseEvent) => {
				this.light.position.x = event.x;
				this.light.position.y = event.y;
				this.bulgeFilter.center.x = event.x / window.innerWidth;
				this.bulgeFilter.center.y = event.y / window.innerHeight;
				this.renderer.render(this.stage);
			});
		Observable.fromEvent(window, 'resize').throttleTime(100)
			.subscribe((event: Event) => {
				this.bg.width = window.innerWidth + 20;
				this.bg.height = window.innerHeight + 20;
				this.renderer.resize(window.innerWidth, window.innerHeight);
				this.renderer.render(this.stage);
			});
	}
}
