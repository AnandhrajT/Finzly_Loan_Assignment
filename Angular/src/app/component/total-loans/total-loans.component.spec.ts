import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLoansComponent } from './total-loans.component';

describe('TotalLoansComponent', () => {
  let component: TotalLoansComponent;
  let fixture: ComponentFixture<TotalLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalLoansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
