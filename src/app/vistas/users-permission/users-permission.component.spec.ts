import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPermissionComponent } from './users-permission.component';

describe('UsersPermissionComponent', () => {
  let component: UsersPermissionComponent;
  let fixture: ComponentFixture<UsersPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
