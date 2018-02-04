import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from 'app/app.component';
import { LevelUpManager } from 'app/level-up/level-up.manager';

describe('app:AppComponent', () => {
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [AppComponent],
				schemas: [NO_ERRORS_SCHEMA],
				providers: [
					{
						provide: LevelUpManager,
						useValue: {
							setRootViewContainerRef: () => {},
						},
					},
				],
			}).compileComponents();
		}),
	);

	it(
		'should create the app',
		async(() => {
			const fixture = TestBed.createComponent(AppComponent);
			const app = fixture.debugElement.componentInstance;
			expect(app).toBeTruthy();
		}),
	);
});
