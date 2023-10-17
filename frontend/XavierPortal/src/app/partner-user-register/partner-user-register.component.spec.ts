import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUserRegisterComponent } from './partner-user-register.component';

describe('PartnerUserRegisterComponent', () => {
  let component: PartnerUserRegisterComponent;
  let fixture: ComponentFixture<PartnerUserRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerUserRegisterComponent]
    });
    fixture = TestBed.createComponent(PartnerUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
