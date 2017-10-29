import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterExistsGuard } from 'story/guard/chapter-exists.guard';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';

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
					initialState: {
						story: {
							chapters: <StoryChapter[]>[{ title: 'Chapter I', id: 'ch-1' }, { title: 'Chapter II', id: 'ch-2' }],
							stages: <StoryStage[]>[
								{ id: '0', title: 'Brave new world', content: 'Darkness was lighted by volcanos spewing yellow glowing sulfur.', chapter: 'ch-1' },
								{ id: '1', title: 'Creatures of darkness', content: 'In shadows of caves lurked creatures born from darkness.', chapter: 'ch-2' },
								{ id: '2', title: 'Endless void', content: "When you look deep into void it's fills your mind with emptiness.", chapter: 'ch-2' },
							],
						},
					},
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
