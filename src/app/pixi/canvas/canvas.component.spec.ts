import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiService } from 'pixi/pixi.service';

import { CanvasComponent } from './canvas.component';

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
