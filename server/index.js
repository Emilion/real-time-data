var express = require('express');
var responseGenerator = require('./resp.generator');
var cors = require('cors');
var WebSocket = require('ws');

var app = express();

app.use(cors());

port = process.env.PORT || 3000;

var server = require('http').createServer(app);
var wss = new WebSocket.Server({server: server});

wss.on('connection', function connection(ws, req) {
    var responseGeneratorTimer;
    ws.on('message', function incoming(message) {
        var msg = JSON.parse(JSON.parse(message)).message;
        console.log('message %s', msg);
        if(msg === 'start') {
            responseGeneratorTimer = responseGenerator(false, function(selections) {
                ws.send(JSON.stringify(selections));
            })
        }
        if(msg === "stop") {
            clearTimeout(responseGeneratorTimer);
        }
    });
    responseGeneratorTimer = responseGenerator(true, function(selections) {
        ws.send(JSON.stringify(selections));
    })

});

server.listen(port);

