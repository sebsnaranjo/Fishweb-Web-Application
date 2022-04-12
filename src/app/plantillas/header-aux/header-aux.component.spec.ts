import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuxComponent } from './header-aux.component';

describe('HeaderAuxComponent', () => {
  let component: HeaderAuxComponent;
  let fixture: ComponentFixture<HeaderAuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAuxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
