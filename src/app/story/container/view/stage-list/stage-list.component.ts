import { animate, state, style, transition, trigger, query } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { IndexedListItem } from 'app/reducers/list';
import { hash } from 'app/utils/hash';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryStage } from 'story/model/story-stage';
import { selectFeatureStagesSortableList, StoryModuleState } from 'story/reducers';
import { StagesService } from 'story/service/stages.service';
import { StoryModuleConfig, STORY_MODULE_CONFIG, storyModuleDefaultConfig } from 'story/story.config';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss'],
	providers: [DragulaService],
	animations: [
		trigger('listState', [transition(':enter', [style({ transform: 'scale(1.0)', opacity: 1, backgroundColor: '#8f8' }), animate(500)])]),
		trigger('slide', [
			transition(':enter', [
				query('.layout-content', [style({ transform: 'translateY(200px)', opacity: 0 }), animate(500, style({ transform: 'translateY(0px)', opacity: 1 }))]),
			]),
			transition(':leave', [
				query('.layout-content', [style({ transform: 'translateY(0)', opacity: 1 }), animate(500, style({ transform: 'translateY(-200px)', opacity: 0 }))]),
				animate(500),
			]),
		]),
	],
	// host: { '[@slide]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageListComponent implements OnInit, OnDestroy {
	@ViewChild('addForm') addForm: StageFormComponent;

	@Input() list: Observable<IndexedListItem<StoryStage>[]>;

	subscriptionDragAndDrop: Subscription;

	undo: any[] = [];

	constructor(
		private store: Store<StoryModuleState>,
		private dragulaService: DragulaService,
		public stagesService: StagesService,
		@Inject(STORY_MODULE_CONFIG) public config: StoryModuleConfig = storyModuleDefaultConfig,
	) {}

	ngOnInit() {
		this.list = this.store.select(selectFeatureStagesSortableList).share();

		this.dragulaService.setOptions('stages', {
			moves: (el, container, handle) => handle.getAttribute('data-drag') === 'stage',
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'stages').subscribe(({ from, to, pick }) => this.stagesService.move(+from, +to));
	}

	listItemIdentity(index: number, item: IndexedListItem<StoryStage>) {
		return `index:${index}:${hash(item.data)}`;
	}

	add() {
		this.stagesService.add(this.addForm.valueChange.getValue());
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
