import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StageListComponent } from './container/view/stage-list/stage-list.component';

const routes: Routes = [
	{ path: 'stages', component: StageListComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StoryRoutingModule { }
