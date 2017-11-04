import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { RepositoryService } from 'story/service/repository.service';
import { provideInitialState } from 'story/story.module';

describe('RepositoryService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot(rootReducer, {
					initialState: { story: provideInitialState() },
					metaReducers: [undoBehavior(100)],
				}),
			],
			providers: [RepositoryService],
		});
	});

	it(
		'should be created',
		inject([RepositoryService], (service: RepositoryService<{}>) => {
			expect(service).toBeTruthy();
		})
	);
});
