import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrimePage } from './add-crime.page';

describe('AddCrimePage', () => {
  let component: AddCrimePage;
  let fixture: ComponentFixture<AddCrimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
