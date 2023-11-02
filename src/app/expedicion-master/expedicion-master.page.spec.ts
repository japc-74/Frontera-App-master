import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedicionMasterPage } from './expedicion-master.page';

describe('ExpedicionMasterPage', () => {
  let component: ExpedicionMasterPage;
  let fixture: ComponentFixture<ExpedicionMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedicionMasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedicionMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
