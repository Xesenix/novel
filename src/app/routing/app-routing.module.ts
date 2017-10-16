import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { CharacterListComponent } from '../characters/container/view/character-list/character-list.component';
import { StageListComponent } from '../story/container/view/stage-list/stage-list.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'story', pathMatch: 'full' },
	{ path: 'story', loadChildren: 'app/story/story.module#StoryModule' },
	{ path: 'characters', loadChildren: 'app/characters/characters.module#CharactersModule' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule { }