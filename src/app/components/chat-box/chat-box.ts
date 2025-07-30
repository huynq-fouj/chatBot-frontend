import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatBoxHeader } from "../chat-box-header/chat-box-header";
import { ChatBoxBody } from "../chat-box-body/chat-box-body";
import { ChatBoxForm } from "../chat-box-form/chat-box-form";
import { typeWriterHTML } from '../../utils/typeWirter';

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
      responding: false
    }
  ];

  ngOnInit() {
    setTimeout(() => this.scrollToBottom(), 0);
  }

  addMessage(message: { content: string; files?: File[] }) {
    if(this.messageList[this.messageList.length - 1].responding) {
      return;
    }

    if (!message.content.trim() && !message.files?.length) {
      return;
    }
    this.messageList.push({
      content: message.content,
      sender: 'user',
      files: message.files
    });
    setTimeout(() => this.scrollToBottom(), 0);
    setTimeout(() => {
      const fakeResponse = {
        content: "",
        sender: 'bot',
        responding: true
      };
      this.messageList.push(fakeResponse);
      setTimeout(() => this.scrollToBottom(), 0);
      setTimeout(() => {
        typeWriterHTML(
          `<p>Thank you for your message! I will get back to you shortly.</p>
          <p>Feel free to ask anything else in the meantime.</p>
          <p>Have a great day!</p>
          <img src="data:image/jpeg;base64,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"/>`,
          (content: string) => {
            fakeResponse.content = content
            setTimeout(() => {
              this.scrollToBottom();
            }, 0);
          },
          50
        ).finally(() => {
          fakeResponse.responding = false;
        })
      }, 2000);
    }, 200);
  }

  @ViewChild('scrollContainer') scrollContainer: ElementRef | undefined;
  scrollToBottom() {
    if (this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

}
