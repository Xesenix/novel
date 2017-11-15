import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { combineLatest, map, shareReplay, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { SortableListItem } from 'app/reducers/list';
import { hash } from 'app/utils/hash';
import { ChapterFormComponent } from 'story/component/chapter-form/chapter-form.component';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';
import { StoryModuleState, selectFeatureStagesSortableList } from 'story/reducers';
import { StagesService } from 'story/service/stages.service';
import { selectFeatureStages } from 'story/reducers';

@Component({
	selector: 'xes-chapter-list-item',
	templateUrl: './chapter-list-item.component.html',
	styleUrls: ['./chapter-list-item.component.scss'],
})
export class ChapterListItemComponent implements OnInit, OnDestroy {
	@Input() chapter: StoryChapter = null;

	@Output() updateSignal: EventEmitter<any> = new EventEmitter<any>();
	@Output() removeSignal: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('form') form: ChapterFormComponent;

	isEdited = false;

	list: Observable<SortableListItem<StoryStage>[]>;
	dragListName: string;
	subscriptionDragAndDrop: Subscription = null;

	constructor(private store: Store<StoryModuleState>, private dragulaService: DragulaService, public stagesService: StagesService) {}

	ngOnInit() {
		this.list = this.store
			.select(selectFeatureStagesSortableList)
			.pipe(
				map((items: SortableListItem<StoryStage>[]) =>
					items.filter((item: SortableListItem<StoryStage>) => this.chapter !== null && item.data.chapter === this.chapter.id)
				),
				shareReplay()
			);

		this.dragListName = 'chapter-stages';
		// console.log('dragListName', this.dragListName);
		if (!this.dragulaService.find(this.dragListName)) {
			this.dragulaService.setOptions(this.dragListName, {
				moves: (el, container, handle) => handle.getAttribute('data-drag') === 'stage',
			});

			this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, this.dragListName).subscribe(({ from, to, pick, drop }) => {
				const fromIndex = +from;
				const toIndex = +to;
				// console.log('drop update stage', fromIndex, toIndex, pick, drop);
				this.store
					.select(selectFeatureStages)
					.pipe(map(stages => [stages[fromIndex], stages[toIndex]]), take(1))
					.subscribe(([fromStage, toStage]) => {
						// console.log('update stage', fromStage, { chapter: drop.containerId });
						this.stagesService.update(fromIndex, { ...fromStage, chapter: drop.containerId });
						this.stagesService.move(fromIndex, toIndex);
					});
			});
		}
	}

	listItemIdentity(index: number, item: SortableListItem<StoryStage>) {
		const chapter = this.chapter ? this.chapter.id : 'none';
		return `index:${chapter}:${index}:${hash(item.data)}`;
	}

	edit() {
		this.isEdited = true;
	}

	cancel() {
		this.isEdited = false;
	}

	update() {
		this.updateSignal.emit(this.form.valueChange.getValue());
		this.isEdited = false;
	}

	remove() {
		this.removeSignal.emit();
	}

	ngOnDestroy() {
		if (this.subscriptionDragAndDrop !== null) {
			this.subscriptionDragAndDrop.unsubscribe();
		}
		// this.dragulaService.destroy(this.dragListName);
	}
}
