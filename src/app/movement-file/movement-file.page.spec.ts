import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementFilePage } from './movement-file.page';

describe('MovementFilePage', () => {
  let component: MovementFilePage;
  let fixture: ComponentFixture<MovementFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementFilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
