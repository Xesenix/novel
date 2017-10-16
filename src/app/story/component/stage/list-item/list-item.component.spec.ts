import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { StageFormComponent } from '../../stage-form/stage-form.component';
import { reducer as rootReducer, AppState } from '../../../../reducers';

describe('ListItemComponent', () => {
	let component: ListItemComponent;
	let fixture: ComponentFixture<ListItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ListItemComponent],
			schemas: [NO_ERRORS_SCHEMA],
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});