import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageAdminDashboard } from './main-page-admin-dashboard';

describe('MainPageAdminDashboard', () => {
  let component: MainPageAdminDashboard;
  let fixture: ComponentFixture<MainPageAdminDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageAdminDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageAdminDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
