import { Component } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-chat-box-header',
  imports: [],
  templateUrl: './chat-box-header.html',
  styleUrl: './chat-box-header.scss'
})
export class ChatBoxHeader {

  botName: string = "Chat bot";

  constructor(
    private conversationService: ConversationService
  ) {
    this.botName = this.conversationService.getSenderName('bot');
  }

}
