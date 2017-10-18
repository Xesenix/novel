import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

import { StageListComponent } from './stage-list.component';
import { AddStoryStageAction, RemoveStoryStageAction } from '../../../actions/stage';
import { StoryStage } from '../../../model/story-stage';
import { provideInitialState } from '../../../story.module';
// FIXME: need to decouple module from global state
import { reducer as rootReducer, AppState } from '../../../../reducers';

describe('StageListComponent', () => {
	let component: StageListComponent;
	let fixture: ComponentFixture<StageListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StageListComponent],
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				StoreModule.forRoot(rootReducer, { initialState: { story: {} } }),
			],
			providers: [DragulaService],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StageListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('onStoryStageAdd', () => {
		it('should dispatch AddStoryStageAction', inject([Store], (store: Store<AppState>) => {
			const title = 'title';
			const content = 'content';
			const chapter = 'ch-1';
			spyOn(store, 'dispatch');

			component.onStoryStageAdd({ title, content, chapter });

			expect(store.dispatch).toHaveBeenCalledWith(new AddStoryStageAction(title, content, chapter));
		}));
	});

	describe('onStoryStageRemove', () => {
		it('should dispatch RemoveStoryStageAction', inject([Store], (store: Store<AppState>) => {
			const index = 0;
			spyOn(store, 'dispatch');

			component.onStoryStageRemove(index);

			expect(store.dispatch).toHaveBeenCalledWith(new RemoveStoryStageAction(index));
		}));
	});

	// TODO: test that after start dragging after drop no action is dispatched
});
