import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './container/view/character-list/character-list.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [CharacterListComponent]
})
export class CharactersModule { }
