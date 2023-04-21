import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/servicios/chat.service';
import { ManagementusersService } from 'src/app/servicios/managementusers.service';
import { UserI } from 'src/app/modelos/user.interface';
import { Message } from 'src/app/modelos/message.interface';
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  
  selectedChat: Message | null;

  chats: Message[] = [];


  constructor(private chatService: MessageService, private userService:ManagementusersService) { }


  ngOnInit(): void {
    
    this.chatService.getChatByUserId().subscribe(
      (chats) => {
        this.chats = chats;
      },
      (error) => {
        console.log(error);
      }
    );
    
  
}


showFullMessage = false;


showMessage(chat: Message): void {
  this.selectedChat = chat;
  this.showFullMessage = true;
}

  hideMessage(): void {
    this.selectedChat = null;
    this.showFullMessage = false;
  }



}


