import { Action } from '@ngrx/store';

export const LIST_ADD = 'STORY_ADD_CHAPTER';

export class AddStoryChapterAction implements Action {
	readonly type = LIST_ADD;
	constructor(public id: string, public title: string = null) {}
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

export const LIST_ITEM_UPDATE = 'STORY_UPDATE_CHAPTER';
export class UpdateStoryChapterAction implements Action {
	readonly type = LIST_ITEM_UPDATE;
	constructor(public index: number, public id: string = null, public title: string = null) {}
}

export const LIST_ACTIONS = [LIST_ADD, LIST_REMOVE, LIST_ITEM_MOVE, LIST_ITEM_UPDATE];
export type Actions = AddStoryChapterAction | RemoveStoryChapterAction | MoveStoryChapterAction | UpdateStoryChapterAction;
