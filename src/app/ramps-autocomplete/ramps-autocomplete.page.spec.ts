import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RampsAutocompletePage } from './ramps-autocomplete.page';

describe('RampsAutocompletePage', () => {
  let component: RampsAutocompletePage;
  let fixture: ComponentFixture<RampsAutocompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RampsAutocompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RampsAutocompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
