import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';
import { PixiService } from '../pixi.service';

describe('CanvasComponent', () => {
	let component: CanvasComponent;
	let fixture: ComponentFixture<CanvasComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CanvasComponent],
			providers: [PixiService],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CanvasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
