import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterListItemComponent } from 'story/component/chapter-list-item/chapter-list-item.component';
import { StagesService } from 'story/service/stages.service';
import { provideInitialState } from 'story/story.module';

describe('ChapterListItemComponent', () => {
	let component: ChapterListItemComponent;
	let fixture: ComponentFixture<ChapterListItemComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ChapterListItemComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [
					NoopAnimationsModule,
					StoreModule.forRoot(rootReducer, {
						initialState: { story: provideInitialState() },
						metaReducers: [undoBehavior(100)],
					}),
				],
				providers: [DragulaService, StagesService],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChapterListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
