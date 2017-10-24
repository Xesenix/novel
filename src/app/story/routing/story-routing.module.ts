import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaptersComponent } from 'story/container/view/chapters/chapters.component';
import { StageListComponent } from 'story/container/view/stage-list/stage-list.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'stages', pathMatch: 'full' },
	{ path: 'chapters', component: ChaptersComponent },
	{ path: 'stages', component: StageListComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StoryRoutingModule {}
