import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxHeader } from './chat-box-header';

describe('ChatBoxHeader', () => {
  let component: ChatBoxHeader;
  let fixture: ComponentFixture<ChatBoxHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBoxHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBoxHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
