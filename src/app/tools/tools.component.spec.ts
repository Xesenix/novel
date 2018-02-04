import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsComponent } from './tools.component';
import { LevelUpManager } from 'app/level-up/level-up.manager';

describe('ToolsComponent', () => {
	let component: ToolsComponent;
	let fixture: ComponentFixture<ToolsComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ToolsComponent],
				providers: [
					{
						provide: LevelUpManager,
						useValue: {
							show: () => {},
						},
					},
				],
			}).compileComponents();
		}),
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
