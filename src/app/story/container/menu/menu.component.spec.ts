import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { undoBehavior } from 'xes-ngrx-undo';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterMenuComponent } from 'story/component/chapter-menu/chapter-menu.component';
import { MenuComponent } from 'story/container/menu/menu.component';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';
import { provideInitialState } from 'story/story.module';

describe('story:MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [MenuComponent, ChapterMenuComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [
					StoreModule.forRoot(rootReducer, {
						initialState: { story: provideInitialState() },
						metaReducers: [undoBehavior(100)],
					}),
				],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
