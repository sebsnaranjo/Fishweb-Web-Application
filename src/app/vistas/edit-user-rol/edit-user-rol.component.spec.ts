import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserRolComponent } from './edit-user-rol.component';

describe('EditUserRolComponent', () => {
  let component: EditUserRolComponent;
  let fixture: ComponentFixture<EditUserRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
