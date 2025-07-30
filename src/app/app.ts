import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatBox } from "./components/chat-box/chat-box";
import { CommonModule } from '@angular/common';
import { ConversationService } from './services/conversation.service';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [ChatBox, CommonModule]
})
export class App implements OnInit, OnDestroy {
  protected title = 'chatBot-frontend';
  opened = false;

  constructor(
    private conversationService: ConversationService,
    private eventService: EventsService
  ) {}
  
  ngOnInit(): void {
    window.addEventListener('message', this.handleParentMessage.bind(this));
    this.eventService.ready();
  }

  private handleParentMessage(event: MessageEvent) {
    if (event.data?.type === 'init-chat' && event.data.payload) {
      const { botName, userName, businessType } = event.data.payload;
      this.conversationService.setNames(botName, userName);
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.handleParentMessage.bind(this));
  }
}
