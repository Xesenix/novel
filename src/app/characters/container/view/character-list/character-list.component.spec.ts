import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { CharacterListComponent } from './character-list.component';
import { reducer as rootReducer, AppState } from '../../../../reducers';

describe('CharacterListComponent', () => {
	let component: CharacterListComponent;
	let fixture: ComponentFixture<CharacterListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CharacterListComponent],
			schemas: [ NO_ERRORS_SCHEMA ],
			imports: [
				StoreModule.forRoot(rootReducer, { initialState: { story: {} } }),
			],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CharacterListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
