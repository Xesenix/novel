import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

import { AddStoryChapterAction, MoveStoryChapterAction, RemoveStoryChapterAction } from '../../../actions/chapter';
import { StoryChapter } from '../../../model/story-chapter';
import { selectFeatureChapters, StoryModuleState } from '../../../reducers/index';

@Component({
	selector: 'xes-chapters',
	templateUrl: './chapters.component.html',
	styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnDestroy {

	chapters: Observable<StoryChapter[]>;

	subscriptionDragAndDrop: Subscription;

	constructor(private store: Store<StoryModuleState>,
		private dragulaService: DragulaService) {
		this.chapters = store.select(selectFeatureChapters);

		this.subscriptionDragAndDrop = this.dragulaService.drag
			.filter(([container]) => container === 'chapters')
			.map(([container, dragElement, source]): number => Array.prototype.indexOf.call(source.children, dragElement))
			.combineLatest(
				this.dragulaService.drop
					.filter(([container]) => container === 'chapters')
					.map(([container, dropElement, target, source]): number => Array.prototype.indexOf.call(target.children, dropElement))
			)
			.subscribe(([dragIndex, dropIndex]) => {
				this.store.dispatch(new MoveStoryChapterAction(dragIndex, dropIndex));
			});
	}

	onStoryChapterAdd({ title, id }) {
		this.store.dispatch(new AddStoryChapterAction(id, title));
	}

	onStoryChapterRemove(index: number) {
		this.store.dispatch(new RemoveStoryChapterAction(index));
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}