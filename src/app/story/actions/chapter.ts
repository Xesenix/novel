import { Action } from '@ngrx/store';

export const LIST_ADD = 'STORY_ADD_CHAPTER';

export class AddStoryChapterAction implements Action {
	readonly type = LIST_ADD;
	constructor(public title: string = null,
		public content: string = null) {}
}

export const LIST_REMOVE = 'STORY_REMOVE_CHAPTER';

export class RemoveStoryChapterAction implements Action {
	readonly type = LIST_REMOVE;
	constructor(public index: number) {}
}

export const LIST_ITEM_MOVE = 'STORY_MOVE_CHAPTER';

export class MoveStoryChapterAction implements Action {
	readonly type = LIST_ITEM_MOVE;
	constructor(public from: number, public to: number) {}
}

export type Actions = AddStoryChapterAction | RemoveStoryChapterAction | MoveStoryChapterAction;
