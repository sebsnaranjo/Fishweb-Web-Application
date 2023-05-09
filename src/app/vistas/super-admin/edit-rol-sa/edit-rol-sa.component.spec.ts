import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRolSaComponent } from './edit-rol-sa.component';

describe('EditRolSaComponent', () => {
  let component: EditRolSaComponent;
  let fixture: ComponentFixture<EditRolSaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRolSaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRolSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
