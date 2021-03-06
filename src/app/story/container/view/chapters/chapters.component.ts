import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { IndexedListItem } from 'app/reducers/list';
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

	list: Observable<IndexedListItem<StoryChapter>[]>;

	subscriptionDragAndDrop: Subscription;

	constructor(private store: Store<StoryModuleState>, private dragulaService: DragulaService, public chapterService: ChapterService) {
		this.list = store.select(selectFeatureChaptersSortableList);

		this.dragulaService.setOptions('chapters', {
			moves: (el, container, handle) => handle.getAttribute('data-drag') === 'chapter',
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'chapters').subscribe(({ from, to }) => this.chapterService.move(+from, +to));
	}

	listItemIdentity(index: number, item: IndexedListItem<StoryChapter>): string {
		return `index:${index}:${hash(item.data)}`;
	}

	add(): void {
		this.chapterService.add(this.addForm.valueChange.getValue());
	}

	ngOnDestroy(): void {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
