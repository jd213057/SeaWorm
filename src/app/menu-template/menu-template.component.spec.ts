import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MenuTemplateComponent} from './menu-template.component';

describe('MenuTemplateComponent', () => {
  let component: MenuTemplateComponent;
  let fixture: ComponentFixture<MenuTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuTemplateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
