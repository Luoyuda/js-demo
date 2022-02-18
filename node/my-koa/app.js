const Koa = require('./koa')


const app = new Koa()

app.use((req, res) => {
  res.writeHead(200)
  res.end('hello my koa')
})

app.listen(3300, () => {
  console.log('Server is running on 3300')
})