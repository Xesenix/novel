export function listReducerFactory<T>(itemFactory: (state: T[], action: any) => T, actionTypes: { LIST_ADD: string; LIST_REMOVE: string }) {
	return (state: T[] = [], action) => {
		switch (action.type) {
			case actionTypes.LIST_ADD:
				return [...state, itemFactory(state, action)];
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

export function updatableListReducerFactory<T>(itemFactory: (state: T[], action: any) => T, actionTypes: { LIST_ITEM_UPDATE: string }) {
	return (state: T[] = [], action) => {
		switch (action.type) {
			case actionTypes.LIST_ITEM_UPDATE:
				state[action.index] = itemFactory(state, action);
				return state;

			default:
				return state;
		}
	};
}
