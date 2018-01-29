import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { undoBehavior } from 'xes-ngrx-undo';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppComponent } from 'app/app.component';
import { reducer } from 'app/reducers';
import { AppRoutingModule } from 'app/routing/app-routing.module';
import { CharactersModule } from 'characters/characters.module';
import { PixiModule } from 'pixi/pixi.module';
import { STORY_MODULE_CONFIG, storyModuleDefaultConfig } from 'story/story.config';
import { StorageModule } from 'storage/storage.module';
import { StoryModule } from 'story/story.module';
import { environment } from 'environments/environment';

// import { EffectsModule } from '@ngrx/effects';

const undoBehaviorReducerDecorator = undoBehavior(100);
export function undoBehaviorReducer(rootReducer: any) {
	return undoBehaviorReducerDecorator(rootReducer);
}

export function localStorageSyncReducer(rootReducer: any) {
	return localStorageSync({ keys: ['story'], rehydrate: true })(rootReducer);
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		CharactersModule,
		StorageModule,
		StoreModule.forRoot(reducer, {
			metaReducers: [undoBehaviorReducer, localStorageSyncReducer],
		}),
		// StoryModule,
		// do not use with @ngrx/router-store (performance issue)
		StoreDevtoolsModule.instrument({
			maxAge: 25,
		}),
		PixiModule.forRoot(),
		// EffectsModule.forRoot([]),
	],
	providers: [
		{
			provide: STORY_MODULE_CONFIG,
			useValue: {
				...storyModuleDefaultConfig,
				name: 'app-config',
			},
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
