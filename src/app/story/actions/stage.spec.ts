import { ADD_STAGE, AddStoryStageAction } from './stage';

describe('actions.stage', () => {
	it('should create AddStoryStage action with filled properties', () => {
		const title = 'title';
		const content = 'content';

		const action = new AddStoryStageAction(title, content);

		expect(action.type).toEqual(ADD_STAGE);
		expect(action.title).toEqual(title);
		expect(action.content).toEqual(content);
	});
});
