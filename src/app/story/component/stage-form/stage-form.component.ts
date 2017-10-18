import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, ConnectableObservable, Observable } from 'rxjs/Rx';

import { selectFeatureChapters, StoryModuleState } from '../../reducers/index';
import { StoryStage } from '../../model/story-stage';
import { StoryChapter } from '../../model/story-chapter';

@Component({
	selector: 'xes-stage-form',
	templateUrl: './stage-form.component.html',
	styleUrls: ['./stage-form.component.scss']
})
export class StageFormComponent implements OnChanges {
	@Input() data: StoryStage;

	chapters: Observable<StoryChapter[]>;
	title = new FormControl();
	content = new FormControl();
	chapter = new FormControl();

	@Output() valueChange: BehaviorSubject<StoryStage> = new BehaviorSubject<StoryStage>(this.data);

	constructor(private store: Store<StoryModuleState>) {
		this.chapters = store.select(selectFeatureChapters);

		Observable.combineLatest(
			this.title.valueChanges,
			this.content.valueChanges,
			this.chapter.valueChanges,
			(title, content, chapter) => new StoryStage(title, content, chapter)
		).subscribe((stage) => this.valueChange.next(stage));
	}

	ngOnChanges(changes: SimpleChanges) {
		this.title.setValue(changes.data.currentValue.title);
		this.content.setValue(changes.data.currentValue.content);
		this.chapter.setValue(changes.data.currentValue.chapter);
	}
}
