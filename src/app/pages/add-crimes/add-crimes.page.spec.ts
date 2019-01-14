import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrimesPage } from './add-crimes.page';

describe('AddCrimesPage', () => {
  let component: AddCrimesPage;
  let fixture: ComponentFixture<AddCrimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrimesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
