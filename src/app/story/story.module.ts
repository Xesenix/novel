import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';

import { LayoutModule } from 'layout/layout.module';
import { ChapterFormComponent } from 'story/component/chapter-form/chapter-form.component';
import { StageFormComponent } from 'story/component/stage-form/stage-form.component';
import { ListItemComponent } from 'story/component/stage/list-item/list-item.component';
import { MenuComponent } from 'story/container/menu/menu.component';
import { ChapterComponent } from 'story/container/view/chapter/chapter.component';
import { ChaptersComponent } from 'story/container/view/chapters/chapters.component';
import { StageListComponent } from 'story/container/view/stage-list/stage-list.component';
import { StoryStage } from 'story/model/story-stage';
import { reducer } from 'story/reducers';
import { StoryRoutingModule } from 'story/routing/story-routing.module';

export function provideInitialState() {
	return {
		chapters: [
			{ title: 'Chapter I', id: 'ch-1' },
			{ title: 'Chapter II', id: 'ch-2' },
		],
		stages: [
			{ title: 'Brave new world', content: 'Darkness was lighted by volcanos spewing yellow glowing sulfur.', chapter: 'ch-1' },
			{ title: 'Creatures of darkness', content: 'In shadows of caves lurked creatures born from darkness.', chapter: 'ch-2' },
		]
	};
}
@NgModule({
	imports: [
		CommonModule,
		StoryRoutingModule,
		LayoutModule,
		DragulaModule,
		ReactiveFormsModule,
		StoreModule.forFeature('story', reducer, {
			initialState: provideInitialState
		}),
	],
	declarations: [
		StageListComponent,
		StageFormComponent,
		ChapterComponent,
		ChaptersComponent,
		ChapterFormComponent,
		MenuComponent,
		ListItemComponent,
	],
	exports: [StageListComponent]
})
export class StoryModule { }
