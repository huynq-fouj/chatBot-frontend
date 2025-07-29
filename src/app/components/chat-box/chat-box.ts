import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatBoxHeader } from "../chat-box-header/chat-box-header";
import { ChatBoxBody } from "../chat-box-body/chat-box-body";
import { ChatBoxForm } from "../chat-box-form/chat-box-form";

@Component({
  selector: 'app-chat-box',
  imports: [ChatBoxHeader, ChatBoxBody, ChatBoxForm],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.scss'
})
export class ChatBox {

  messageList: any[] = [
    {
      content: 'Hello! How can I assist you today?',
      sender: 'bot',
    },
    {
      content: 'I need help with my order.',
      sender: 'user',
    },
    {
      content: 'Sure! Can you provide your order number?',
      sender: 'bot',
    },
    {
      content: 'Yes, it is #12345.',
      sender: 'user',
    },
    {
      content: `Thank you! I will look into that for you. Please hold on while I fetch the details. If you have any other questions in the meantime, feel free to ask.
      <br/>
      <img src="https://i.pinimg.com/originals/52/b0/f0/52b0f06048f6a92f8c0398b1c8f1a9bc.gif" style="width: 100%;" />
      `,
      sender: 'bot',
    },
    {
      content: 'Great, thank you!',
      sender: 'user',
    }
  ];

  ngOnInit() {
    setTimeout(() => this.scrollToBottom(), 0);
  }

  addMessage(message: { content: string; files?: File[] }) {
    this.messageList.push({
      content: message.content,
      sender: 'user',
      files: message.files
    });
    setTimeout(() => this.scrollToBottom(), 0);
  }

  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;
  scrollToBottom() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

}
