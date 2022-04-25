import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpaComponent } from './create-upa.component';

describe('CreateUpaComponent', () => {
  let component: CreateUpaComponent;
  let fixture: ComponentFixture<CreateUpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
