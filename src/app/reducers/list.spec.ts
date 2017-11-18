import { listReducerFactory, sortableListReducerFactory } from 'app/reducers/list';

describe('app:listReducerFactory', () => {
	[
		{
			LIST_ADD: 'add',
			LIST_ADD_AT: 'addAt',
			LIST_REMOVE: 'remove',
		},
		{
			LIST_ADD: 'x',
			LIST_ADD_AT: 'z',
			LIST_REMOVE: 'y',
		},
	].forEach(({ LIST_ADD, LIST_ADD_AT, LIST_REMOVE }) => {
		describe(`for LIST_ADD='${LIST_ADD}', LIST_ADD_AT='${LIST_ADD_AT}' and LIST_REMOVE='${LIST_REMOVE}'`, () => {
			const reducer = listReducerFactory((list, { name }) => name, { LIST_ADD, LIST_ADD_AT, LIST_REMOVE });

			[
				{
					name: 'a',
					state: [],
					expected: ['a'],
				},
				{
					name: 'a',
					state: ['a', 'a'],
					expected: ['a', 'a', 'a'],
				},
				{
					name: 'zxc',
					state: ['q', 'w'],
					expected: ['q', 'w', 'zxc'],
				},
			].forEach(({ name, state, expected }) => {
				it(`should create reducer that handles LIST_ADD action item: ${name}, to list: [${state.join(', ')}]`, () => {
					const action = {
						type: LIST_ADD,
						name,
					};

					const result = reducer(state, action);

					expect(result).toEqual(expected);
				});
			});

			[
				{
					index: 0,
					name: 'a',
					state: [],
					expected: ['a'],
				},
				{
					index: 0,
					name: 'x',
					state: ['a', 'a'],
					expected: ['x', 'a', 'a'],
				},
				{
					index: 0,
					name: 'zxc',
					state: ['q', 'w'],
					expected: ['zxc', 'q', 'w'],
				},
				{
					index: 1,
					name: 'a',
					state: [],
					expected: ['a'],
				},
				{
					index: 1,
					name: 'x',
					state: ['a', 'b'],
					expected: ['a', 'x', 'b'],
				},
				{
					index: 1,
					name: 'zxc',
					state: ['q', 'w'],
					expected: ['q', 'zxc', 'w'],
				},
				{
					index: 2,
					name: 'a',
					state: [],
					expected: ['a'],
				},
				{
					index: 2,
					name: 'x',
					state: ['a', 'a'],
					expected: ['a', 'a', 'x'],
				},
				{
					index: 2,
					name: 'zxc',
					state: ['q', 'w'],
					expected: ['q', 'w', 'zxc'],
				},
			].forEach(({ index, name, state, expected }) => {
				it(`should create reducer that handles LIST_ADD_AT action item: ${name} at: ${index}, to list: [${state.join(', ')}]`, () => {
					const action = {
						type: LIST_ADD_AT,
						index,
						name,
					};

					const result = reducer(state, action);

					expect(result).toEqual(expected);
				});
			});

			[
				{
					index: 0,
					state: ['a', 'b', 'c'],
					expected: ['b', 'c'],
				},
				{
					index: 1,
					state: ['x', 'y', 'z', 'q', 't'],
					expected: ['x', 'z', 'q', 't'],
				},
				{
					index: 2,
					state: ['asd', 'zxc', 'qwe'],
					expected: ['asd', 'zxc'],
				},
				{
					index: 2,
					state: ['A', 'A', 'A'],
					expected: ['A', 'A'],
				},
				{
					index: 3,
					state: ['A', 'B'],
					expected: ['A', 'B'],
				},
			].forEach(({ index, state, expected }) => {
				it(`should create reducer that handles LIST_REMOVE action index: ${index}, list: [${state.join(', ')}]`, () => {
					const action = {
						type: LIST_REMOVE,
						index,
					};

					const result = reducer(state, action);

					expect(result).toEqual(expected);
				});
			});
		});
	});
});

describe('app:sortableListReducerFactory', () => {
	const LIST_ITEM_MOVE = 'move';
	const reducer = sortableListReducerFactory({ LIST_ITEM_MOVE });
	[
		{
			from: 0,
			to: 0,
			state: ['a', 'b'],
			expected: ['a', 'b'],
		},
		{
			from: 1,
			to: 1,
			state: ['a', 'b'],
			expected: ['a', 'b'],
		},
		{
			from: 0,
			to: 1,
			state: ['a', 'b'],
			expected: ['b', 'a'],
		},
		{
			from: 0,
			to: 1,
			state: ['a', 'b', 'c'],
			expected: ['b', 'a', 'c'],
		},
		{
			from: 0,
			to: 2,
			state: ['a', 'b', 'c'],
			expected: ['b', 'c', 'a'],
		},
		{
			from: 1,
			to: 2,
			state: ['a', 'b', 'c'],
			expected: ['a', 'c', 'b'],
		},
		{
			from: 1,
			to: 2,
			state: ['a', 'b', 'c', 'd'],
			expected: ['a', 'c', 'b', 'd'],
		},
		{
			from: 1,
			to: 3,
			state: ['a', 'b', 'c', 'd'],
			expected: ['a', 'c', 'd', 'b'],
		},
		{
			from: 2,
			to: 5,
			state: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
			expected: ['a', 'b', 'd', 'e', 'f', 'c', 'g'],
		},
		{
			from: 1,
			to: 0,
			state: ['a', 'b'],
			expected: ['b', 'a'],
		},
		{
			from: 1,
			to: 0,
			state: ['a', 'b', 'c'],
			expected: ['b', 'a', 'c'],
		},
		{
			from: 2,
			to: 0,
			state: ['a', 'b', 'c'],
			expected: ['c', 'a', 'b'],
		},
		{
			from: 2,
			to: 1,
			state: ['a', 'b', 'c'],
			expected: ['a', 'c', 'b'],
		},
		{
			from: 2,
			to: 1,
			state: ['a', 'b', 'c', 'd'],
			expected: ['a', 'c', 'b', 'd'],
		},
		{
			from: 3,
			to: 1,
			state: ['a', 'b', 'c', 'd'],
			expected: ['a', 'd', 'b', 'c'],
		},
		{
			from: 5,
			to: 2,
			state: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
			expected: ['a', 'b', 'f', 'c', 'd', 'e', 'g'],
		},
	].forEach(({ from, to, state, expected }) => {
		it(`should sort: [${state.join(', ')}] ${from} => ${to}`, () => {
			const action = {
				type: LIST_ITEM_MOVE,
				from,
				to,
			};

			const result = reducer(state, action);

			expect(result.length).toEqual(expected.length);
			expect(result).toEqual(expected);
		});
	});
});
