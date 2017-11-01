import { StagesService } from 'story/service/stages.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchMap';
import { Subscriber, Subscription } from 'rxjs/Rx';

import { pickAndDropObservable } from 'app/list/pick-and-drop';
import { SortableListItem } from 'app/reducers/list';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';
import { selectFeatureChapters, selectFeatureStages, selectFeatureStagesSortableList, StoryModuleState } from 'story/reducers';
import { hash } from 'app/utils/hash';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss'],
	providers: [DragulaService],
	animations: [trigger('listState', [transition(':enter', [style({ transform: 'scale(1.0)', opacity: 1, backgroundColor: '#8f8' }), animate(500)])])],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageListComponent implements OnInit, OnDestroy {
	@ViewChild('addForm') addForm: StageFormComponent;

	@Input() list: Observable<SortableListItem<StoryStage>[]>;

	subscriptionDragAndDrop: Subscription;

	undo: any[] = [];

	constructor(private store: Store<StoryModuleState>, private dragulaService: DragulaService, public stagesService: StagesService) {}

	ngOnInit() {
		this.list = this.store.select(selectFeatureStagesSortableList).share();

		this.dragulaService.setOptions('stages', {
			moves: (el, container, handle) => handle.className.split(' ').indexOf('handle') >= 0,
		});

		this.subscriptionDragAndDrop = pickAndDropObservable(this.dragulaService, 'stages').subscribe(({ from, to }) => this.stagesService.move(from, to));
	}

	listItemIdentity(index: number, item: SortableListItem<StoryStage>) {
		return `index:${index}:${hash(item.data)}`;
	}

	add() {
		this.stagesService.add(this.addForm.valueChange.getValue());
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
