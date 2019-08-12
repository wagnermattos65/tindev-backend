require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const routes = require('./routes');

// TODO: store state on database
const connectedUsers = {};
io.on('connection', (socket) => {
  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

// Middleware
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
