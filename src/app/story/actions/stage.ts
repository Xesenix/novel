import { Action } from '@ngrx/store';

export const ADD_STAGE = 'STORY_ADD_STAGE';

export class AddStoryStageAction implements Action {
	readonly type = ADD_STAGE;
	constructor(public title: string = null,
		public content: string = null) {}
}

export const REMOVE_STAGE = 'STORY_REMOVE_STAGE';

export class RemoveStoryStageAction implements Action {
	readonly type = REMOVE_STAGE;
	constructor(public index: number) {}
}

export type Actions = AddStoryStageAction | RemoveStoryStageAction;
