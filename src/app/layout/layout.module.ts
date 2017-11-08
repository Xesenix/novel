import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimaryLayoutComponent } from 'layout/primary-layout/primary-layout.component';
import { PixiModule } from 'pixi/pixi.module';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';

@NgModule({
	imports: [CommonModule, RouterModule, PixiModule],
	declarations: [PrimaryLayoutComponent, SimpleLayoutComponent],
	exports: [PrimaryLayoutComponent],
	entryComponents: [PrimaryLayoutComponent],
})
export class LayoutModule {}
