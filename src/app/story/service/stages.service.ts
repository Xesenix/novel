import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { undo } from 'ngrx-undo';

import { MoveStoryStageAction, AddStoryStageAction, UpdateStoryStageAction, RemoveStoryStageAction } from 'story/actions/stage';
import { StoryModuleState } from 'story/reducers';
import { RepositoryService } from 'story/service/repository.service';

@Injectable()
export class StagesService extends RepositoryService<StoryModuleState> {
	move(from, to) {
		this.dispatch(new MoveStoryStageAction(from, to));
	}

	add({ title, content, chapter }) {
		this.dispatch(new AddStoryStageAction(title, content, chapter));
	}

	update(index, { id, title, content, chapter }) {
		this.dispatch(new UpdateStoryStageAction(index, id, title, content, chapter));
	}

	remove(index: number) {
		this.dispatch(new RemoveStoryStageAction(index));
	}
}
