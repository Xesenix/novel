import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent } from './canvas/canvas.component';
import { PixiService } from './pixi.service';
import { RendererService } from './renderer.service';

@NgModule({
	imports: [CommonModule],
	declarations: [CanvasComponent],
	providers: [], // do not put singleton services like PixiService inside submodule put them into app module provider
	exports: [CanvasComponent],
})
export class PixiModule {
	public static forRoot() {
		return {
			ngModule: PixiModule,
			providers: [PixiService, RendererService],
		};
	}
}
