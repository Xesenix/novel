import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { StoryChapter } from 'story/model/story-chapter';

@Component({
	selector: 'xes-chapter-form',
	templateUrl: './chapter-form.component.html',
	styleUrls: ['./chapter-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterFormComponent implements OnChanges {
	@Input() data: StoryChapter;
	@Output() valueChange: BehaviorSubject<StoryChapter> = new BehaviorSubject<StoryChapter>(this.data);

	title = new FormControl();
	id = new FormControl();

	constructor() {
		Observable.combineLatest(
			this.title.valueChanges.startWith(''),
			this.id.valueChanges.startWith(''),
			(title: string, id: string) => new StoryChapter(id, title)
		).subscribe(stage => this.valueChange.next(stage));
	}

	ngOnChanges(changes: SimpleChanges) {
		this.id.setValue(changes.data.currentValue.id);
		this.title.setValue(changes.data.currentValue.title);
	}
}
