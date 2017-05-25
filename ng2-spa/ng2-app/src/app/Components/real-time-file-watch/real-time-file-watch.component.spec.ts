import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeFileWatchComponent } from './real-time-file-watch.component';

describe('RealTimeFileWatchComponent', () => {
  let component: RealTimeFileWatchComponent;
  let fixture: ComponentFixture<RealTimeFileWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeFileWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeFileWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
