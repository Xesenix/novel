import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ListItemComponent } from 'story/component/stage/list-item/list-item.component';

describe('story:ListItemComponent', () => {
	let component: ListItemComponent;
	let fixture: ComponentFixture<ListItemComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ListItemComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [NoopAnimationsModule],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
