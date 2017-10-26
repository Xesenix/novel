import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PixiService } from 'pixi/pixi.service';
import { CanvasComponent } from 'pixi/canvas/canvas.component';

@NgModule({
	imports: [CommonModule],
	declarations: [CanvasComponent],
	providers: [], // do not put singleton services like PixiService inside submodule put them into app module provider
	exports: [CanvasComponent],
})
export class PixiModule {}
