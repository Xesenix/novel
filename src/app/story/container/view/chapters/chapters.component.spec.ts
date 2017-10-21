import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

import { reducer as rootReducer, AppState } from 'app/reducers';
import { ChaptersComponent } from 'story/container/view/chapters/chapters.component';

describe('story:ChaptersComponent', () => {
	let component: ChaptersComponent;
	let fixture: ComponentFixture<ChaptersComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChaptersComponent],
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				StoreModule.forRoot(rootReducer, { initialState: { story: {} } }),
			],
			providers: [DragulaService],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChaptersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
