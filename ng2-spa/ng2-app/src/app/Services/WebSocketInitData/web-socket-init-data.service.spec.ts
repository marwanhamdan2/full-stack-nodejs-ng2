import { TestBed, inject } from '@angular/core/testing';

import { WebSocketInitDataService } from './web-socket-init-data.service';

describe('WebSocketInitDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketInitDataService]
    });
  });

  it('should ...', inject([WebSocketInitDataService], (service: WebSocketInitDataService) => {
    expect(service).toBeTruthy();
  }));
});
