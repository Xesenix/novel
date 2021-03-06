import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'xes-primary-layout',
	templateUrl: './primary-layout.component.html',
	styleUrls: ['./primary-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent {}
