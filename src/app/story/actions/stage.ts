import { Action } from '@ngrx/store';

export const LIST_ADD = 'STORY_ADD_STAGE';

export class AddStoryStageAction implements Action {
	readonly type = LIST_ADD;
	constructor(public title: string = null, public content: string = null, public chapter: string = null) {}
}

export const LIST_REMOVE = 'STORY_REMOVE_STAGE';

export class RemoveStoryStageAction implements Action {
	readonly type = LIST_REMOVE;
	constructor(public index: number) {}
}

export const LIST_ITEM_MOVE = 'STORY_MOVE_STAGE';

export class MoveStoryStageAction implements Action {
	readonly type = LIST_ITEM_MOVE;
	constructor(public from: number, public to: number) {}
}

export const LIST_ITEM_UPDATE = 'STORY_UPDATE_STAGE';
export class UpdateStoryStageAction implements Action {
	readonly type = LIST_ITEM_UPDATE;
	constructor(public index: number, public id: string = null, public title: string = null, public content: string = null, public chapter: string = null) {}
}

export const LIST_ACTIONS = [LIST_ADD, LIST_REMOVE, LIST_ITEM_MOVE, LIST_ITEM_UPDATE];
export type Actions = AddStoryStageAction | RemoveStoryStageAction | MoveStoryStageAction | UpdateStoryStageAction;
