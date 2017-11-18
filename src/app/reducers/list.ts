export function listReducerFactory<T>(
	itemFactory: (state: T[], action: any) => T,
	actionTypes: {
		LIST_ADD: string;
		LIST_ADD_AT: string;
		LIST_REMOVE: string;
	}
) {
	return (state: T[] = [], action) => {
		switch (action.type) {
			case actionTypes.LIST_ADD:
				return [...state, itemFactory(state, action)];
			case actionTypes.LIST_ADD_AT:
				return action.index > 0
					? action.index < state.length
						? [...state.slice(0, action.index), itemFactory(state, action), ...state.slice(action.index)]
						: [...state.slice(0, action.index), itemFactory(state, action)]
					: action.index < state.length ? [itemFactory(state, action), ...state] : [itemFactory(state, action)];
			case actionTypes.LIST_REMOVE:
				return state.filter((el, index) => index !== action.index);
			default:
				return state;
		}
	};
}

export function sortableListReducerFactory<T>(actionTypes: { LIST_ITEM_MOVE: string }) {
	return (state: T[] = [], action) => {
		switch (action.type) {
			case actionTypes.LIST_ITEM_MOVE: {
				const { from, to } = action;

				return from === to
					? [...state]
					: from < to
						? from > 0
							? to < state.length - 1
								? [...state.slice(0, from), ...state.slice(from + 1, to + 1), state[from], ...state.slice(to + 1)]
								: [...state.slice(0, from), ...state.slice(from + 1, to + 1), state[from]]
							: to < state.length - 1
								? [...state.slice(from + 1, to + 1), state[from], ...state.slice(to + 1)]
								: [...state.slice(from + 1, to + 1), state[from]]
						: to > 0
							? from < state.length - 1
								? [...state.slice(0, to), state[from], ...state.slice(to, from), ...state.slice(from + 1)]
								: [...state.slice(0, to), state[from], ...state.slice(to, from)]
							: from < state.length - 1 ? [state[from], ...state.slice(to, from), ...state.slice(from + 1)] : [state[from], ...state.slice(to, from)];
			}
			default:
				return state;
		}
	};
}

export function updatableListReducerFactory<T>(
	itemReducer: (state: T[], action: any) => T,
	actionTypes: {
		LIST_ITEM_UPDATE: string;
	}
) {
	return (state: T[] = [], action) => {
		switch (action.type) {
			case actionTypes.LIST_ITEM_UPDATE:
				state[action.index] = itemReducer(state, action);
				return [...state];

			default:
				return state;
		}
	};
}

export class IndexedListItem<T> {
	constructor(public data: T, public index: number) {}
}

export class GroupedListItem<T> {
	constructor(public data: T, public group: string) {}
}
