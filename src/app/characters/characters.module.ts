import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './container/view/character-list/character-list.component';
import { CharactersRoutingModule } from './routing/characters-routing.module';

@NgModule({
	imports: [
		CommonModule,
		CharactersRoutingModule,
	],
	declarations: [CharacterListComponent]
})
export class CharactersModule { }
