import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type Message = {
  content: string; 
  files?: File[];
}

@Component({
  selector: 'app-chat-box-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box-form.html',
  styleUrl: './chat-box-form.scss'
})
export class ChatBoxForm {

  content: string = '';
  files: File[] = [];
  
  @Input() disabled: boolean = false;
  @Output() submit = new EventEmitter<Message>();

  constructor() {
    
  }

  submitMessage() {
    if (this.content.trim() || this.files.length > 0) {
      const message: Message = {
        content: this.content.trim(),
        files: this.files
      };
      this.submit.emit(message);
      this.resetForm();
    }
  }

  resetForm() {
    this.content = '';
    this.files = [];
  }

}
