import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUpaComponent } from './info-upa.component';

describe('InfoUpaComponent', () => {
  let component: InfoUpaComponent;
  let fixture: ComponentFixture<InfoUpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoUpaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
