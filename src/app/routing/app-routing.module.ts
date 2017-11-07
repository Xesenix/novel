import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutResolver } from 'app/resolver/layout.resolver';

export const routes: Routes = [
	{ path: '', redirectTo: 'story', pathMatch: 'full' },
	{ path: 'story', loadChildren: 'story/story.module#StoryModule', data: { title: 'Novel' }, resolve: { layout: LayoutResolver } },
	{ path: 'characters', loadChildren: 'characters/characters.module#CharactersModule', data: { title: 'Novel' } },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
