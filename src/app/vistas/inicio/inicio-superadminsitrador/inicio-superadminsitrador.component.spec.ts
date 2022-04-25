import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSuperadminsitradorComponent } from './inicio-superadminsitrador.component';

describe('InicioSuperadminsitradorComponent', () => {
  let component: InicioSuperadminsitradorComponent;
  let fixture: ComponentFixture<InicioSuperadminsitradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioSuperadminsitradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioSuperadminsitradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
