import { Component, Input } from '@angular/core';
import { SafeHtmlPipe } from "../../pipes/html-pipe";
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-chat-message',
  imports: [SafeHtmlPipe],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss'
})
export class ChatMessage {
  @Input() message: any;
  userAvatar: string = 'https://i.pinimg.com/originals/19/c3/24/19c3241a0d67a47697cadc6bdd67b091.gif';
  botAvatar: string = 'https://tawk.link/68528dc85503aa1915054c87/var/trigger-images/50f699e5c816e0eb6f4254622c10f3d8c8463a3e.jpg';

  constructor(
    private conversationService: ConversationService
  ) {}

  getSenderName() {
    return this.conversationService.getSenderName(this.message.sender);
  }

}
