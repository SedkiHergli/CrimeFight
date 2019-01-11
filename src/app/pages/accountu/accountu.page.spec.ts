import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountuPage } from './accountu.page';

describe('AccountuPage', () => {
  let component: AccountuPage;
  let fixture: ComponentFixture<AccountuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
