import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsLayoutComponent } from './ws-layout.component';

describe('WsLayoutComponent', () => {
  let component: WsLayoutComponent;
  let fixture: ComponentFixture<WsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
