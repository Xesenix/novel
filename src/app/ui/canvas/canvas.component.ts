import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { TweenObservable } from '../../observable/tween';
import 'pixi.js';
import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { BulgePinchFilter } from '@pixi/filter-bulge-pinch';
import { Observable } from 'rxjs/Rx';

@Component({
	selector: 'xes-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {
	private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

	private stage: PIXI.Container;

	private light: PIXI.Sprite;

	private bulgeFilter: any;

	private tweenSubscription = null;

	private easing = (delta: number) => Math.sin(delta * Math.PI);

	constructor(private host: ElementRef) {
		Observable.fromEvent(document, 'mousedown')
		.switchMap(() => TweenObservable.create(1000))// schedule to requestAnimationFrame
		.map(this.easing)
		.subscribe((v) => {
			this.bulgeFilter.strength = 0.5 + 0.5 * v;
			this.bulgeFilter.radius = 128 + 128 * v;
			this.light.scale.set(1 + v);
			this.onAnimationFrame();
		});
		Observable.fromEvent(document, 'mousemove').throttleTime(16)
		.switchMap((ev) => Observable.of(ev, animationFrame))// schedule to requestAnimationFrame
		.subscribe((event: MouseEvent) => {
			this.light.position.x = event.x;
			this.light.position.y = event.y;
			this.bulgeFilter.center.x = event.x / window.innerWidth;
			this.bulgeFilter.center.y = event.y / window.innerHeight;
			this.onAnimationFrame();
		});
	}

	ngAfterViewInit() {
		this.initPixi();
		this.initScene();
	}

	initPixi() {
		this.renderer = PIXI.autoDetectRenderer({
			transparent: true,
			autoResize: true,
		});
		this.renderer.view.style.width = '100%';
		this.renderer.view.style.height = '100%';
		this.renderer.resize(window.innerWidth, window.innerHeight);

		this.host.nativeElement.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();
	}

	initScene() {
		const bg = PIXI.extras.TilingSprite.fromImage('assets/bg-00.png');
		bg.x = -10;
		bg.y = -10;
		bg.width = window.innerWidth + 20;
		bg.height = window.innerHeight + 20;
		this.stage.addChild(bg);

		this.light = PIXI.Sprite.fromImage('assets/light-00.png');
		this.light.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
		this.light.alpha = 0.125;
		this.light.anchor.set(0.5);
		this.stage.addChild(this.light);

		this.bulgeFilter = new BulgePinchFilter();
		this.bulgeFilter.radius = 128;
		this.bulgeFilter.strength = 1;

		this.stage.filters = [this.bulgeFilter];

		this.onAnimationFrame();
	}

	onAnimationFrame = () => {
		this.renderer.render(this.stage);
	}
}
