import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoryTransactionComponent } from './admin-history-transaction.component';

describe('AdminHistoryTransactionComponent', () => {
  let component: AdminHistoryTransactionComponent;
  let fixture: ComponentFixture<AdminHistoryTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHistoryTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHistoryTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
