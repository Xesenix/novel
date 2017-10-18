import { NgModule } from '@angular/core';

import { AppModule as BaseAppModule } from '../app/app.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BaseAppModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule extends BaseAppModule { }
