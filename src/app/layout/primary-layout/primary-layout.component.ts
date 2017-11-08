import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'xes-primary-layout',
	templateUrl: './primary-layout.component.html',
	styleUrls: ['./primary-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent {
	@Input() brandName: string;
}
