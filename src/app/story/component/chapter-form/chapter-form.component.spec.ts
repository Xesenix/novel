import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { reducer as rootReducer, AppState } from 'app/reducers';
import { ChapterFormComponent } from 'story/component/chapter-form/chapter-form.component';

describe('story:ChapterFormComponent', () => {
	let component: ChapterFormComponent;
	let fixture: ComponentFixture<ChapterFormComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ChapterFormComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [StoreModule.forRoot(rootReducer, { initialState: { story: {} } })],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChapterFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
