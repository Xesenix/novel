import { StageListComponent } from './story/container/view/stage-list/stage-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: '', redirectTo: 'stages', pathMatch: 'full' },
	{ path: 'stages', component: StageListComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule],
})
export class AppRoutingModule { }
