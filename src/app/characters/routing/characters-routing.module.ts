import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterListComponent } from 'characters/container/view/character-list/character-list.component';
import { MenuComponent } from 'characters/container/menu/menu.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'list', pathMatch: 'full' },
	{ path: 'list', component: CharacterListComponent },
	{ path: '', outlet: 'aside', component: MenuComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CharactersRoutingModule {}
