import { listReducerFactory, sortableListReducerFactory, updatableListReducerFactory } from '../../reducers/list';
import { StoryStage } from '../model/story-stage';
import * as actions from '../actions/stage';

export type StageState = StoryStage[];

const itemFactory = ({ title, content, chapter }) => new StoryStage(title, content, chapter);
const listReducer = listReducerFactory<StoryStage>(itemFactory, actions);
const sortableReducer = sortableListReducerFactory<StoryStage>(actions);
const updateReducer = updatableListReducerFactory<StoryStage>(itemFactory, actions);

export function reducer(state, action): StageState {
	state = listReducer(state, action);
	state = sortableReducer(state, action);
	state = updateReducer(state, action);
	return state;
}
