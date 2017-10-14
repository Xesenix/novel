import { Action } from '@ngrx/store';

export const LIST_ADD = 'STORY_ADD_STAGE';

export class AddStoryStageAction implements Action {
	readonly type = LIST_ADD;
	constructor(public title: string = null,
		public content: string = null) {}
}

export const LIST_REMOVE = 'STORY_REMOVE_STAGE';

export class RemoveStoryStageAction implements Action {
	readonly type = LIST_REMOVE;
	constructor(public index: number) {}
}

export type Actions = AddStoryStageAction | RemoveStoryStageAction;
