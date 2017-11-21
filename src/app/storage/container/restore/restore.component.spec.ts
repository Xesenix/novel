import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreComponent } from 'storage/container/restore/restore.component';

describe('RestoreComponent', () => {
	let component: RestoreComponent;
	let fixture: ComponentFixture<RestoreComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [RestoreComponent],
				schemas: [NO_ERRORS_SCHEMA],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(RestoreComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
