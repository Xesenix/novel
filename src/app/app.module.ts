import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule  } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app.routing.module';
import { CharactersModule } from './characters/characters.module';
import { StoryModule } from './story/story.module';
import { AppComponent } from './app.component';
import { reducer } from './story/reducers';
import StoryStage from './story/model/story-stage';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CharactersModule,
		StoreModule.forRoot(reducer, {
			initialState: {
				stages: [
					new StoryStage('Brave new world', 'Darkness was lighted by volcanos spewing yellow glowing sulfur.'),
					new StoryStage('Creatures of darkness', 'In shadows of caves lurked creatures born from darkness.'),
				]
			}
		}),
		StoreDevtoolsModule.instrument({
		 	maxAge: 25
		}),
		// EffectsModule.forRoot([]),
		StoryModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
