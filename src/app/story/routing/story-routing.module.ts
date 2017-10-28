import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaptersComponent } from 'story/container/view/chapters/chapters.component';
import { StageListComponent } from 'story/container/view/stage-list/stage-list.component';
import { ChapterComponent } from 'story/container/view/chapter/chapter.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'stages', pathMatch: 'full' },
	{ path: 'stages', component: StageListComponent },
	{ path: 'chapter', redirectTo: 'chapter/list', pathMatch: 'full' },
	{ path: 'chapter/list', component: ChaptersComponent },
	{ path: 'chapter/item/:id', component: ChapterComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StoryRoutingModule {}
