import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IndexedListItem } from 'app/reducers/list';
import { reducer as stages, StageState } from 'story/reducers/stages';
import { reducer as chapters, ChaptersState } from 'story/reducers/chapters';
import { StoryChapter } from 'story/model/story-chapter';
import { StoryStage } from 'story/model/story-stage';

export interface StoryModuleState {
	stages: StageState;
	chapters: ChaptersState;
}

export const reducer: ActionReducerMap<StoryModuleState> = {
	stages,
	chapters,
};

// TODO: now module reducer needs to know where it will be mounted in global state, find a way to decouple it from global state knowledge
export const selectFeatureStory = createFeatureSelector<StoryModuleState>('story'); // argument passed here is path from root state
export const selectFeatureStages = createSelector(selectFeatureStory, (store: StoryModuleState) => store.stages.list);
export const selectFeatureStagesSortableList = createSelector(selectFeatureStages, (stages: StoryStage[]) => {
	// console.log('update stages list');
	return stages.map((stage: StoryStage, index: number) => new IndexedListItem<StoryStage>(stage, index));
});
export const selectFeatureChapters = createSelector(selectFeatureStory, (store: StoryModuleState) => store.chapters);
export const selectFeatureChaptersSortableList = createSelector(selectFeatureChapters, (chapters: StoryChapter[]) => {
	// console.log('update chapters list');
	return chapters.map((chapter: StoryChapter, index: number) => new IndexedListItem<StoryChapter>(chapter, index));
});
