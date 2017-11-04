import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterService } from 'story/service/chapter.service';
import { provideInitialState } from 'story/story.module';

describe('ChapterService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot(rootReducer, {
					initialState: { story: provideInitialState() },
					metaReducers: [undoBehavior(100)],
				}),
			],
			providers: [ChapterService],
		});
	});

	it(
		'should be created',
		inject([ChapterService], (service: ChapterService) => {
			expect(service).toBeTruthy();
		})
	);
});
