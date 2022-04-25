import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUsersComponent } from './header-users.component';

describe('HeaderUsersComponent', () => {
  let component: HeaderUsersComponent;
  let fixture: ComponentFixture<HeaderUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
