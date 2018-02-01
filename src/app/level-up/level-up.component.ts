import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { trigger, transition, group, query, style } from '@angular/animations';

@Component({
	selector: 'xes-level-up',
	templateUrl: './level-up.component.html',
	styleUrls: ['./level-up.component.scss'],
})
export class LevelUpComponent implements OnInit {
	@Input() level = 1;

	@HostBinding('class') classNames = '';

	timeout: any = null;

	ngOnInit() {
		this.timeout = setTimeout(() => (this.classNames = 'idle'), 5000);
	}

	@HostListener('click')
	onclick() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.classNames = 'close';
	}
}
