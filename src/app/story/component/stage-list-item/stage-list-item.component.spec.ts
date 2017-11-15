import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StageListItemComponent } from 'story/component/stage-list-item/stage-list-item.component';

describe('story:StageListItemComponent', () => {
	let component: StageListItemComponent;
	let fixture: ComponentFixture<StageListItemComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [StageListItemComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [NoopAnimationsModule],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(StageListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
