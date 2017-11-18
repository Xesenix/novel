import { LIST_ADD, AddStoryStageAction, LIST_REMOVE, RemoveStoryStageAction } from 'story/actions/stage';

describe('story:actions.stage', () => {
	it('should create AddStoryStageAction action with filled properties', () => {
		const title = 'title';
		const content = 'content';
		const chapter = 'ch-1';

		const action = new AddStoryStageAction(title, content, chapter);

		expect(action.type).toEqual(LIST_ADD);
		expect(action.title).toEqual(title);
		expect(action.content).toEqual(content);
		expect(action.chapter).toEqual(chapter);
	});

	it('should create RemoveStoryStageAction action with filled properties', () => {
		const index = 2;

		const action = new RemoveStoryStageAction(index);

		expect(action.type).toEqual(LIST_REMOVE);
		expect(action.index).toEqual(index);
	});
});
