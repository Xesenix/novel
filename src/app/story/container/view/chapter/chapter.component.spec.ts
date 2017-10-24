import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterComponent } from 'story/container/view/chapter/chapter.component';

describe('story:ChapterComponent', () => {
	let component: ChapterComponent;
	let fixture: ComponentFixture<ChapterComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ChapterComponent],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ChapterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
