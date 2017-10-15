import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'xes-chapter-form',
	templateUrl: './chapter-form.component.html',
	styleUrls: ['./chapter-form.component.scss']
})
export class ChapterFormComponent {
	@Output() onSubmitSignal: EventEmitter<any> = new EventEmitter<any>();

	title = new FormControl();

	onSubmit(event: Event) {
		this.onSubmitSignal.emit({
			title: this.title.value,
		});
	}
}
