import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'xes-character-list',
	templateUrl: './character-list.component.html',
	styleUrls: ['./character-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListComponent {}
