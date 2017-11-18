import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterExistsGuard } from 'story/guard/chapter-exists.guard';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';
import { provideInitialState } from 'story/story.module';

describe('story:ChapterExistsGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ChapterExistsGuard,
				{
					provide: Router,
					useValue: {
						navigate: () => {},
					},
				},
			],
			imports: [
				StoreModule.forRoot(rootReducer, {
					initialState: { story: provideInitialState() },
					metaReducers: [undoBehavior(100)],
				}),
			],
		});
	});

	it(
		'should create',
		inject([ChapterExistsGuard], (guard: ChapterExistsGuard) => {
			expect(guard).toBeTruthy();
		})
	);
});
