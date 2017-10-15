import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimaryLayoutComponent } from './primary-layout/primary-layout.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [PrimaryLayoutComponent],
	exports: [PrimaryLayoutComponent],
})
export class LayoutModule { }
