import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxBody } from './chat-box-body';

describe('ChatBoxBody', () => {
  let component: ChatBoxBody;
  let fixture: ComponentFixture<ChatBoxBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBoxBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBoxBody);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
