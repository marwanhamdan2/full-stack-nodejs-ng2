import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-session',
  templateUrl: './chat-session.component.html',
  styleUrls: ['./chat-session.component.css'],
  inputs: ['targetUserId', 'incomeMsgEmitter'],
  outputs: ['sendChatMessage']
})
export class ChatSessionComponent implements OnInit {

  //input
  private targetUserId : number;
  private incomeMsgEmitter;

  //example of component output (EventEmitter)
  private sendChatMessage;


  msgList : any[];

  //binding properties
  userMsg: string;


  constructor() {
    //define the vent emiiter to emit output
    this.sendChatMessage = new EventEmitter();
    this.userMsg = "";
    this.msgList = [];

  }

  ngOnInit() {
    this.incomeMsgEmitter.on('client-msg', (data)=>{
      if(data.from == this.getTargetUserId()){
        this.msgList.push(data);
        console.log(this.msgList);
      }
    })
    
  }

  getTargetUserId(){
    return this.targetUserId;
  }

  send(){
    var _obj = {
      to: this.targetUserId,
      msg: this.userMsg
    };


    this.msgList.push(_obj)
    this.sendChatMessage.emit(_obj)

    this.userMsg = ``;
  }


}
