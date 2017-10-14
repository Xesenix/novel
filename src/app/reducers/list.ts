export function listReducerFactory<T>(itemFactory: (any) => T, actionTypes: { LIST_ADD: string, LIST_REMOVE: string }) {
	return (state: T[] = [], action) => {
		switch (action.type) {
			case actionTypes.LIST_ADD:
				return [...state, itemFactory(action)];
			case actionTypes.LIST_REMOVE:
				return state.filter((el, index) => index !== action.index);
			default:
				return state;
		}
	};
}
