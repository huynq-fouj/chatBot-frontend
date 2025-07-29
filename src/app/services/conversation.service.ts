import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ConversationState {
  botName: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  
  private stateSubject = new BehaviorSubject<ConversationState>({
    botName: 'Bot',
    userName: 'User',
  });

  state$ = this.stateSubject.asObservable();

  get currentState(): ConversationState {
    return this.stateSubject.value;
  }

  setNames(botName: string, userName: string): void {
    this.stateSubject.next({ botName, userName });
  }

  getSenderName(sender: string): string {
    const { botName, userName } = this.stateSubject.value;
    
    switch (sender) {
      case 'bot':
        return botName;
      case 'user':
        return userName;
      default:
        return 'Unknown';
    }
  }

}
