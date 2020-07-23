import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatService } from '../services/chat.service';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatUserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  providers: [ChatService]
})
export class ChatModule { }
