import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'xes-simple-layout',
	templateUrl: './simple-layout.component.html',
	styleUrls: ['./simple-layout.component.scss'],
})
export class SimpleLayoutComponent {
	@Input() brandName: string;
}
