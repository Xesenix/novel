import { listReducerFactory, sortableListReducerFactory, updatableListReducerFactory } from 'app/reducers/list';
import * as actions from 'story/actions/chapter';
import { StoryChapter } from 'story/model/story-chapter';

export type ChaptersState = StoryChapter[];

const itemFactory = (list: ChaptersState, { title, id }) => new StoryChapter(id, title);
const listReducer = listReducerFactory<StoryChapter>(itemFactory, actions);
const sortableReducer = sortableListReducerFactory(actions);
const updateReducer = updatableListReducerFactory<StoryChapter>(itemFactory, actions);

export function reducer(state, action): ChaptersState {
	state = listReducer(state, action);
	state = sortableReducer(state, action);
	state = updateReducer(state, action);
	return state;
}
