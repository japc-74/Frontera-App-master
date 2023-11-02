import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeRetPage } from './viaje-ret.page';

describe('ViajeRetPage', () => {
  let component: ViajeRetPage;
  let fixture: ComponentFixture<ViajeRetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeRetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeRetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
