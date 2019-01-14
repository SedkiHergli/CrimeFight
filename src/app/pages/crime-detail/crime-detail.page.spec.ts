import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeDetailPage } from './crime-detail.page';

describe('CrimeDetailPage', () => {
  let component: CrimeDetailPage;
  let fixture: ComponentFixture<CrimeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
