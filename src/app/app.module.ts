import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { handleUndo } from 'ngrx-undo';

import { AppComponent } from 'app/app.component';
import { reducer } from 'app/reducers';
import { AppRoutingModule } from 'app/routing/app-routing.module';
import { CharactersModule } from 'characters/characters.module';
import { PixiService } from 'pixi/pixi.service';
import { StoryModule } from 'story/story.module';

// import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CharactersModule,
		StoryModule,
		StoreModule.forRoot(reducer, {
			metaReducers: [handleUndo],
		}),
		// do not use with @ngrx/router-store (performance issue)
		StoreDevtoolsModule.instrument({
			maxAge: 25,
		}),
		// EffectsModule.forRoot([]),
	],
	providers: [PixiService],
	bootstrap: [AppComponent],
})
export class AppModule {}
