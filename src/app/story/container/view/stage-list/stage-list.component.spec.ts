import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Observable } from 'rxjs/Observable';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { StageListComponent } from 'story/container/view/stage-list/stage-list.component';
import { StagesService } from 'story/service/stages.service';
import { provideInitialState } from 'story/story.module';

// FIXME: need to decouple module from global state

describe('story:StageListComponent', () => {
	let component: StageListComponent;
	let fixture: ComponentFixture<StageListComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [StageListComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [
					NoopAnimationsModule,
					StoreModule.forRoot(rootReducer, {
						initialState: { story: provideInitialState() },
						metaReducers: [undoBehavior(100)],
					}),
				],
				providers: [
					DragulaService,
					StagesService,
					{
						provide: ActivatedRoute,
						useValue: {
							data: Observable.of({}),
						},
					},
				],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(StageListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// TODO: test that after start dragging after drop no action is dispatched
});
