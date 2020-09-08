import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from "../../services/chat.service";
import { AuthService } from "../../services/auth.service";
import { ChatMessage } from "../../models/chat-message.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: ChatMessage;
  email: string;
  username: string;
  messageContent: string;
  timeStamp: Date = new Date()
  //
  constructor() { }

  ngOnInit(): void {
    this.messageContent = this.message.message
    this.timeStamp = this.message.timeStamp
    this.email = this.message.email
    this.username = this.message.username
  }

}
