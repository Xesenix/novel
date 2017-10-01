import { Action } from '@ngrx/store';

export const ADD_STAGE = 'STORY_ADD_STAGE';

export class AddStoryStageAction implements Action {
	readonly type = ADD_STAGE;
	constructor(public title: string = null,
		public content: string = null) {}
}

export type Actions = AddStoryStageAction;
