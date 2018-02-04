import { Component, OnInit } from '@angular/core';
import { LevelUpManager } from 'app/level-up/level-up.manager';

@Component({
	selector: 'xes-tools',
	templateUrl: './tools.component.html',
	styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent {
	constructor(public lvlUp: LevelUpManager) {}
}
