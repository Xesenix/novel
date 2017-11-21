import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { PopupComponent } from 'modal/component/popup/popup.component';

describe('PopupComponent', () => {
	let component: PopupComponent;
	let fixture: ComponentFixture<PopupComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [PopupComponent],
				imports: [NoopAnimationsModule],
				providers: [
					{
						provide: Router,
						useValue: {
							navigate: () => {},
						},
					},
				],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(PopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
