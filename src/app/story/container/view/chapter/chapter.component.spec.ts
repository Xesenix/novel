import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { ChapterComponent } from 'story/container/view/chapter/chapter.component';
import { provideInitialState } from 'story/story.module';

describe('story:ChapterComponent', () => {
	let component: ChapterComponent;
	let fixture: ComponentFixture<ChapterComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ChapterComponent, StageFormComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [
					NoopAnimationsModule,
					StoreModule.forRoot(rootReducer, {
						initialState: { story: provideInitialState() },
						metaReducers: [undoBehavior(100)],
					}),
				],
				providers: [
					{
						provide: ActivatedRoute,
						useValue: {
							paramMap: Observable.of({
								id: 'ch-1',
								get: function(key) {
									return this[key];
								},
							}),
						},
					},
				],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChapterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
