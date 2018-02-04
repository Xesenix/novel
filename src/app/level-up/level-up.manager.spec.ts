import { TestBed, inject } from '@angular/core/testing';

import { LevelUpManager } from './level-up.manager';

describe('LevelUpManager', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LevelUpManager],
		});
	});

	it(
		'should be created',
		inject([LevelUpManager], (service: LevelUpManager) => {
			expect(service).toBeTruthy();
		}),
	);
});
