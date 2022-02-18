const http = require('http');

class Koa {
  middleware = () => {}
  constructor(options){

  }
  listen(port, cb){
    const server = http.createServer((req, res) => {
      this.middleware(req, res)
    })
    server.listen(port, cb)
  }
  use(middleware){
    this.middleware = middleware
    return this
  }
}

module.exports = Koa