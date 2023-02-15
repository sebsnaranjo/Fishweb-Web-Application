import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUpasComponent } from './gestionar-upas.component';

describe('GestionarUpasComponent', () => {
  let component: GestionarUpasComponent;
  let fixture: ComponentFixture<GestionarUpasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarUpasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarUpasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
