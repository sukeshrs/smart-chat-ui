import { TestBed, inject } from '@angular/core/testing';

import { SmartChatModelService } from './smart-chat-model.service';

describe('SmartChatModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartChatModelService]
    });
  });

  it('should be created', inject([SmartChatModelService], (service: SmartChatModelService) => {
    expect(service).toBeTruthy();
  }));
});
