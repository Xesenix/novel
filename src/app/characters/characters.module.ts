import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './container/menu/menu.component';
import { CharacterListComponent } from './container/view/character-list/character-list.component';
import { CharactersRoutingModule } from './routing/characters-routing.module';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
	imports: [
		CommonModule,
		CharactersRoutingModule,
		LayoutModule,
	],
	declarations: [CharacterListComponent, MenuComponent]
})
export class CharactersModule { }
