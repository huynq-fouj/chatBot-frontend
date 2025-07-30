import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';

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

  constructor(
    private eventsService: EventsService
  ) {}

  submitMessage() {
    if (this.content.trim() || this.files.length > 0) {
      const message: Message = {
        content: this.content.trim(),
        files: this.files
      };
      this.submit.emit(message);
      this.resetForm();
      this.eventsService.submitMessage(message);
    }
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, textarea.scrollHeight) + 'px';

    const lineHeight = 24;
    const maxLines = 3;
    const maxHeight = lineHeight * maxLines;

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
      textarea.style.height = maxHeight + 'px';
    }
  }

  resetForm() {
    this.content = '';
    this.files = [];
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    }
  }

}
