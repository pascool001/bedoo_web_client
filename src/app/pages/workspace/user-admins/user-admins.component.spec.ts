import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminsComponent } from './user-admins.component';

describe('UserAdminsComponent', () => {
  let component: UserAdminsComponent;
  let fixture: ComponentFixture<UserAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
