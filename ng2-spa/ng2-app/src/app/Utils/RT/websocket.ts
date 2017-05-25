import * as io from "socket.io-client";
import { AuthService } from '../../Services/Auth/auth.service';
import { EventEmitter } from "events";

import {environment} from  '../../../environments/environment';


const OPTIONS = {
    wsUrl : `http://${environment.remoteServer}:${environment.remotePort}`
};

/**
 * Create a singilton+watcher pattern of webSocket manager
 * to assure that the client session init only one ws-socket connection
 * 
 * 
 */
export class Websocket {
    //to watch the creation socket handshaking
    private static watcher : EventEmitter;

    //OLD: only expoesed, create instance if not existed and return the evenetemiiter that watch the ready status
    //return promise that resovle when isntance is readu
    public static getInstance(){
        if(!Websocket.watcher){
            Websocket.watcher = new EventEmitter();
            if(!Websocket.websocketInstance){
                Websocket.createInstance();
            }
        }

        return new Promise((resolve, reject)=>{
            if(Websocket.websocketInstance && Websocket.websocketInstance.isReady){
                return resolve(Websocket.websocketInstance.ws);
            }else{
                Websocket.watcher.on("isReady", (instance)=>{
                    return resolve(instance);
                })
            }
        });
    }

    public static deleteSocket(){
        Websocket.websocketInstance.ws.disconnect();
        Websocket.websocketInstance = null;
        Websocket.watcher = null;
    }
    
    //to assure only single instance of the class exists
    private static websocketInstance : Websocket = null;
    private static createInstance(){
        /**
         * If no instance created
         */   
        if(!Websocket.websocketInstance){
            var authToken = localStorage.getItem('AUTH_TOKEN'); 
            var url = OPTIONS.wsUrl;
            if(authToken && url){
                Websocket.websocketInstance = new this(url, authToken);
            }
        }
        //return Websocket.websocketInstance;
    }

    
    
    private url : string;
    private authToken: string;
    private ws: io.Socket; //the connection to the remote server
    private isReady : boolean;

    /**
     * 
     * @param url {string} - remote server connection
     * @param authToken  {string} - user token for ws-socket auth handshaking
     */
    private constructor(url: string, authToken: string){
        this.url = url;
        this.authToken = authToken;
        this.initWs();
        this.initAuthHandshaking();
        this.defineAuthReplyEventHandler();
    }


    /**
     * Init the ws connection
     */
    private initWs(){
        this.ws = io.connect(this.url);
    }

    /**
     * Send the identification data (jwt - token)
     */
    private initAuthHandshaking(){
        var tokenData = JSON.stringify({
            token: this.authToken
        });
        console.log(`sending token`);
        this.ws.emit("client-token", tokenData);
    }

    /**
     * handle the auth reply event handler
     */
    private defineAuthReplyEventHandler(){
        if(this.ws){
            this.ws.on('client-token-reply', (status)=>{
                console.log(`receiving status`, status);
                if(status.code){
                    this.isReady = true;
                    /**
                     * Once the ws connection is ready notify the watcher
                     */
                    Websocket.watcher.emit("isReady", this.ws);
                }
            });
        }
    }

}