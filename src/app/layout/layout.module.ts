import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimaryLayoutComponent } from 'layout/primary-layout/primary-layout.component';
import { PixiModule } from 'pixi/pixi.module';

@NgModule({
	imports: [CommonModule, RouterModule, PixiModule],
	declarations: [PrimaryLayoutComponent],
	exports: [PrimaryLayoutComponent],
})
export class LayoutModule {}
