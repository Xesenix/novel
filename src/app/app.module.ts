import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule  } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { CharactersModule } from './characters/characters.module';
import { reducer } from './reducers';
import { StoryModule } from './story/story.module';
import { PixiModule } from './pixi/pixi.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		PixiModule,
		AppRoutingModule,
		CharactersModule,
		StoryModule,
		StoreModule.forRoot(reducer),
		// do not use with @ngrx/router-store (performance issue)
		StoreDevtoolsModule.instrument({
		 	maxAge: 25
		}),
		// EffectsModule.forRoot([]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
