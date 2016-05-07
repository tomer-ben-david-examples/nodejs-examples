"use strict";
const netWatcher = require('./net-watcher-server.js');
netWatcher.createServer(function(connection) {
    console.log('Subscriber connected');
// send the first chunk immediately
    connection.write(
        '{"type":"changed","file":"targ'
    );
// after a one second delay, send the other chunk
    let timer = setTimeout(function(){
        connection.write('et.txt","timestamp":1358175758495}' + "\n");
        connection.end();
    }, 1000);
// clear timer when the connection ends
    connection.on('end', function(){
        clearTimeout(timer);
        console.log('Subscriber disconnected');
    });
});
