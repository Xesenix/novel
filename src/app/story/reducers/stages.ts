import { listReducerFactory } from '../../reducers/list';
import StoryStage from '../model/story-stage';
import * as actions from '../actions/stage';

export type StageState = StoryStage[];

const listReducer = listReducerFactory<StoryStage>(({ title, content }) => new StoryStage(title, content), actions);

export function reducer(state, action): StageState {
	return listReducer(state, action);
}
