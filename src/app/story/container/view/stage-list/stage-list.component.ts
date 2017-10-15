import { Subscriber, Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AddStoryStageAction, MoveStoryStageAction, RemoveStoryStageAction } from '../../../actions/stage';
import StoryStage from '../../../model/story-stage';
import { StoryModuleState, selectFeatureStages } from '../../../reducers';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss'],
	providers: [DragulaService],
})
export class StageListComponent implements OnDestroy {

	stages: Observable<StoryStage[]>;

	subscriptionDragAndDrop: Subscription;

	constructor(private store: Store<StoryModuleState>,
		private dragulaService: DragulaService) {
		this.stages = store.select(selectFeatureStages);

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

	onStoryStageAdd({ title, content }) {
		this.store.dispatch(new AddStoryStageAction(title, content));
	}

	onStoryStageRemove(index: number) {
		this.store.dispatch(new RemoveStoryStageAction(index));
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
