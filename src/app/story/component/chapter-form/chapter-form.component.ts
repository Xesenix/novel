import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StoryChapter } from 'story/model/story-chapter';

export interface ChapterFormType {
	id: string;
	title: string;
}
@Component({
	selector: 'xes-chapter-form',
	templateUrl: './chapter-form.component.html',
	styleUrls: ['./chapter-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterFormComponent implements OnChanges {
	@Input() edit = false;
	@Input() data: ChapterFormType;
	@Output() valueChange: BehaviorSubject<ChapterFormType> = new BehaviorSubject<ChapterFormType>(this.data);

	title = new FormControl();
	id = new FormControl();

	constructor() {
		Observable.combineLatest(this.title.valueChanges.startWith(''), this.id.valueChanges.startWith(''), (title: string, id: string) => ({
			id,
			title,
		})).subscribe((stage: ChapterFormType) => this.valueChange.next(stage));
	}

	ngOnChanges(changes: SimpleChanges) {
		this.id.setValue(changes.data.currentValue.id);
		this.title.setValue(changes.data.currentValue.title);

		if (changes.edit.currentValue) {
			this.id.disable();
		} else {
			this.id.enable();
		}
	}
}
