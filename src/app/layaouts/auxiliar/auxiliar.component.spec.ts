import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarComponent } from './auxiliar.component';

describe('AuxiliarComponent', () => {
  let component: AuxiliarComponent;
  let fixture: ComponentFixture<AuxiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuxiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
