import 'pixi.js';
import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { BulgePinchFilter } from '@pixi/filter-bulge-pinch';
import { AnimationFrameScheduler } from 'rxjs/scheduler/AnimationFrameScheduler';
import { IScheduler } from 'rxjs/Scheduler';
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

	private tween = null;

	private easing = (delta: number) => Math.sin(delta * Math.PI);

	@HostListener('document:mousemove', ['$event'])
	onMouseMove(event: MouseEvent) {
		this.light.position.x = event.x;
		this.light.position.y = event.y;
		this.bulgeFilter.center.x = event.x / window.innerWidth;
		this.bulgeFilter.center.y = event.y / window.innerHeight;
	}

	@HostListener('document:mousedown', ['$event'])
	onMouseDown(event: MouseEvent) {
		const duration = 500;
		const startTime = (new Date()).getTime();

		const tween = (observer) => {
			const delta = Math.min((new Date()).getTime() - startTime, duration);

			observer.next(delta / duration);
			this.onAnimationFrame();

			if (delta < duration) {
				requestAnimationFrame(() => tween(observer));
			} else {

				observer.finish();
			}
		};

		if (this.tween !== null) {
			this.tween.unsubscribe();
		}
		this.tween = Observable.create(tween).subscribe((v) => {
			const d = this.easing(v);
			this.bulgeFilter.strength = 0.5 + 0.5 * d;
			this.bulgeFilter.radius = 128 - 64 * d;
			this.light.scale.set(1 - 0.5 * d);
		}, () => {

		}, () => {

		});
	}

	constructor(private host: ElementRef) {
		Observable.fromEvent(document, 'mousemove').throttleTime(50).subscribe(() => {
			// TODO: use AnimationFrameScheduler - cant setup AnimationFrameScheduler for some reason
			requestAnimationFrame(this.onAnimationFrame);
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

		PIXI.utils.sayHello('canvas');
		console.log('initPixi', this.renderer, this.stage);
	}

	initScene() {
		const bg = PIXI.extras.TilingSprite.fromImage('assets/bg-00.png');
		bg.width = window.innerWidth + 20;
		bg.height = window.innerHeight + 20;
		bg.x = -10;
		this.stage.addChild(bg);

		this.light = PIXI.Sprite.fromImage('assets/light-00.png');
		this.light.blendMode = PIXI.BLEND_MODES.LIGHTEN;
		this.light.alpha = 0.2;
		this.light.anchor.set(0.5);

		this.stage.addChild(this.light);

		// const displacmentFilter = new PIXI.filters.DisplacementFilter(this.light);
		this.bulgeFilter = new BulgePinchFilter();
		this.bulgeFilter.radius = 128;
		this.bulgeFilter.strength = 1;

		this.stage.filters = [this.bulgeFilter];

		requestAnimationFrame(this.onAnimationFrame);
	}

	onAnimationFrame = () => {
		this.renderer.render(this.stage);
	}
}
