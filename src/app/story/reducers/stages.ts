import { listReducerFactory, sortableListReducerFactory } from '../../reducers/list';
import StoryStage from '../model/story-stage';
import * as actions from '../actions/stage';

export type StageState = StoryStage[];

const listReducer = listReducerFactory<StoryStage>(({ title, content }) => new StoryStage(title, content), actions);
const sortableReducer = sortableListReducerFactory(actions);

export function reducer(state, action): StageState {
	state = listReducer(state, action);
	state = sortableReducer(state, action);
	return state;
}
