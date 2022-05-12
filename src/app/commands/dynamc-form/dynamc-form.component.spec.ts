import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamcFormComponent } from './dynamc-form.component';

describe('DynamcFormComponent', () => {
  let component: DynamcFormComponent;
  let fixture: ComponentFixture<DynamcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
