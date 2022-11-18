// 建立http服務
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});
const allMessage = [];
// let onlineCount = 0;
const userRows = [];

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // 監聽disconnect事件
  socket.on('disconnect', () => {
    console.log('user disconnected');

    // onlineCount--;
    // io.emit('onlineUsers', onlineCount);
  });

  // 監聽login
  socket.on('login', (userName) => {
    if (!userRows.includes(userName)) {
      socket.emit('loginSuccess', userName);
    } else {
      socket.emit('loginFail', userName);
    }
    userRows.push(userName);
  });

  socket.on('logout', (userName) => {
    const index = userRows.findIndex(item => item === userName);
    userRows.splice(index, 1);
    io.emit('removeUser', userName, userRows.length);
  });

  // 監聽進入chatPage
  socket.on('goChat', (userName) => {
    // onlineCount++;
    // io.emit('onlineUsers', onlineCount);
    io.emit('addUser', userName, userRows.length);
    console.log(userRows.length);
  });

  // 發送之前的全部訊息
  // io.emit('allMessage', allMessage);

  // 監聽用戶傳送的訊息
  socket.on('sendMessage', (data) => {
    console.log('message: ' + data.msg);

    // allMessage.push(data);
    // 對所有client廣播
    io.emit('newMessage', data);
  });
});

io.on('connect_error', (socket) => {
  socket.emit('connectFail');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
