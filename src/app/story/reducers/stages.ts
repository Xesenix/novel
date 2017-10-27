import { listReducerFactory, sortableListReducerFactory, updatableListReducerFactory } from 'app/reducers/list';

import { StoryStage } from 'story/model/story-stage';
import * as actions from 'story/actions/stage';

export type StageState = StoryStage[];

const itemFactory = (list: StageState, { id = null, title, content, chapter }: { id: string; title: string; content: string; chapter: string }) =>
	new StoryStage(id !== null ? id : list.length.toString(), title, content, chapter);
const listReducer = listReducerFactory<StoryStage>(itemFactory, actions);
const sortableReducer = sortableListReducerFactory<StoryStage>(actions);
const updateReducer = updatableListReducerFactory<StoryStage>(itemFactory, actions);

export function reducer(state, action): StageState {
	state = listReducer(state, action);
	state = sortableReducer(state, action);
	state = updateReducer(state, action);
	return state;
}
