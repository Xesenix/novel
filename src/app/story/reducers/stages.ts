import StoryStage from '../model/story-stage';
import * as stage from '../actions/stage';

export type State = StoryStage[];

const initialState: State = [];

export function reducer(state: State = initialState, action: stage.Actions): State {
	switch (action.type) {
		case stage.ADD_STAGE: {
			return [...state, new StoryStage(action.title, action.content)];
		}

		default:
			break;
	}
	return state;
}

export const getStates = (state) => state.stages;
