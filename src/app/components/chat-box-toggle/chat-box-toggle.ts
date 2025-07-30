import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBox } from '../chat-box/chat-box';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-chat-box-toggle',
  imports: [CommonModule, ChatBox],
  templateUrl: './chat-box-toggle.html',
  styleUrls: ['./chat-box-toggle.scss']
})
export class ChatBoxToggle implements OnInit, OnDestroy {
    open = false;
    @ViewChild('imageModal') imageModal!: ElementRef;
    
    constructor(
      private conversationService: ConversationService
    ) {}
    
    ngOnInit(): void {
      window.addEventListener('init-chat', this.handleInitChat.bind(this));
    }

    handleInitChat(event: Event): void {
      const { botName, userName, businessType } = (event as CustomEvent).detail;
      this.conversationService.setNames(botName, userName);
    }

    ngOnDestroy(): void {
      window.removeEventListener('init-chat', this.handleInitChat.bind(this));
    }

}
