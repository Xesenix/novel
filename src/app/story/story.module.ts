
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';

import { StageFormComponent } from './component/stage-form/stage-form.component';
import { StageListComponent } from './container/view/stage-list/stage-list.component';
import { StoryRoutingModule } from './routing/story-routing.module';
import StoryStage from './model/story-stage';
import { reducer } from './reducers';

export function provideInitialState() {
	return {
		stages: [
			{ title: 'Brave new world', content: 'Darkness was lighted by volcanos spewing yellow glowing sulfur.' },
			{ title: 'Creatures of darkness', content: 'In shadows of caves lurked creatures born from darkness.' },
		]
	};
}
@NgModule({
	imports: [
		CommonModule,
		DragulaModule,
		StoryRoutingModule,
		ReactiveFormsModule,
		StoreModule.forFeature('story', reducer, {
			initialState: provideInitialState
		}),
	],
	declarations: [
		StageListComponent,
		StageFormComponent
	],
	exports: [StageListComponent]
})
export class StoryModule { }
