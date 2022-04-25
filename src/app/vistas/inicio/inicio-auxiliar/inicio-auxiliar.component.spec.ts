import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAuxiliarComponent } from './inicio-auxiliar.component';

describe('InicioAuxiliarComponent', () => {
  let component: InicioAuxiliarComponent;
  let fixture: ComponentFixture<InicioAuxiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioAuxiliarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
