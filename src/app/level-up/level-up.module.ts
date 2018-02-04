import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelUpComponent } from './level-up.component';
import { LevelUpManager } from './level-up.manager';

@NgModule({
	imports: [CommonModule],
	declarations: [LevelUpComponent],
	exports: [LevelUpComponent],
	entryComponents: [LevelUpComponent],
})
export class LevelUpModule {
	public static forRoot() {
		return {
			ngModule: LevelUpModule,
			providers: [LevelUpManager],
		};
	}
}
