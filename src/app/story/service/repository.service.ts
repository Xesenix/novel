import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { undo } from 'xes-ngrx-undo';

@Injectable()
export class RepositoryService<T> {
	redoActions: any[] = [];
	undoActions: any[] = [];

	constructor(protected store: Store<T>) {}

	dispatch(action) {
		this.undoActions.push(action);
		this.redoActions = [];
		this.store.dispatch(action);
	}

	undo(): boolean {
		if (this.undoActions.length > 0) {
			const action = this.undoActions.pop();
			this.redoActions.push(action);
			this.store.dispatch(undo(action));

			return true;
		}

		return false;
	}

	redo(): boolean {
		if (this.redoActions.length > 0) {
			const action = this.redoActions.pop();
			this.undoActions.push(action);
			this.store.dispatch(action);

			return true;
		}

		return false;
	}

	canUndo(): boolean {
		return this.undoActions.length > 0;
	}

	canRedo(): boolean {
		return this.redoActions.length > 0;
	}
}
