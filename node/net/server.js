const net = require('net');
const port = 3000;
const host = '127.0.0.1'
const server = net.createServer(socket => {
  console.log('server connected')
  socket.on('data', (data) => {
    console.log('server get data ', data.toString())
    socket.write('this is server')
  })
  socket.on('close', () => {
    console.log('server close')
  })
})
server.listen(port, host, () => {
  console.log('server listening on port %d', port)
});
