import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtCommComponent } from './rt-comm.component';

describe('RtCommComponent', () => {
  let component: RtCommComponent;
  let fixture: ComponentFixture<RtCommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtCommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
