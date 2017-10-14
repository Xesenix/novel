import { listReducerFactory } from './list';

describe('listReducerFactory', () => {
	[{
		LIST_ADD: 'add',
		LIST_REMOVE: 'remove',
	}, {
		LIST_ADD: 'x',
		LIST_REMOVE: 'y',
	}].forEach(({ LIST_ADD, LIST_REMOVE }) => {
		describe(`for LIST_ADD='${LIST_ADD}' and LIST_REMOVE='${LIST_REMOVE}'`, () => {
			const reducer = listReducerFactory(({ name }) => name, { LIST_ADD, LIST_REMOVE });

			[{
				name: 'a',
				state: [],
				expected: ['a']
			}, {
				name: 'a',
				state: ['a', 'a'],
				expected: ['a', 'a', 'a']
			}, {
				name: 'zxc',
				state: ['q', 'w'],
				expected: ['q', 'w', 'zxc']
			}].forEach(({ name, state, expected }) => {
				it(`should create reducer that handles LIST_ADD action item: ${name}, to list: [${state.join(', ')}]`, () => {
					const action = {
						type: LIST_ADD,
						name,
					};

					const result = reducer(state, action);

					expect(result).toEqual(expected);
				});
			});

			[{
				index: 0,
				state: ['a', 'b', 'c'],
				expected: ['b', 'c']
			}, {
				index: 1,
				state: ['x', 'y', 'z', 'q', 't'],
				expected: ['x', 'z', 'q', 't']
			}, {
				index: 2,
				state: ['asd', 'zxc', 'qwe'],
				expected: ['asd', 'zxc']
			}, {
				index: 2,
				state: ['A', 'A', 'A'],
				expected: ['A', 'A']
			}, {
				index: 3,
				state: ['A', 'B'],
				expected: ['A', 'B']
			}].forEach(({ index, state, expected }) => {
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
