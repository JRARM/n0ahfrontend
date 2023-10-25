import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenpasswordComponent } from './forgottenpassword.component';

describe('ForgottenpasswordComponent', () => {
  let component: ForgottenpasswordComponent;
  let fixture: ComponentFixture<ForgottenpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgottenpasswordComponent]
    });
    fixture = TestBed.createComponent(ForgottenpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
