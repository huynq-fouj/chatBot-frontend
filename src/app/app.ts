import { Component, OnInit } from '@angular/core';
import { ChatBox } from "./components/chat-box/chat-box";
import { CommonModule } from '@angular/common';
import { ConversationService } from './services/conversation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [ChatBox, CommonModule]
})
export class App implements OnInit {
  protected title = 'chatBot-frontend';

  constructor(
    private conversationService: ConversationService
  ) {
    this.conversationService.setNames('Hỗ trợ EasyPos', 'User');
  }
  
  ngOnInit(): void {
    // Initialization logic can go here
  }
}
