import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableUpaComponent } from './data-table-upa.component';

describe('DataTableUpaComponent', () => {
  let component: DataTableUpaComponent;
  let fixture: ComponentFixture<DataTableUpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableUpaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableUpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
