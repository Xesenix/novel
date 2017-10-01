import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StageFormComponent } from './component/stage-form/stage-form.component';
import { StageListComponent } from './container/view/stage-list/stage-list.component';
import { StoryRoutingModule } from './story.routing.module';

@NgModule({
	imports: [
		CommonModule,
		StoryRoutingModule,
		ReactiveFormsModule,
	],
	declarations: [
		StageListComponent,
		StageFormComponent
	]
})
export class StoryModule { }
