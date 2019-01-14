import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCrimePage } from './verify-crime.page';

describe('VerifyCrimePage', () => {
  let component: VerifyCrimePage;
  let fixture: ComponentFixture<VerifyCrimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCrimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCrimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
