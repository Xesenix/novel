import { TestBed, async, inject } from '@angular/core/testing';

import { LayoutResolver } from 'app/service/layout.resolver';

describe('app:LayoutResolver', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LayoutResolver],
		});
	});

	it(
		'should create',
		inject([LayoutResolver], (resolver: LayoutResolver) => {
			expect(resolver).toBeTruthy();
		})
	);
});
