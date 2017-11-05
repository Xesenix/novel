import { TestBed, inject } from '@angular/core/testing';

import { PixiService } from 'pixi/pixi.service';
import { RendererService } from 'pixi/renderer.service';

describe('pixi:PixiService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PixiService, RendererService],
		});
	});

	it(
		'should be created',
		inject([PixiService], (service: PixiService) => {
			expect(service).toBeTruthy();
		})
	);
});
