'use strict';



const
    cluster = require('cluster'),
    zmq = require('zmq');

if (cluster.isMaster) {
    let
        masterWorkPusher = zmq.socket('push').bind('ipc://master-push.ipc'),
        masterResultsPuller = zmq.socket('pull').bind('ipc://master-pull.ipc'),
        numWorkersAlive = 0;

        masterResultsPuller.on('message', function(data){
            const parsed = JSON.parse(data.toString());
            console.log("master puller got: " + data.toString());
            if (parsed.message == 'ready') {
                numWorkersAlive++;
                console.log("numWorkersAlive: " + numWorkersAlive);
                if (numWorkersAlive == 3) {
                    console.log("starting to send work...");
                    startSendingWork(masterWorkPusher); // UNRESOLVED FUNCTION how to call startSendingWork???
                }
            } else if (data.message == 'result') {
                console.log("Master got result: " + data.result + " processid: " + data.info);
            }
        });

    for (let i = 0; i < 3; i++) {
        console.log('forking...');
        cluster.fork();
    }
} else { // not master
    let
        slavePusher = zmq.socket('push').connect('ipc://master-pull.ipc'),
        slavePuller = zmq.socket('pull').connect('ipc://master-push.ipc');

    slavePusher.send(JSON.stringify({message: 'ready'}));

    slavePuller.on('message', function(data) {
       slavePusher.send(JSON.stringify({message: 'result', info: process.id}));
    });
}

function startSendingWork(masterWorkPusher) {
    console.log("sending 30 jobs...");
    for (let i = 0; i < 30; i++) {
        masterWorkPusher.send({message: "do_some_work"});
    }
}



