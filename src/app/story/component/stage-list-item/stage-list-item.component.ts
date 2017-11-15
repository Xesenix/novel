import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryStage } from 'story/model/story-stage';

export const component = {
	selector: 'xes-stage-list-item',
	templateUrl: './stage-list-item.component.html',
	styleUrls: ['./stage-list-item.component.scss'],
	animations: [
		trigger('itemState', [
			transition(':enter', [
				style({ transform: 'scale(2)', opacity: '0', filter: 'blur(20px)' }),
				animate(500, style({ transform: 'scale(1)', opacity: '1', filter: 'blur(0px)' })),
			]),
			transition(':leave', [
				style({ transform: 'scale(1)', opacity: '1', filter: 'blur(0px)' }),
				animate(500, style({ transform: 'scale(2)', opacity: '0', filter: 'blur(20px)' })),
			]),
		]),
		trigger('itemDescriptionState', [
			transition(':enter', [style({ filter: 'blur(10px)' }), animate(500, style({ filter: 'blur(0px)' }))]),
			transition(':leave', [style({ filter: 'blur(0px)', opacity: 1, position: 'absolute' }), animate(500, style({ filter: 'blur(10px)', opacity: 0 }))]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
};
@Component(component)
export class StageListItemComponent {
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
