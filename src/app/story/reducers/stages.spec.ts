import StoryStage from '../model/story-stage';
import { AddStoryStageAction } from '../actions/stage';
import * as fromStages from './stages';

describe('reducers.stages', () => {
	it('should reduce ADD_STAGE actions', () => {
		const title = 'title';
		const content = 'content';
		const action = new AddStoryStageAction(title, content);
		const store: fromStages.State = [];

		const resultState = fromStages.reducer(store, action);

		expect(resultState).toEqual([new StoryStage(title, content)]);
	});
});
