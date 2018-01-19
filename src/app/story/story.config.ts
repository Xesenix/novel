import { InjectionToken } from '@angular/core';

export interface StoryModuleConfig {
	name?: string;
	showDescription?: boolean;
}

export const STORY_MODULE_CONFIG = new InjectionToken<StoryModuleConfig>('StoryModuleConfig');

export const storyModuleDefaultConfig: StoryModuleConfig = {
	name: 'module-config',
	showDescription: true,
};
