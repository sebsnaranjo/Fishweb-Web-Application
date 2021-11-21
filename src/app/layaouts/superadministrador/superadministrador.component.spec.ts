import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadministradorComponent } from './superadministrador.component';

describe('SuperadministradorComponent', () => {
  let component: SuperadministradorComponent;
  let fixture: ComponentFixture<SuperadministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
