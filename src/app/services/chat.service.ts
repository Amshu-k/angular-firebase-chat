import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { ChatMessage } from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  user: any
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage
  username: string

  constructor(private db: AngularFireDatabase, private angularFireAuth: AngularFireAuth) {
    // this.angularFireAuth.authState.subscribe(auth => {
    //   if (!auth) {
    //     this.user = auth;
    //   }
    // })
  }

  sendMessage(message: string) {
    const timeStamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'test@test.com'
    this.chatMessages = this.getMessages();
    console.log(this.chatMessages)
    this.chatMessages.push({
      message: message,
      timeStamp: new Date(),
      // username: this.username,
      username: "AmshuPrachi",
      email: email
    })
  }

  getTimeStamp() {
    const now = new Date();
    const date = `${now.getUTCFullYear()}/${(now.getUTCMonth() + 1)}/${now.getUTCDate()}`;
    const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCDate()}`;
    return Date()
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages',  ref => ref.orderByKey().limitToLast(25));
  }

  // {
  //   query: {
  //     limitToLast: 25,
  //     orderByKey: true
  //   }

}
