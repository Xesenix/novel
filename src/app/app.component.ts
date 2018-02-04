import { Component, ViewContainerRef } from '@angular/core';
import { LevelUpManager } from './level-up/level-up.manager';

@Component({
	selector: 'xes-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	constructor(cvr: ViewContainerRef, lvlUp: LevelUpManager) {
		lvlUp.setRootViewContainerRef(cvr);
	}
}
