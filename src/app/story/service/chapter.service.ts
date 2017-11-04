import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { undo } from 'ngrx-undo';
import { RemoveStoryChapterAction, UpdateStoryChapterAction, AddStoryChapterAction, MoveStoryChapterAction } from 'story/actions/chapter';
import { StoryModuleState } from 'story/reducers';
import { RepositoryService } from 'story/service/repository.service';

@Injectable()
export class ChapterService extends RepositoryService<StoryModuleState> {
	move(from, to) {
		this.dispatch(new MoveStoryChapterAction(from, to));
	}

	add({ title, id }): void {
		this.dispatch(new AddStoryChapterAction(id, title));
	}

	update(index, { id, title }) {
		this.dispatch(new UpdateStoryChapterAction(index, id, title));
	}

	remove(index: number): void {
		this.dispatch(new RemoveStoryChapterAction(index));
	}
}
