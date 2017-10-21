import { AddStoryStageAction, RemoveStoryStageAction } from 'story/actions/stage';
import { StoryStage } from 'story/model/story-stage';
import * as fromStages from 'story/reducers/stages';

describe('story:reducers.stages', () => {
	it('should reduce AddStoryStageAction', () => {
		const title = 'title';
		const content = 'content';
		const action = new AddStoryStageAction(title, content);
		const store: fromStages.StageState = [];

		const resultState = fromStages.reducer(store, action);

		expect(resultState).toEqual([new StoryStage(title, content)]);
	});

	it('should reduce RemoveStoryStageAction', () => {
		const index = 1;
		const action = new RemoveStoryStageAction(index);
		const store: fromStages.StageState = [
			new StoryStage('title 1', 'content 1'),
			new StoryStage('title 2', 'content 2'),
			new StoryStage('title 3', 'content 3'),
		];

		const resultState = fromStages.reducer(store, action);

		expect(resultState).toEqual([
			new StoryStage('title 1', 'content 1'),
			new StoryStage('title 3', 'content 3'),
		]);
	});
});
