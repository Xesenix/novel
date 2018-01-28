import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { ReplaySubject, Subscription } from 'rxjs/Rx';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { IndexedListItem } from 'app/reducers/list';
import { hash } from 'app/utils/hash';
import { AddStoryStageAction, MoveStoryStageAction } from 'story/actions/stage';
import { StageFormType, StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';
import { selectFeatureChapters, selectFeatureStagesSortableList, StoryModuleState } from 'story/reducers';

@Component({
	selector: 'xes-chapter',
	templateUrl: './chapter.component.html',
	styleUrls: ['./chapter.component.scss'],
	providers: [DragulaService],
	animations: [trigger('listState', [transition(':enter', [style({ transform: 'scale(1.0)', opacity: 1, backgroundColor: '#8f8' }), animate(500)])])],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit, OnDestroy {
	@ViewChild('addForm') addForm: StageFormComponent;

	templateStage: ReplaySubject<StageFormType>;
	chapter: StoryChapter;
	chapters: Observable<StoryChapter[]>;
	list: Observable<IndexedListItem<StoryStage>[]>;

	subscriptionDragAndDrop: Subscription;
	subscriptionChapterChange: Subscription;

	constructor(private route: ActivatedRoute, private store: Store<StoryModuleState>, private dragulaService: DragulaService) {}

	ngOnInit() {
		this.dragulaService.setOptions('stages', {
			moves: (el, container, handle) => handle.getAttribute('data-drag') === 'stage',
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'stages').subscribe(({ from, to, pick }) =>
			this.store.dispatch(new MoveStoryStageAction(+from, +to))
		);

		this.templateStage = new ReplaySubject<StageFormType>();
		this.chapters = this.store.select(selectFeatureChapters);

		const chapterId$ = this.route.paramMap.pipe(map(params => params.get('id')));

		const chapterChange$ = combineLatest(this.chapters, chapterId$, (chapters: StoryChapter[], chapterId: string) =>
			chapters.find((chapter: StoryChapter) => chapter.id === chapterId)
		);

		this.list = combineLatest(this.store.select(selectFeatureStagesSortableList), chapterId$, (stages: IndexedListItem<StoryStage>[], chapterId: string) =>
			stages.filter((item: IndexedListItem<StoryStage>) => item.data.chapter === chapterId)
		);

		this.subscriptionChapterChange = chapterChange$.subscribe(chapter => {
			this.chapter = chapter;
			const { title, content } = this.addForm.valueChange.getValue();
			this.templateStage.next({ title, content, chapter: chapter.id });
		});
	}

	listItemIdentity(index: number, item: IndexedListItem<StoryStage>) {
		return `index:${index}:${hash(item.data)}`;
	}

	add() {
		this.stageAdd(this.addForm.valueChange.getValue());
	}

	stageAdd({ title, content, chapter }) {
		this.store.dispatch(new AddStoryStageAction(title, content, chapter));
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
		this.subscriptionChapterChange.unsubscribe();
	}
}
