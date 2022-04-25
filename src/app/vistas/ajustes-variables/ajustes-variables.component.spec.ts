import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesVariablesComponent } from './ajustes-variables.component';

describe('AjustesVariablesComponent', () => {
  let component: AjustesVariablesComponent;
  let fixture: ComponentFixture<AjustesVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesVariablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
