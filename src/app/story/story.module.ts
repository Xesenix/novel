import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';

import { StageFormComponent } from './component/stage-form/stage-form.component';
import { StageListComponent } from './container/view/stage-list/stage-list.component';
import { StoryRoutingModule } from './routing/story-routing.module';
import { StoryStage } from './model/story-stage';
import { reducer } from './reducers';
import { ChapterComponent } from './container/view/chapter/chapter.component';
import { ChaptersComponent } from './container/view/chapters/chapters.component';
import { ChapterFormComponent } from './component/chapter-form/chapter-form.component';
import { MenuComponent } from './container/menu/menu.component';
import { LayoutModule } from '../layout/layout.module';
import { ListItemComponent } from './component/stage/list-item/list-item.component';

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
