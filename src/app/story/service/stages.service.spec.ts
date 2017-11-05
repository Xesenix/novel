import { TestBed, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer, AppState } from 'app/reducers';
import { AddStoryStageAction, RemoveStoryStageAction } from 'story/actions/stage';
import { StagesService } from 'story/service/stages.service';
import { provideInitialState } from 'story/story.module';

describe('story:StagesService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot(rootReducer, {
					initialState: { story: provideInitialState() },
					metaReducers: [undoBehavior(100)],
				}),
			],
			providers: [StagesService],
		});
	});

	it(
		'should be created',
		inject([StagesService], (service: StagesService) => {
			expect(service).toBeTruthy();
		})
	);

	describe('add', () => {
		it(
			'should dispatch AddStoryStageAction',
			inject([Store, StagesService], (store: Store<AppState>, service: StagesService) => {
				const title = 'title';
				const content = 'content';
				const chapter = 'ch-1';
				spyOn(store, 'dispatch');

				service.add({ title, content, chapter });

				expect(store.dispatch).toHaveBeenCalledWith(new AddStoryStageAction(title, content, chapter));
			})
		);
	});

	describe('remove', () => {
		it(
			'should dispatch RemoveStoryStageAction',
			inject([Store, StagesService], (store: Store<AppState>, service: StagesService) => {
				const index = 0;
				spyOn(store, 'dispatch');

				service.remove(index);

				expect(store.dispatch).toHaveBeenCalledWith(new RemoveStoryStageAction(index));
			})
		);
	});
});
