import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuComponent } from 'characters/container/menu/menu.component';
import { CharacterListComponent } from 'characters/container/view/character-list/character-list.component';
import { CharactersRoutingModule } from 'characters/routing/characters-routing.module';
import { LayoutModule } from 'layout/layout.module';

@NgModule({
	imports: [CommonModule, CharactersRoutingModule, LayoutModule],
	declarations: [CharacterListComponent, MenuComponent],
})
export class CharactersModule {}
