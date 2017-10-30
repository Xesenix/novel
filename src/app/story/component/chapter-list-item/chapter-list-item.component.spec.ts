import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterListItemComponent } from './chapter-list-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChapterListItemComponent', () => {
	let component: ChapterListItemComponent;
	let fixture: ComponentFixture<ChapterListItemComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ChapterListItemComponent],
				schemas: [NO_ERRORS_SCHEMA],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChapterListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
