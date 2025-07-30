import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { PreviewsService } from '../../services/previews.service';

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
  previewFiles: { name: string, src?: string }[] = [];
  
  @Input() disabled: boolean = false;
  @Output() submit = new EventEmitter<Message>();

  constructor(
    private eventsService: EventsService,
    private previewService: PreviewsService
  ) {}

  submitMessage(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    if (this.content.trim() || this.files.length > 0) {
      const message: Message = {
        content: this.content.trim(),
        files: this.files
      };
      this.submit.emit(message);
      this.resetForm();
      const textarea = event.target as HTMLTextAreaElement;
      this.autoResize({ target: textarea });
      this.eventsService.submitMessage(message);
    }
  }

  autoResize(event: any): void {
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
    this.previewFiles = [];
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const uniqueFiles = files.filter(file =>
        !this.files.some(existingFile => existingFile.name === file.name)
      );
      this.files.push(...uniqueFiles);
      this.getPreviews();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files) {
      const files = Array.from(event.dataTransfer.files);
      const uniqueFiles = files.filter(file =>
        !this.files.some(existingFile => existingFile.name === file.name)
      );
      this.files.push(...uniqueFiles);
      this.getPreviews();
    }
  }

  async getPreviews() {
    if (this.files.length > 0) {
      this.previewFiles = await this.previewService.getPreviews(this.files);
    } else {
      this.previewFiles = [];
    }
  }

  deleteFile(preview: { name: string, src?: string }) {
    this.files = this.files.filter(file => file.name !== preview.name);
    this.previewFiles = this.previewFiles.filter(p => p.name !== preview.name);
  }

}
