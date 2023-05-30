import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShowGraphsComponent } from './data-show-graphs.component';

describe('DataShowGraphsComponent', () => {
  let component: DataShowGraphsComponent;
  let fixture: ComponentFixture<DataShowGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataShowGraphsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataShowGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
