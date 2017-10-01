import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';

import { AddStoryStageAction, RemoveStoryStageAction } from '../../../actions/stage';
import StoryStage from '../../../model/story-stage';
import { StoryModuleState, selectFeatureStages } from '../../../reducers';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent {

	stages: Observable<StoryStage[]>;

	constructor(private store: Store<StoryModuleState>) {
		this.stages = store.select(selectFeatureStages);
	}

	onStoryStageAdd({ title, content }) {
		this.store.dispatch(new AddStoryStageAction(title, content));
	}

	onStoryStageRemove(index: number) {
		this.store.dispatch(new RemoveStoryStageAction(index));
	}
}
