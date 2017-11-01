import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { undo } from 'ngrx-undo';

import { StoryModuleState } from 'story/reducers';
import { MoveStoryStageAction, AddStoryStageAction, UpdateStoryStageAction, RemoveStoryStageAction } from 'story/actions/stage';

@Injectable()
export class StagesService {
	redoActions: any[] = [];
	undoActions: any[] = [];

	constructor(private store: Store<StoryModuleState>) {}

	dispatch(action) {
		this.undoActions.push(action);
		this.redoActions = [];
		this.store.dispatch(action);
	}

	undo() {
		if (this.undoActions.length > 0) {
			const action = this.undoActions.pop();
			this.redoActions.push(action);
			this.store.dispatch(undo(action));
		}
	}

	redo() {
		if (this.redoActions.length > 0) {
			const action = this.redoActions.pop();
			this.undoActions.push(action);
			this.store.dispatch(action);
		}
	}

	canUndo() {
		return this.undoActions.length > 0;
	}

	canRedo() {
		return this.redoActions.length > 0;
	}

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
