import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarComponent } from './controlar.component';

describe('ControlarComponent', () => {
  let component: ControlarComponent;
  let fixture: ComponentFixture<ControlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
