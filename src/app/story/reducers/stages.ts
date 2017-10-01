import StoryStage from '../model/story-stage';
import * as actions from '../actions/stage';

export type StageState = StoryStage[];

const initialState: StageState = [];

export function reducer(state: StageState = initialState, action: actions.Actions): StageState {
	switch (action.type) {
		case actions.ADD_STAGE: {
			return [...state, new StoryStage(action.title, action.content)];
		}

		case actions.REMOVE_STAGE: {
			return state.filter((el, index) => index !== action.index);
		}

		default:
			break;
	}
	return state;
}
