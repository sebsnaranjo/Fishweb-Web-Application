import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteSenActComponent } from './ajuste-sen-act.component';

describe('AjusteSenActComponent', () => {
  let component: AjusteSenActComponent;
  let fixture: ComponentFixture<AjusteSenActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteSenActComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjusteSenActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
