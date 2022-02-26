const puppeteer = require('puppeteer')
function findCards() {
  return new Promise((resolve, reject) => {
    function next(n, callback) {
      if(n > 0){
        window.scrollBy(0, window.innerHeight)
      }else{
        callback()
        return
      }
      setTimeout(() => {
        next(n - 1, callback)
      }, 1000)
    }
    function getText(node, cls) {
      let el = node.querySelector(cls)
      return el ? el.innerText : ''
    }
    next(1, () => {
      try {
        const cards = [...document.querySelectorAll('.bili-video-card')]
        resolve(cards.filter(card => card).map(card => {
          let title = getText(card, '.bili-video-card__info--tit')
          let up = getText(card, '.bili-video-card__info--author')
          let a = card.querySelector('a')
          let href = a ? a.href : ''
          return {
            title,
            up,
            href
          }
        }))
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  })
}
async function analyse(page, url){
  await page.goto(url)
  if(url === 'https://www.bilibili.com'){
    const cards = await page.evaluate(findCards)
    cards.forEach(card => {
      card && card.href && queue.push(card.href)
    })
    return cards
  }else{
    console.log('analyze page: ' + url)
  }
}
const queue = ['https://www.bilibili.com']
async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  while(queue.length){
    const url = queue.pop()
    const data = await analyse(page, url)
    store(data)
  }
}

function store(data) {
  console.log(data)
}

start()