import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarSaComponent } from './controlar-sa.component';

describe('ControlarSaComponent', () => {
  let component: ControlarSaComponent;
  let fixture: ComponentFixture<ControlarSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlarSaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlarSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
