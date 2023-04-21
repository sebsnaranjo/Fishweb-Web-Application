import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from 'src/app/modelos/message.interface';
import { UserI } from '../modelos/user.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  userId : string = this.authService.getIdUser();

  private baseUrl = '/api/chat/createChat';
  private rolUrl = '/api/auth/getUsersWithRole2';
  private getChats = '/api/chat/getId';
  private apiUrlUserId = 'api/auth/userAuthId';

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.baseUrl, message);
  }
  getRol2(){
    return this.http.get<UserI[]>(this.rolUrl);
  }
  getChatByUserId(){
    
    return this.http.get<any>(`${this.getChats}/${this.userId}`);
  
  }
  
 
  
}


