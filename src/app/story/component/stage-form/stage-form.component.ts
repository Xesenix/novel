import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';
import { selectFeatureChapters, StoryModuleState } from 'story/reducers';

export interface StageFormType {
	title: string;
	content: string;
	chapter: string;
}
@Component({
	selector: 'xes-stage-form',
	templateUrl: './stage-form.component.html',
	styleUrls: ['./stage-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageFormComponent implements OnChanges {
	@Input() showChapter = true;
	@Input() data: StageFormType;
	@Output() valueChange: BehaviorSubject<StageFormType> = new BehaviorSubject<StageFormType>(this.data);

	chapters: Observable<StoryChapter[]>;
	id: number;
	title = new FormControl();
	content = new FormControl();
	chapter = new FormControl();

	constructor(private store: Store<StoryModuleState>) {
		this.chapters = store.select(selectFeatureChapters);

		Observable.combineLatest(
			this.title.valueChanges.startWith(''),
			this.content.valueChanges.startWith(''),
			this.chapter.valueChanges.startWith(''),
			(title, content, chapter) => ({ id: this.id, title, content, chapter }),
		).subscribe((stage: StageFormType) => this.valueChange.next(stage));
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.data.currentValue !== null) {
			this.id = changes.data.currentValue.id;
			this.title.setValue(changes.data.currentValue.title);
			this.content.setValue(changes.data.currentValue.content);
			this.chapter.setValue(changes.data.currentValue.chapter);
		}
	}
}
