import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { selectFeatureChapters, StoryModuleState } from '../../reducers/index';
import { StoryStage } from '../../model/story-stage';
import { StoryChapter } from '../../model/story-chapter';

@Component({
	selector: 'xes-stage-form',
	templateUrl: './stage-form.component.html',
	styleUrls: ['./stage-form.component.scss']
})
export class StageFormComponent implements OnChanges {
	@Output() onSubmitSignal: EventEmitter<any> = new EventEmitter<any>();
	@Input() data: StoryStage;

	title = new FormControl();
	content = new FormControl();
	chapter = new FormControl();

	chapters: Observable<StoryChapter[]>;

	constructor(private store: Store<StoryModuleState>) {
		this.chapters = store.select(selectFeatureChapters);
	}

	onSubmit(event: Event) {
		this.onSubmitSignal.emit({
			title: this.title.value,
			content: this.content.value,
			chapter: this.chapter.value,
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.title.setValue(changes.data.currentValue.title);
		this.content.setValue(changes.data.currentValue.content);
		this.chapter.setValue(changes.data.currentValue.chapter);
	}
}
