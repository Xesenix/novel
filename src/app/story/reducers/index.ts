import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { reducer as stages, StageState } from './stages';
import { reducer as chapters, ChaptersState } from './chapters';

export interface StoryModuleState {
	stages: StageState;
	chapters: ChaptersState;
}

export const reducer: ActionReducerMap<StoryModuleState> = {
	stages,
	chapters
};

// TODO: now module reducer needs to know where it will be mounted in global state, find a way to decople it from global state knowledge
export const selectFeatureStory = createFeatureSelector<StoryModuleState>('story'); // argument passed here is path from root state
export const selectFeatureStages = createSelector(selectFeatureStory, (store: StoryModuleState) => store.stages);
export const selectFeatureChapters = createSelector(selectFeatureStory, (store: StoryModuleState) => store.chapters);
