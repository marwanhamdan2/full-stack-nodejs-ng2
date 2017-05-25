import { Component, OnInit } from '@angular/core';
import {Websocket} from '../../Utils/RT/websocket';
import {WebSocketInitDataService} from '../../Services/WebSocketInitData/web-socket-init-data.service';

@Component({
  selector: 'app-real-time-file-watch',
  templateUrl: './real-time-file-watch.component.html',
  styleUrls: ['./real-time-file-watch.component.css'],
  providers: [WebSocketInitDataService]
})
export class RealTimeFileWatchComponent implements OnInit {

  private websocketInstance : any = null;
  isWsReady : boolean = false;
  public fileData : string = "";

  constructor(private WebSocketInitDataService: WebSocketInitDataService) {
      var instancePromise = Websocket.getInstance();
      console.log(`in fs const`)
      instancePromise.then(instance=>{
          console.log(`ws instance in FS-watcher const`, instance);
          this.websocketInstance = instance;
          this.isWsReady = true;
          this.defineWsFileWatchEvent();
      });

      WebSocketInitDataService.getWatchFileData()
      .subscribe(res=>{
          this.fileData = res;
      }, err=>{
        console.log(`File-watch-http-req ERROR: `, err);
      })
  }

  private defineWsFileWatchEvent(){
      this.websocketInstance.on('file-feed', data=>{
        this.fileData = data;
      })
  }

  textChanged(){
    /**
     * Only emit chnage when socket is ready and file watcher is active
     */
    if(this.isWsReady){
      this.websocketInstance.emit('file-feed', this.fileData);
    }
  }

  ngOnInit() {
  }

}
