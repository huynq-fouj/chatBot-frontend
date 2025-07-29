import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxForm } from './chat-box-form';

describe('ChatBoxForm', () => {
  let component: ChatBoxForm;
  let fixture: ComponentFixture<ChatBoxForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBoxForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBoxForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
