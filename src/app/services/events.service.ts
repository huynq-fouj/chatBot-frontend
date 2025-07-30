import { Injectable } from '@angular/core';
import { Message } from '../components/chat-box-form/chat-box-form';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
  constructor() {}

  private postMessage(type: string, payload: any) {
    window.parent.postMessage({ type, payload }, '*');
  }

  private dispatchEvent(eventName: string, detail: any) {
      const event = new CustomEvent(eventName, { detail });
      window.dispatchEvent(event);
  }

  private broadcast(eventName: string, detail: any) {
    this.dispatchEvent(eventName, detail);
    this.postMessage(eventName, detail);
  }

  ready() {
    this.broadcast('ready', null);
  }

  submitMessage(message: Message) {
    this.broadcast('send-message', message);
  }

  openImage(imageUrl: string) {
    this.broadcast('open-image', { imageUrl });
  }

  custom(eventName: string, detail: any) {
    this.broadcast(eventName, detail);
  }

}
