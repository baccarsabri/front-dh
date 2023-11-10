import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  setupSocketConnection() {




    //this.socket.emit('my message', 'Hello there from Angular.');

  }


  getmsg(id) {
    // this.socket = io(environment.SOCKET_ENDPOINT);  

    this.socket.emit("info", id);
  }

  close() {
    this.socket.emit('disconnect', 'ciaaaaao');
  }








}