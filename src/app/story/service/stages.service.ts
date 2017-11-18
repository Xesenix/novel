import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { MoveStoryStageAction, AddStoryStageAction, AddStoryStageAtAction, UpdateStoryStageAction, RemoveStoryStageAction } from 'story/actions/stage';
import { StoryStage } from 'story/model/story-stage';
import { StoryModuleState, selectFeatureStages } from 'story/reducers';
import { RepositoryService } from 'story/service/repository.service';

@Injectable()
export class StagesService extends RepositoryService<StoryModuleState> {
	move(from, to) {
		// console.log('move', from, to);

		this.dispatch(new MoveStoryStageAction(from, to));
	}

	moveToChapter(from: number, to: number, chapter: string = null) {
		// console.log('move', from, to);

		this.store
			.select(selectFeatureStages)
			.pipe(map((stages: StoryStage[]) => stages[from]), take(1))
			.subscribe((stage: StoryStage) => {
				this.move(from, to);
				if (stage.chapter !== chapter) {
					this.update(to, { ...stage, chapter });
				}
			});
	}

	addAt(index: number, { id, title, content, chapter }: { id: number; title: string; content: string; chapter: string }): void {
		this.dispatch(new AddStoryStageAtAction(index, id, title, content, chapter));
	}

	add({ title, content, chapter }: { title: string; content: string; chapter: string }): void {
		this.dispatch(new AddStoryStageAction(title, content, chapter));
	}

	update(index: number, { id, title, content, chapter }: { id: number; title: string; content: string; chapter: string }): void {
		this.dispatch(new UpdateStoryStageAction(index, id, title, content, chapter));
	}

	remove(index: number): void {
		this.dispatch(new RemoveStoryStageAction(index));
	}
}
