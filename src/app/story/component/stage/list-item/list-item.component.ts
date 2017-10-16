import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StoryStage } from '../../../model/story-stage';

@Component({
	selector: 'xes-stage-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
	@Input() stage: StoryStage;

	@Output() updateSignal: EventEmitter<any> = new EventEmitter<any>();
	@Output() removeSignal: EventEmitter<any> = new EventEmitter<any>();

	private edit = false;

	onUpdate({ title, content, chapter }) {
		this.updateSignal.emit({ title, content, chapter });
	}

	onRemove() {
		this.removeSignal.emit();
	}
}
