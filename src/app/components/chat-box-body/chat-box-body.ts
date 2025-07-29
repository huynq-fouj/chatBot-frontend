import { Component, Input, OnChanges } from '@angular/core';
import { ChatMessage } from "../chat-message/chat-message";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box-body',
  imports: [ChatMessage, CommonModule],
  templateUrl: './chat-box-body.html',
  styleUrl: './chat-box-body.scss'
})
export class ChatBoxBody {
  @Input() messages: any[] = [];
}
