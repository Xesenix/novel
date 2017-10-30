import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ChapterFormComponent } from 'story/component/chapter-form/chapter-form.component';
import { StoryChapter } from 'story/model/story-chapter';

@Component({
	selector: 'xes-chapter-list-item',
	templateUrl: './chapter-list-item.component.html',
	styleUrls: ['./chapter-list-item.component.scss'],
})
export class ChapterListItemComponent {
	@Input() chapter: StoryChapter = null;

	@Output() updateSignal: EventEmitter<any> = new EventEmitter<any>();
	@Output() removeSignal: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('form') form: ChapterFormComponent;

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
