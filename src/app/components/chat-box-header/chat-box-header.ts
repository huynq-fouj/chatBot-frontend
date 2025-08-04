import { Component, OnDestroy } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-box-header',
  imports: [],
  templateUrl: './chat-box-header.html',
  styleUrl: './chat-box-header.scss'
})
export class ChatBoxHeader implements OnDestroy {

  botName: string = "Chat bot";
  subscriptions: Subscription[] = [];

  constructor(
    private conversationService: ConversationService
  ) {
    this.botName = this.conversationService.getSenderName('bot');
    const subscription = this.conversationService.getSubject().subscribe({
      next: data => {
        this.botName = data.botName;
      }
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(item => item.unsubscribe());
  }

}
