// 建立http服務
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8080']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // 監聽disconnect事件
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // 監聽login
  socket.on('login', () => {
    console.log('loginSuccess');
  });

  socket.on('sendMsg', (msg) => {
    console.log('message: ' + msg);

    // 對所有client廣播
    io.emit('broadcast', `server: ${msg}`);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
