import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { reducer as rootReducer, AppState } from 'app/reducers';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';

describe('story:StageFormComponent', () => {
	let component: StageFormComponent;
	let fixture: ComponentFixture<StageFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StageFormComponent],
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				StoreModule.forRoot(rootReducer, { initialState: { story: {} } }),
			],
			providers: [],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StageFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
