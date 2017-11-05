import { TestBed, inject } from '@angular/core/testing';

import { RendererService } from './renderer.service';

describe('pixi:RendererService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RendererService],
		});
	});

	it(
		'should be created',
		inject([RendererService], (service: RendererService) => {
			expect(service).toBeTruthy();
		})
	);
});
