import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StageListComponent } from '../container/view/stage-list/stage-list.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'stages', pathMatch: 'full' },
	{ path: 'stages', component: StageListComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StoryRoutingModule { }
