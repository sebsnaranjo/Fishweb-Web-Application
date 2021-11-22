import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSuperadminComponent } from './header-superadmin.component';

describe('HeaderSuperadminComponent', () => {
  let component: HeaderSuperadminComponent;
  let fixture: ComponentFixture<HeaderSuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSuperadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
