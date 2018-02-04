import { Component, OnChanges, Input, HostBinding, HostListener, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, group, query, style } from '@angular/animations';
import { TweenObservable } from 'xes-rx-tween';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
	selector: 'xes-level-up',
	templateUrl: './level-up.component.html',
	styleUrls: ['./level-up.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelUpComponent {
	@Input() visible = false;

	public level = 0;

	@HostBinding('class') private classNames = '';

	private timeout: any = null;

	constructor(private changeDetector: ChangeDetectorRef) {}

	@HostListener('click')
	onclick() {
		this.close();
	}

	public open(level: number) {
		this.visible = true;
		this.classNames = '';
		this.timeout = setTimeout(() => {
			this.classNames = 'idle';
			this.changeDetector.markForCheck();
		}, 1500);

		combineLatest(
			TweenObservable.create(2000, 0, Math.floor(level / 100)),
			TweenObservable.create(2500, 0, 20 + Math.floor(level / 10) % 10),
			TweenObservable.create(3000, 0, 30 + level % 10),
		)
			.pipe(map((v: number[]) => v.map(Math.floor)), map(([v100, v10, v1]) => 100 * v100 + 10 * (v10 % 10) + v1 % 10), map(v => Math.floor(v)))
			.subscribe(v => {
				this.level = v;
				this.changeDetector.detectChanges();
			});
	}

	public close() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.classNames = 'close';

		setTimeout(() => {
			this.visible = false;
			this.classNames = '';
			this.changeDetector.detectChanges();
		}, 1200);
	}
}
