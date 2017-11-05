import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Observable, Subscription } from 'rxjs/Rx';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { SortableListItem } from 'app/reducers/list';
import { hash } from 'app/utils/hash';
import { ChapterFormComponent } from 'story/component/chapter-form/chapter-form.component';
import { StoryChapter } from 'story/model/story-chapter';
import { selectFeatureChaptersSortableList, StoryModuleState } from 'story/reducers';
import { ChapterService } from 'story/service/chapter.service';

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

	constructor(private store: Store<StoryModuleState>, private dragulaService: DragulaService, public chapterService: ChapterService) {
		this.list = store.select(selectFeatureChaptersSortableList);

		this.dragulaService.setOptions('chapters', {
			moves: (el, container, handle) => handle.className.split(' ').indexOf('handle') >= 0,
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'chapters').subscribe(({ from, to }) => this.chapterService.move(from, to));
	}

	listItemIdentity(index: number, item: SortableListItem<StoryChapter>): string {
		return `index:${index}:${hash(item.data)}`;
	}

	add(): void {
		this.chapterService.add(this.addForm.valueChange.getValue());
	}

	ngOnDestroy(): void {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
