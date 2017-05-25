var socketIO = require('socket.io');
const UserService = require('../../App/Services/User');
const fs = require('fs');
const chokidar = require('chokidar');
const Enviroment = require('../Enviroment/enviromentManager')
const watchFilePath = Enviroment.WATCH_FILE;

/**
 * We will define a map of clients id -> sockets (many connections)
 * Each conssits of socket reference and user data
 * user-data comes from the jwt token sent by user at check-in point
 */
var clients = {}
//for easier and faster map of socketId and client
//for remove and other operatios
var socketClientMap = {};
var clientSocketMap = {};


module.exports = {
    attachToServer: function(httpServer){
        return socketIO(httpServer);
    },

    defineEvents: function(io){
        this.__defineIoSocketsBroadcastingEvents(io);
        //Whenever someone connects this gets executed
        /**
         * socket object refere to the client connection
         * more precisly the page or the component (client-webBrowser-session) where the client init the connection
         * so a clinet may have more than one connecting sockets
         * and so we can use it to communicate with the socket of the client it self
         * 
         * in the client we can init the websocket at the root component and make other comps
         * use it, so we assure that the client(browser-session) have only one socket. 
         * 
         * the socket connection is assiened with id
         * so the client can have many socket conenction (happens when open multi-connection/multi-tabs)
         * 
         * we can only allow single connection and we can allow many 
         * for more advanced operations
         * we may have a map of agents with different components sockets
         */
        io.on('connection', (socket)=>{
            /**
             * After we retrive the socket refrence
             * we can define the set of event handlers
             * and we can raise events
             * 
             * we use a map of sockets so that we can manage different agents ops
             * and comms.
             * 
             * 
             */
            //socket.broadcast.emit('hi');
            socket.on('client-token', (data)=>{
                try{
                    /**
                     * handle userdata -> json
                     */
                    data = JSON.parse(data);
                    var userToken = data.token;
                    /**
                     * Fetch user data (decode jwt token)
                     */
                    UserService.getUserDataFromToken(userToken)
                    .then(userData=>{
                            if(!clients[`${userData.userId}`]){
                                clients[`${userData.userId}`] = {
                                    userData : userData,
                                    sockets : []
                                };
                            }

                            //to make sure no duplicate sockets
                            var socketId = socket.id;
                            var isNewSocket = true;
                            var clientRef = clients[`${userData.userId}`];
                            if(clientRef && clientRef.sockets){
                                clientRef.sockets.forEach((clientSocket)=>{
                                    if(clientSocket.id == socketId)
                                        isNewSocket = false;
                                })

                                if(isNewSocket){
                                    /**
                                     * Add to client and deine a map between client and socket
                                     */
                                    clientRef.sockets.push(socket);
                                    socketClientMap[`${socket.id}`] = userData.userId;

                                    /**
                                     * Define the socket events
                                     */
                                    this.__defineAuthorizedSocketEvents(io, socket, userData)
                                }
                            }
                    });
                }catch(exp){
                    console.log('exception', exp);
                }            
            });
        });
    },


    __defineIoSocketsBroadcastingEvents: (io)=>{
        chokidar.watch(watchFilePath).on('change', (path, stats)=>{
            fs.readFile(watchFilePath, (err, data)=>{
                if(!err){
                    io.sockets.emit('file-feed', data.toString());
                }
            });
        })
    },

    __getClientsList: ()=>{
        var list = [];
        Object.keys(clients).forEach(clientId=>{
            var ref = clients[`${clientId}`];
            if(ref && ref.userData){
                list.push({
                    id: ref.userData.userId,
                    name: ref.userData.username,
                    isAdmin: ref.userData.isAdmin
                });
            }
        });
        return list;
    },


    __defineAuthorizedSocketEvents: function(io, socket, userData){
        /**
         * Here where we confirm the socket
         * replay of confirmation
         */
        socket.emit('client-token-reply', {
            code: true
        });

        /**
         * Broadcast the new clients list
         * will change if a new clinet 
         */
        io.sockets.emit('clients-list', this.__getClientsList());

        socket.on('get-clients-list', ()=>{
            console.log(`Receining get-cliients-list from: `, socketClientMap[`${socket.id}`]);
            socket.emit('clients-list', this.__getClientsList());
        });
        //for 
        console.log(Object.keys(clients));

        /**
         * here we register the evnet handlers 
         */

        /**
         * File-feed events
         */
        var fileData = fs.readFileSync(watchFilePath);
        //emit fir first time
        socket.emit('file-feed', fileData.toString());
        //in cases where client ask for file-feed
        socket.on('file-feed', data=>{
            //we can make this event as a file-watcher
            //where we emit events once a change of the file happened
            //or we can use an external file watcher
            //where writing to the file will be watched and emit a broadcasting event
            fs.writeFileSync(watchFilePath, data);
        })

        /**
         * Clients Messaging
         */
        socket.on('client-msg', (msg)=>{
            //detect this socket registered user
            var fromUserId = socketClientMap[`${socket.id}`];
            var toUserId = msg.to;
            var msgContent = msg.msg;
            var targetUserRef = clients[`${toUserId}`];
            if(targetUserRef && targetUserRef.sockets && targetUserRef.sockets.length){
                /**
                 * Todo: communicate with chat service (doc-based-db store)
                 * to store the messages (with timestamp)
                 * 
                 * define http-route to fetch users messages
                 */
                targetUserRef.sockets.forEach(socket=>{
                    socket.emit('client-msg', {
                        from: fromUserId,
                        msg: msgContent
                    })
                });
            }
        });

        /**
         * Disconnection event
         * when the sokcet emit disconnect event 
         * we can remove it from the clients list
         */
        socket.on('disconnect', ()=>{
            if(socket.id){
                var clientId = socketClientMap[`${socket.id}`];
                console.log(`Disconnecting :`,  clientId);

                var clientRef = clients[`${clientId}`];
                if(clientRef && clientRef.sockets){
                    clientRef.sockets = clientRef.sockets.filter(clientSocket=>{
                        if(clientSocket.id == socket.id)
                            return false;
                        return true;
                    })
                    if(!clientRef.sockets.length){
                        delete clients[`${clientId}`];
                    }
                }
                io.sockets.emit('clients-list', this.__getClientsList());
                console.log(Object.keys(clients));
            }   
        });
    } 
}