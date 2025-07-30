import { AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { SafeHtmlPipe } from "../../pipes/html-pipe";
import { ConversationService } from '../../services/conversation.service';
import { EventsService } from '../../services/events.service';
import { PreviewsService } from '../../services/previews.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-message',
  imports: [SafeHtmlPipe, CommonModule],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss'
})
export class ChatMessage implements OnChanges, AfterViewInit {
  @Input() message: any;
  userAvatar: string = 'https://i.pinimg.com/originals/19/c3/24/19c3241a0d67a47697cadc6bdd67b091.gif';
  botAvatar: string = 'https://tawk.link/68528dc85503aa1915054c87/var/trigger-images/50f699e5c816e0eb6f4254622c10f3d8c8463a3e.jpg';
  @ViewChild('messageBox') messageBox!: ElementRef<HTMLDivElement>;
  previewFiles: { name: string, src?: string }[] = [];

  constructor(
    private conversationService: ConversationService,
    private renderer: Renderer2,
    private eventsService: EventsService,
    private previewService: PreviewsService
  ) {}

  ngOnChanges() {
    if (this.message && this.message.files) {
      this.getPreviews();
    }
  }

  ngAfterViewInit(): void {
    const imgs = this.messageBox.nativeElement.querySelectorAll('img');
    imgs.forEach((img: HTMLImageElement) => {
      this.renderer.listen(img, 'click', () => {
        this.openImage(img.src);
      });
      this.renderer.setStyle(img, 'cursor', 'pointer');
    });
  }

  getSenderName() {
    return this.conversationService.getSenderName(this.message.sender);
  }

  openImage(url: string) {
    this.eventsService.openImage(url);
  }

  async getPreviews() {
    this.previewFiles = await this.previewService.getPreviews(this.message.files || []);
  }

}
