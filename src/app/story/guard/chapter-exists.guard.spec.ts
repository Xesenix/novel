import { TestBed, async, inject } from '@angular/core/testing';

import { ChapterExistsGuard } from './chapter-exists.guard';

describe('ChapterExistsGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ChapterExistsGuard],
		});
	});

	it(
		'should create',
		inject([ChapterExistsGuard], (guard: ChapterExistsGuard) => {
			expect(guard).toBeTruthy();
		})
	);
});
