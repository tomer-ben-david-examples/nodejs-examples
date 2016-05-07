"use strict";
const
    fs = require('fs'),
    util = require('util'),
    net = require('net'),
    // server constructor
    NetWatcherServer = function(handler) {
        return net.createServer(handler);
    };

// expose module methods
exports.NetWatcherServer = NetWatcherServer;
exports.createServer = function(handler){
    let server = new NetWatcherServer(handler);
    server.listen(5432, function() {
        console.log('Listening for subscribers...');
    });
    return server;
};