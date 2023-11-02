import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionDocumentationPage } from './expedition-documentation.page';

describe('ExpeditionDocumentationPage', () => {
  let component: ExpeditionDocumentationPage;
  let fixture: ComponentFixture<ExpeditionDocumentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpeditionDocumentationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionDocumentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
