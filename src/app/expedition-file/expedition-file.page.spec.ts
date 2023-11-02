import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionFilePage } from './expedition-file.page';

describe('ExpeditionFilePage', () => {
  let component: ExpeditionFilePage;
  let fixture: ComponentFixture<ExpeditionFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpeditionFilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
