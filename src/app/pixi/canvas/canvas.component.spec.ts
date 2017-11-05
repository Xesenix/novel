import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiService } from 'pixi/pixi.service';
import { CanvasComponent } from 'pixi/canvas/canvas.component';
import { RendererService } from 'pixi/renderer.service';

describe('pixi:CanvasComponent', () => {
	let component: CanvasComponent;
	let fixture: ComponentFixture<CanvasComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [CanvasComponent],
				providers: [PixiService, RendererService],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CanvasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
