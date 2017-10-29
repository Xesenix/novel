import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { flatMap, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { AddStoryStageAction } from 'story/actions/stage';
import { StoryStage } from 'story/model/story-stage';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryModuleState, selectFeatureStages, selectFeatureChapters } from 'story/reducers';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';

@Component({
	selector: 'xes-chapter',
	templateUrl: './chapter.component.html',
	styleUrls: ['./chapter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit {
	@ViewChild('addForm') addForm: StageFormComponent;

	templateStage: ReplaySubject<StoryStage>;
	stages: Observable<StoryStage[]>;
	chapter: StoryChapter;
	chapters: Observable<StoryChapter[]>;
	chapterStages: Observable<StoryStage[]>;

	constructor(private route: ActivatedRoute, private store: Store<StoryModuleState>) {}

	ngOnInit() {
		this.templateStage = new ReplaySubject();
		this.chapters = this.store.select(selectFeatureChapters);
		this.stages = this.store.select(selectFeatureStages);

		const chapterId$ = this.route.paramMap.pipe(map(params => params.get('id')));

		const chapterChange$ = combineLatest(this.chapters, chapterId$, (chapters: StoryChapter[], chapterId: string) =>
			chapters.find((chapter: StoryChapter) => chapter.id === chapterId)
		);

		this.chapterStages = combineLatest(this.stages, chapterId$, (stages: StoryStage[], chapterId: string) =>
			stages.filter((stage: StoryStage) => stage.chapter === chapterId)
		);

		chapterChange$.subscribe(chapter => {
			this.chapter = chapter;
			const templateStage = this.addForm.valueChange.getValue();
			this.templateStage.next(new StoryStage(templateStage.id, templateStage.title, templateStage.content, chapter.id));
		});
	}

	stageListItemIdentity(index: number, stage: StoryStage) {
		return `${index}:${stage.id}`;
	}

	add() {
		this.stageAdd(this.addForm.valueChange.getValue());
	}

	stageAdd({ title, content, chapter }) {
		this.store.dispatch(new AddStoryStageAction(title, content, chapter));
	}
}
