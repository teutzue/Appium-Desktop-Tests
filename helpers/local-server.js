"use strict";

var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(__dirname + '/static'));

app.get('/index.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../assets/index.html'));
});

var server;

exports.start = function () {
    server = app.listen(3000);
};

exports.stop = function () {
    server.close();
};
