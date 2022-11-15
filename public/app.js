// 建立http服務
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});
const allMessage = [];
let onlineCount = 0;
const allUsers = [];

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  onlineCount++;
  io.emit('onlineUsers', onlineCount);
  console.log(onlineCount);

  // 監聽disconnect事件
  socket.on('disconnect', () => {
    console.log('user disconnected');

    onlineCount--;
    io.emit('onlineUsers', onlineCount);
  });

  // 監聽login
  socket.on('login', (userName) => {
    io.emit('addUser', userName);
    console.log('loginSuccess');
  });

  socket.on('logout', (userName) => {
    io.emit('removeUser', userName);
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

http.listen(3000, () => {
  console.log('listening on *:3000');
});
