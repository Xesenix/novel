import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscriber, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { AddStoryStageAction, MoveStoryStageAction, RemoveStoryStageAction, UpdateStoryStageAction } from 'story/actions/stage';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { StoryStage } from 'story/model/story-stage';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryModuleState, selectFeatureStages, selectFeatureChapters } from 'story/reducers';

@Component({
	selector: 'xes-stage-list',
	templateUrl: './stage-list.component.html',
	styleUrls: ['./stage-list.component.scss'],
	providers: [DragulaService],
	animations: [trigger('listState', [transition(':enter', [style({ transform: 'scale(1.0)', opacity: 1, backgroundColor: '#8f8' }), animate(500)])])],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageListComponent implements OnDestroy {
	@ViewChild('addForm') addForm: StageFormComponent;

	@Input() stages: Observable<StoryStage[]>;
	@Input() chapters: Observable<StoryChapter[]>;

	subscriptionDragAndDrop: Subscription;

	constructor(private store: Store<StoryModuleState>, private dragulaService: DragulaService) {
		this.stages = store.select(selectFeatureStages);
		this.chapters = store.select(selectFeatureChapters);

		this.dragulaService.setOptions('stages', {
			moves: (el, container, handle) => handle.className.split(' ').indexOf('handle') >= 0,
		});

		this.subscriptionDragAndDrop = this.dragulaService.drag
			.filter(([container]) => container === 'stages')
			.map(([container, dragElement, source]): number => Array.prototype.indexOf.call(source.children, dragElement))
			.zip(
				this.dragulaService.drop
					.filter(([container]) => container === 'stages')
					.map(([container, dropElement, target, source]): number => Array.prototype.indexOf.call(target.children, dropElement))
			)
			.subscribe(([dragIndex, dropIndex]) => this.store.dispatch(new MoveStoryStageAction(dragIndex, dropIndex)));
	}

	stageListItemIdentity(index: number, stage: StoryStage) {
		return `${index}:${stage.id}`;
	}

	add() {
		this.stageAdd(this.addForm.valueChange.getValue());
	}

	stageAdd({ title, content, chapter }) {
		this.store.dispatch(new AddStoryStageAction(title, content, chapter));
	}

	stageUpdate(index, { id, title, content, chapter }) {
		this.store.dispatch(new UpdateStoryStageAction(index, id, title, content, chapter));
	}

	stageRemove(index: number) {
		this.store.dispatch(new RemoveStoryStageAction(index));
	}

	ngOnDestroy() {
		this.subscriptionDragAndDrop.unsubscribe();
	}
}
