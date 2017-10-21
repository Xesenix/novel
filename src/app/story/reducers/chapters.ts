import { listReducerFactory, sortableListReducerFactory } from 'app/reducers/list';

import { StoryChapter } from '../model/story-chapter';
import * as actions from '../actions/chapter';

export type ChaptersState = StoryChapter[];

const listReducer = listReducerFactory<StoryChapter>(({ title, id }) => new StoryChapter(id, title), actions);
const sortableReducer = sortableListReducerFactory(actions);

export function reducer(state, action): ChaptersState {
	state = listReducer(state, action);
	state = sortableReducer(state, action);
	return state;
}
