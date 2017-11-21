import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'story', pathMatch: 'full' },
	{ path: 'story', loadChildren: 'story/story.module#StoryModule' },
	{ path: 'characters', loadChildren: 'characters/characters.module#CharactersModule' },
	{ path: 'storage', loadChildren: 'storage/storage.module#StorageModule' },
];

@NgModule({
	exports: [RouterModule],
})
export class AppRoutingModule {}
