var nodeWifi = nodeWifi ?  nodeWifi : require('node-wifi')

module.exports = {
    init: (interface)=>{
        if(!interface) var interface = null;
        nodeWifi.init({
            iface: interface
        })
    },
    scan : ()=>{
        return new Promise((resolve, reject)=>{
            nodeWifi.scan((err, networks)=>{
                if(err)
                    return reject(err);
                return resolve(networks);
            });
        });
    },
    connect: ()=>{

    }
}