import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageFormComponent } from './stage-form.component';

describe('StageFormComponent', () => {
	let component: StageFormComponent;
	let fixture: ComponentFixture<StageFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ StageFormComponent ],
			schemas: [ NO_ERRORS_SCHEMA ],
			providers: [],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StageFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
