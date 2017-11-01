import { BehaviorSubject } from 'rxjs/Rx';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryStage } from 'story/model/story-stage';

export const component = {
	selector: 'xes-stage-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
};
@Component(component)
export class ListItemComponent {
	@Input() stage: StoryStage = null;

	@Output() updateSignal: EventEmitter<any> = new EventEmitter<any>();
	@Output() removeSignal: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('form') form: StageFormComponent;

	isEdited = false;

	edit() {
		this.isEdited = true;
	}

	cancel() {
		this.isEdited = false;
	}

	update() {
		this.updateSignal.emit(this.form.valueChange.getValue());
		this.isEdited = false;
	}

	remove() {
		this.removeSignal.emit();
	}
}
