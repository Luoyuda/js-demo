// 格式化字符串
const formatParams = (data) => {
  if (!data || typeof data !== 'object') return ''
  return Object.keys(data)
    .map(
      (item) => `${encodeURIComponent(item)}=${encodeURIComponent(data[item])}`
    )
    .join('&')
}
// json 请求
const requestJson = (params) => {
  return new Promise((resolve, reject) => {
    // 请求方式，默认是GET
    params.type = (params.type || 'GET').toUpperCase()
    // 避免有特殊字符，必须格式化传输数据
    params.data = formatParams(params.data)
    var xhr = null

    // 实例化XMLHttpRequest对象
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      // IE6及其以下版本
      xhr = new ActiveXObjcet('Microsoft.XMLHTTP')
    }

    // 监听事件，只要 readyState 的值变化，就会调用 readystatechange 事件
    xhr.onreadystatechange = function () {
      // readyState属性表示请求/响应过程的当前活动阶段，4为完成，已经接收到全部响应数据
      if (xhr.readyState == 4) {
        var status = xhr.status
        // status：响应的HTTP状态码，以2开头的都是成功
        if (status >= 200 && status < 300) {
          var response = ''
          // 判断接受数据的内容类型
          var type = xhr.getResponseHeader('Content-type')
          if (type.indexOf('xml') !== -1 && xhr.responseXML) {
            response = xhr.responseXML //Document对象响应
          } else if (type === 'application/json') {
            response = JSON.parse(xhr.responseText) //JSON响应
          } else {
            response = xhr.responseText //字符串响应
          }
          // 成功回调函数
          resolve(JSON.parse(response || '{}'))
        } else {
          reject(JSON.parse(status || '{}'))
        }
      }
    }

    // 连接和传输数据
    if (params.type == 'GET') {
      // 三个参数：请求方式、请求地址(get方式时，传输数据是加在地址后的)、是否异步请求(同步请求的情况极少)；
      xhr.open(params.type, params.url + '?' + params.data, true)
      xhr.send(null)
    } else {
      xhr.open(params.type, params.url, true)
      //必须，设置提交时的内容类型
      xhr.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      )
      // 传输数据
      xhr.send(params.data)
    }
  })
}
// jsonp 请求
const requestJsonp = (params) => {
  return new Promise((resolve, reject) => {
    //创建script标签并加入到页面中
    var callbackName = params.jsonp
    var head = document.getElementsByTagName('head')[0]
    // 设置传递给后台的回调参数名
    params.data['callback'] = callbackName
    var data = formatParams(params.data)
    var script = document.createElement('script')
    head.appendChild(script)

    //创建jsonp回调函数
    window[callbackName] = function (json) {
      head.removeChild(script)
      clearTimeout(script.timer)
      window[callbackName] = null
      resolve(json)
    }

    //发送请求
    script.src = params.url + '?' + data
    script.addEventListener('error', (e) => {
      reject(e)
    })
    //为了得知此次请求是否成功，设置超时处理
    script.timer = setTimeout(function () {
      window[callbackName] = null
      head.removeChild(script)
      reject({
        message: '超时',
      })
    }, 10000)
  })
}
// 发起请求
const request = (params) => {
  params = params || {}
  params.data = params.data || {}
  // 判断是ajax请求还是jsonp请求
  return params.jsonp ? requestJsonp(params) : requestJson(params)
}

request({
  url: '/js/ajax/jsonp.js',
  data: {
    a: 1,
  },
  jsonp: 'cb',
})
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

request({
  url: '/js/ajax/data.json',
  data: {
    a: 1,
  },
})
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
