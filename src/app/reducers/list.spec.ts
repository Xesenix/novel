import { listReducerFactory, sortableListReducerFactory } from 'app/reducers/list';

describe('app:listReducerFactory', () => {
	[
		{
			LIST_ADD: 'add',
			LIST_REMOVE: 'remove',
		},
		{
			LIST_ADD: 'x',
			LIST_REMOVE: 'y',
		},
	].forEach(({ LIST_ADD, LIST_REMOVE }) => {
		describe(`for LIST_ADD='${LIST_ADD}' and LIST_REMOVE='${LIST_REMOVE}'`, () => {
			const reducer = listReducerFactory(({ name }) => name, { LIST_ADD, LIST_REMOVE });

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
