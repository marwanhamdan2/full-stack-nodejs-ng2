import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/Auth/auth.service'
import {Websocket} from '../../Utils/RT/websocket';


@Component({
  selector: 'app-rt-comm',
  templateUrl: './rt-comm.component.html',
  styleUrls: ['./rt-comm.component.css'],
  providers: [AuthService]
})
export class RtCommComponent implements OnInit {

  private websocketInstance : any = null;
  isWsReady : boolean;
  private msg : string;
  clientsList :  any[];

  private targetUserId : number;

  constructor(private AuthService: AuthService) {
    
    var websocketInstancePromise = Websocket.getInstance();

    websocketInstancePromise.then(wsInstance=>{
      console.log(`RT-comp const is ready`)
      this.websocketInstance = wsInstance;
      this.isWsReady = true;
      this.defineClientsListWsEvent();
    })

  }

  private defineClientsListWsEvent(){
    if(this.isWsReady){
      console.log(`sending get-clients-list`);
      this.websocketInstance.emit('get-clients-list');
      this.websocketInstance.on('clients-list', list=>{
        console.log(`clinets List`, list);
        this.clientsList = list;
      });
    }
  }

  getTargetUserId(){
    return this.targetUserId;
  }

  setTargerUserId(id){
    this.targetUserId = id;
  }


  getWsSocket(){
    return this.websocketInstance;
  }

  sendWsChatMessage(params){
    console.log(`sendint to ws`, params);
    if(this.isWsReady){
      this.websocketInstance.emit('client-msg', params)
    }
  }


  ngOnInit() {
  }

}
