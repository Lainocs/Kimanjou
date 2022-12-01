import { Server } from 'socket.io'

const io = new Server({
  cors: {
    origin: '*',
  }
})

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('message', (data) => {
    console.log(data)
    socket.broadcast.emit('message', data)
  })
})

io.listen(3000)