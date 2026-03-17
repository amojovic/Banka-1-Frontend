import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsModalComponent } from './account-details-modal.component';

describe('AccountDetailsModalComponent', () => {
  let component: AccountDetailsModalComponent;
  let fixture: ComponentFixture<AccountDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailsModalComponent]
    });
    fixture = TestBed.createComponent(AccountDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
