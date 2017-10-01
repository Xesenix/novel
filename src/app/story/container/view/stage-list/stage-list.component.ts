import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';

import { AddStoryStageAction } from '../../../actions/stage';
import StoryStage from '../../../model/story-stage';
import * as fromStage from '../../../reducers/stages';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent {

	stages: Observable<StoryStage[]>;

	constructor(private store: Store<fromStage.State>) {
		this.stages = store.select(fromStage.getStates);
	}

	onStoryStageAdd({ title, content }) {
		this.store.dispatch(new AddStoryStageAction(title, content));
	}
}
