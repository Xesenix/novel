import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterMenuComponent } from 'story/component/chapter-menu/chapter-menu.component';
import { MenuComponent } from 'story/container/menu/menu.component';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';

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
						initialState: {
							story: {
								chapters: <StoryChapter[]>[{ title: 'Chapter I', id: 'ch-1' }, { title: 'Chapter II', id: 'ch-2' }],
								stages: <StoryStage[]>[
									{ id: '0', title: 'Brave new world', content: 'Darkness was lighted by volcanos spewing yellow glowing sulfur.', chapter: 'ch-1' },
									{ id: '1', title: 'Creatures of darkness', content: 'In shadows of caves lurked creatures born from darkness.', chapter: 'ch-2' },
									{ id: '2', title: 'Endless void', content: "When you look deep into void it's fills your mind with emptiness.", chapter: 'ch-2' },
								],
							},
						},
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
