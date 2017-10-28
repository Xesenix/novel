import { ChapterFormComponent } from '../../../component/chapter-form/chapter-form.component';
import { StoryChapter } from '../../../model/story-chapter';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { StoreModule } from '@ngrx/store';

import { reducer as rootReducer } from 'app/reducers';
import { ChapterComponent } from 'story/container/view/chapter/chapter.component';
import { StoryStage } from 'story/model/story-stage';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';

describe('story:ChapterComponent', () => {
	let component: ChapterComponent;
	let fixture: ComponentFixture<ChapterComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ChapterComponent, StageFormComponent],
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
				providers: [
					{
						provide: ActivatedRoute,
						useValue: {
							paramMap: Observable.of({ id: 'ch-1' }),
						},
					},
				],
			}).compileComponents();
		})
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
