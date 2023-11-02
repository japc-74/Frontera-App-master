import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeIdaPage } from './viaje-ida.page';

describe('ViajeIdaPage', () => {
  let component: ViajeIdaPage;
  let fixture: ComponentFixture<ViajeIdaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeIdaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeIdaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
