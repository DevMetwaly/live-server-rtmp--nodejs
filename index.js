'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const NodeMediaServer = require('node-media-server');


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: "app-pathology-session-Secret",
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  cookie: {
    secure: false,
    maxAge: null
  }
}));





app.get('*', (req, res) => {
  res.render('index');
});


const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8888,
    mediaroot: './server/media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: 'D:/Study/Projects/RmtpServer/ffmpeg-4.3.1-2020-11-19-full_build/bin/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

var nms = new NodeMediaServer(config)
nms.run();
console.log('started');
module.exports = app.listen(5000);

