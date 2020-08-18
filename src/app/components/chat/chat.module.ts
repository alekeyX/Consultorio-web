import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from '../services/chat.service';
import { ChatComponent } from './chat.component';
import { ChatUsersMessagesComponent } from './chat-users-messages/chat-users-messages.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatUsersMessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  providers: [ChatService]
})
export class ChatModule { }
