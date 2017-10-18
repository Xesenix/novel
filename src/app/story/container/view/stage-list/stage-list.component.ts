import { Store } from '@ngrx/store';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {
	AddStoryStageAction,
	MoveStoryStageAction,
	RemoveStoryStageAction,
	UpdateStoryStageAction,
} from '../../../actions/stage';
import { StageFormComponent } from '../../../component/stage-form/stage-form.component';
import { StoryStage } from '../../../model/story-stage';
import { StoryModuleState, selectFeatureStages } from '../../../reducers';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss'],
	providers: [DragulaService],
})
export class StageListComponent implements OnDestroy {
	@ViewChild('addForm') addForm: StageFormComponent;

	stages: Observable<StoryStage[]>;

	subscriptionDragAndDrop: Subscription;

	constructor(private store: Store<StoryModuleState>,
		private dragulaService: DragulaService) {
		this.stages = store.select(selectFeatureStages);

		this.dragulaService.setOptions('stages', {
			moves: (el, container, handle) => handle.className.split(' ').indexOf('handle') >= 0
		});

		this.subscriptionDragAndDrop = this.dragulaService.drag
			.filter(([container]) => container === 'stages')
			.map(([container, dragElement, source]): number => Array.prototype.indexOf.call(source.children, dragElement))
			.combineLatest(
				this.dragulaService.drop
					.filter(([container]) => container === 'stages')
					.map(([container, dropElement, target, source]): number => Array.prototype.indexOf.call(target.children, dropElement))
			)
			.subscribe(([dragIndex, dropIndex]) => {
				this.store.dispatch(new MoveStoryStageAction(dragIndex, dropIndex));
			});
	}

	add() {
		this.onStoryStageAdd(this.addForm.valueChange.getValue());
	}

	onStoryStageAdd({ title, content, chapter }) {
		this.store.dispatch(new AddStoryStageAction(title, content, chapter));
	}

	onStoryStageUpdate(index, { title, content, chapter }) {
		this.store.dispatch(new UpdateStoryStageAction(index, title, content, chapter));
	}

	onStoryStageRemove(index: number) {
		this.store.dispatch(new RemoveStoryStageAction(index));
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
