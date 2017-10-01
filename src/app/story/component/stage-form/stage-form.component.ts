import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'xes-stage-form',
	templateUrl: './stage-form.component.html',
	styleUrls: ['./stage-form.component.scss']
})
export class StageFormComponent {
	@Output() onSubmitSignal: EventEmitter<any> = new EventEmitter<any>();

	title = new FormControl();

	content = new FormControl();

	onSubmit(event: Event) {
		this.onSubmitSignal.emit({
			title: this.title.value,
			content: this.content.value,
		});
	}
}
