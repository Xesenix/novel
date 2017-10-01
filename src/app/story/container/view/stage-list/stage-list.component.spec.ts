import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { StageListComponent } from './stage-list.component';
import { AddStoryStageAction } from '../../../actions/stage';
import { reducer, State } from '../../../reducers';
import StoryStage from '../../../model/story-stage';

describe('StageListComponent', () => {
	let component: StageListComponent;
	let fixture: ComponentFixture<StageListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StageListComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			imports: [
				StoreModule.forRoot(reducer, {
					initialState: {
						stages: [
							new StoryStage('Brave new world', 'Darkness was lighted by volcanos spewing yellow glowing sulfur.'),
							new StoryStage('Creatures of darkness', 'In shadows of caves lurked creatures born from darkness.'),
						]
					}
				}),
			],
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
		it('should dispatch AddStoryStageAction', inject([Store], (store: Store<State>) => {
			const title = 'title';
			const content = 'content';
			spyOn(store, 'dispatch');
			component.onStoryStageAdd({ title, content });

			expect(store.dispatch).toHaveBeenCalledWith(new AddStoryStageAction(title, content));
		}));
	});
});
