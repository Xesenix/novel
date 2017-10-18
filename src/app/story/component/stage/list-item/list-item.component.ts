import { BehaviorSubject } from 'rxjs/Rx';
import { ViewChild, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StageFormComponent } from '../../stage-form/stage-form.component';
import { StoryStage } from '../../../model/story-stage';

@Component({
	selector: 'xes-stage-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
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
	}

	remove() {
		this.removeSignal.emit();
	}
}
