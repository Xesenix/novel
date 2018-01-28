import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryLayoutComponent } from 'layout/primary-layout/primary-layout.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'story', pathMatch: 'full' },
	{ path: 'story', component: PrimaryLayoutComponent, loadChildren: 'app/story/story.module#StoryModule' },
	{ path: 'characters', component: PrimaryLayoutComponent, loadChildren: 'app/characters/characters.module#CharactersModule' },
	{ path: 'storage', component: PrimaryLayoutComponent, loadChildren: 'app/storage/storage.module#StorageModule' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
