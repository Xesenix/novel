import { animate, state, style, transition, trigger, query } from '@angular/animations';
import { Component, HostBinding, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs/observable/timer';

@Component({
	selector: 'xes-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss'],
	animations: [
		trigger('routerTransition', [
			transition(':enter', [
				query('.modal-dialog', [style({ transform: 'scale(2)', opacity: 0, filter: 'blur(20px)' })]),
				query('.backdrop-container', [style({ position: 'fixed', zIndex: 1040, opacity: 0 }), animate(300, style({ opacity: 1 }))]),
				query('.modal-dialog', [animate(500, style({ transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' }))]),
			]),
			transition('* => out', [
				query('.modal-dialog', [
					style({ transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' }),
					animate(300, style({ transform: 'scale(2)', opacity: 0, filter: 'blur(20px)' })),
				]),
				query('.backdrop-container', [style({ opacity: 1 }), animate(500, style({ opacity: 0 }))]),
			]),
		]),
	],
})
export class PopupComponent implements OnInit, OnDestroy {
	@Output() onBackdropClick: EventEmitter<any> = new EventEmitter();

	@HostBinding('@routerTransition') transitionState = 'enter';

	constructor(private router: Router) {}

	ngOnInit() {
		this.transitionState = 'in';
		this.onBackdropClick.subscribe(() => {
			this.transitionState = 'out';
			timer(700).subscribe(() => this.router.navigate([{ outlets: { modal: null } }]));
		});
	}

	ngOnDestroy() {
		this.onBackdropClick.unsubscribe();
	}
}
