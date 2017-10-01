import { CharacterListComponent } from './characters/container/view/character-list/character-list.component';
import { routes as storyRoutes } from './story/story.routing.module';
import { StageListComponent } from './story/container/view/stage-list/stage-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'story', pathMatch: 'full' },
	{ path: 'story', children: storyRoutes },
	{ path: 'characters', component: CharacterListComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule],
})
export class AppRoutingModule { }
