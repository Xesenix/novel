import { ADD_STAGE, AddStoryStageAction, REMOVE_STAGE, RemoveStoryStageAction } from './stage';

describe('actions.stage', () => {
	it('should create AddStoryStageAction action with filled properties', () => {
		const title = 'title';
		const content = 'content';

		const action = new AddStoryStageAction(title, content);

		expect(action.type).toEqual(ADD_STAGE);
		expect(action.title).toEqual(title);
		expect(action.content).toEqual(content);
	});

	it('should create RemoveStoryStageAction action with filled properties', () => {
		const index = 2;

		const action = new RemoveStoryStageAction(index);

		expect(action.type).toEqual(REMOVE_STAGE);
		expect(action.index).toEqual(index);
	});
});
