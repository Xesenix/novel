import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryLayoutComponent } from 'layout/primary-layout/primary-layout.component';
import { ToolsComponent } from 'app/tools/tools.component';

export const routes: Routes = [
	{
		path: '',
		component: PrimaryLayoutComponent,
		children: [
			{ path: '', redirectTo: 'story', pathMatch: 'full' },
			{ path: '', outlet: 'aside-tools', component: ToolsComponent },
			{ path: 'story', loadChildren: 'app/story/story.module#StoryModule' },
			{ path: 'characters', loadChildren: 'app/characters/characters.module#CharactersModule' },
			{ path: 'storage', loadChildren: 'app/storage/storage.module#StorageModule' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
