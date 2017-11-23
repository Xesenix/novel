import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'story', pathMatch: 'full' },
	{ path: 'story', loadChildren: 'app/story/story.module#StoryModule' },
	{ path: 'characters', loadChildren: 'app/characters/characters.module#CharactersModule' },
	{ path: 'storage', loadChildren: 'app/storage/storage.module#StorageModule' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
