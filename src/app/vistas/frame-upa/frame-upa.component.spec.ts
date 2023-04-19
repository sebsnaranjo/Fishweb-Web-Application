import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameUpaComponent } from './frame-upa.component';

describe('FrameUpaComponent', () => {
  let component: FrameUpaComponent;
  let fixture: ComponentFixture<FrameUpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameUpaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameUpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
