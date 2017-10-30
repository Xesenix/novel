import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable, Subscription } from 'rxjs/Rx';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { SortableListItem } from 'app/reducers/list';
import { AddStoryChapterAction, MoveStoryChapterAction, RemoveStoryChapterAction } from 'story/actions/chapter';
import { ChapterFormComponent } from 'story/component/chapter-form/chapter-form.component';
import { StoryChapter } from 'story/model/story-chapter';
import { selectFeatureChapters, selectFeatureChaptersSortableList, StoryModuleState } from 'story/reducers';
import { UpdateStoryChapterAction } from 'story/actions/chapter';

@Component({
	selector: 'xes-chapters',
	templateUrl: './chapters.component.html',
	styleUrls: ['./chapters.component.scss'],
	providers: [DragulaService],
	animations: [trigger('listState', [transition(':enter', [style({ transform: 'scale(1.0)', opacity: 1, backgroundColor: '#8f8' }), animate(500)])])],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersComponent implements OnDestroy {
	@ViewChild('addForm') addForm: ChapterFormComponent;

	list: Observable<SortableListItem<StoryChapter>[]>;

	subscriptionDragAndDrop: Subscription;

	constructor(private store: Store<StoryModuleState>, private dragulaService: DragulaService) {
		this.list = store.select(selectFeatureChaptersSortableList);

		this.dragulaService.setOptions('chapters', {
			moves: (el, container, handle) => handle.className.split(' ').indexOf('handle') >= 0,
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'chapters').subscribe(({ from, to }) => {
			this.store.dispatch(new MoveStoryChapterAction(from, to));
		});
	}

	listItemIdentity(index: number, item: SortableListItem<StoryChapter>): string {
		return `index:${index}:id:${item.data.id}:version:${item.data.title}`;
	}

	add(): void {
		this.chapterAdd(this.addForm.valueChange.getValue());
	}

	chapterAdd({ title, id }): void {
		this.store.dispatch(new AddStoryChapterAction(id, title));
	}

	chapterUpdate(index, { id, title }) {
		this.store.dispatch(new UpdateStoryChapterAction(index, id, title));
	}

	chapterRemove(index: number): void {
		this.store.dispatch(new RemoveStoryChapterAction(index));
	}

	ngOnDestroy(): void {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
