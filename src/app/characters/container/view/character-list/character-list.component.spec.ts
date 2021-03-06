import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { reducer as rootReducer } from 'app/reducers';
import { CharacterListComponent } from 'characters/container/view/character-list/character-list.component';

describe('CharacterListComponent', () => {
	let component: CharacterListComponent;
	let fixture: ComponentFixture<CharacterListComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [CharacterListComponent],
				schemas: [NO_ERRORS_SCHEMA],
				imports: [StoreModule.forRoot(rootReducer, { initialState: { story: {} } })],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CharacterListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
