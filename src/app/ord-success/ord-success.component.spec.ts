import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdSuccessComponent } from './ord-success.component';

describe('OrdSuccessComponent', () => {
  let component: OrdSuccessComponent;
  let fixture: ComponentFixture<OrdSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
