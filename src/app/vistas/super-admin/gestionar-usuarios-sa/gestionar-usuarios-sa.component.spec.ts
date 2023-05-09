import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUsuariosSaComponent } from './gestionar-usuarios-sa.component';

describe('GestionarUsuariosSaComponent', () => {
  let component: GestionarUsuariosSaComponent;
  let fixture: ComponentFixture<GestionarUsuariosSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarUsuariosSaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarUsuariosSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
