import { listReducerFactory, sortableListReducerFactory, updatableListReducerFactory } from 'app/reducers/list';
import { StoryStage } from 'story/model/story-stage';
import * as actions from 'story/actions/stage';
import { Actions, LIST_ADD, LIST_ITEM_UPDATE, LIST_ACTIONS } from 'story/actions/stage';

export interface StageState {
	versions: { [id: string]: StoryStage[] };
	list: StoryStage[];
}

const itemFactory = (list: StoryStage[], { id = null, title, content, chapter }: { id: string; title: string; content: string; chapter: string }) =>
	new StoryStage(id !== null ? id : list.length.toString(), title, content, chapter);
const listReducer = listReducerFactory<StoryStage>(itemFactory, actions);
const sortableListReducer = sortableListReducerFactory<StoryStage>(actions);
const updateListItemReducer = updatableListReducerFactory<StoryStage>(itemFactory, actions);

const listItemReducer = (state: StageState, action: any) => {
	switch (action.type) {
		case LIST_ITEM_UPDATE:
			const item = state.list[action.index];
			const versions = state.versions[action.id] || [];
			state.versions[action.id] = [...versions, item];
			break;
	}

	return state;
};

export function reducer(state: StageState, action: Actions): StageState {
	state = listItemReducer(state, action);
	if (LIST_ACTIONS.indexOf(action.type) > -1) {
		let list = state.list;
		list = listReducer(list, action);
		list = sortableListReducer(list, action);
		list = updateListItemReducer(list, action);
		state = {
			...state,
			list: [...list],
		};
	}
	return state;
}
