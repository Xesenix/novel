import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PixiService } from 'pixi/pixi.service';
import { CanvasComponent } from 'pixi/canvas/canvas.component';

@NgModule({
	imports: [CommonModule],
	declarations: [CanvasComponent],
	providers: [PixiService],
	exports: [CanvasComponent],
})
export class PixiModule {}
