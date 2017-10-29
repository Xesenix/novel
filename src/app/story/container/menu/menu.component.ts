import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoryChapter } from 'story/model/story-chapter';
import { StoryModuleState, selectFeatureChapters } from 'story/reducers';

@Component({
	selector: 'xes-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
	chapters: Observable<StoryChapter[]>;

	constructor(private store: Store<StoryModuleState>) {}

	ngOnInit() {
		this.chapters = this.store.select(selectFeatureChapters);
	}
}
