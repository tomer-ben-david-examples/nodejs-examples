"use strict";
const
    fs = require('fs'),
    spawn = require('child_process').spawn,
    filename = process.argv[2];
const a =
console.log(['a', 'b'].concat(['c', 'd']));
if (!filename) {
    throw Error("A file to watch must be specified!");
}
let args = ['-lh'].concat(process.argv.slice(3, process.argv.length)).concat([filename]);
console.log("args " + args + " typof args: " + typeof args);

console.log(typeof [1,2,3].concat([4,5,6]));
require('child_process').spawn('ls', ['-la'].concat(['-h'])).stdout.pipe(process.stdout);
//console.log(typeof []);
//
//fs.watch(filename, function() {
//    let ls = spawn('ls ', args);
//    console.log("command to run: " + ls);
//    ls.stdout.pipe(process.stdout);
//});
//console.log("Now watching " + filename + " for changes...");