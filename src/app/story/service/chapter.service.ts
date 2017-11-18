import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { RemoveStoryChapterAction, UpdateStoryChapterAction, AddStoryChapterAction, MoveStoryChapterAction } from 'story/actions/chapter';
import { StoryModuleState } from 'story/reducers';
import { RepositoryService } from 'story/service/repository.service';

@Injectable()
export class ChapterService extends RepositoryService<StoryModuleState> {
	move(from: number, to: number): void {
		this.dispatch(new MoveStoryChapterAction(from, to));
	}

	add({ title, id, stages }: { id: string; title: string; stages?: number[] }): void {
		this.dispatch(new AddStoryChapterAction(id, title, stages));
	}

	update(index: number, { id, title, stages = [] }: { id: string; title: string; stages?: number[] }): void {
		this.dispatch(new UpdateStoryChapterAction(index, id, title, stages));
	}

	remove(index: number): void {
		this.dispatch(new RemoveStoryChapterAction(index));
	}
}
