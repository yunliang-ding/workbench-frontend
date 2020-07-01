const fs = require('fs')
const express = require('express')
const cors = require('cors')
const proxy = require('http-proxy-middleware')
const app = express()
const config = require('./config.json')
const prefix = ''
const proxyUrl = config.proxyUrl
const port = 80
app.use(cors()) // cors
app.use(express.static('./public')) // 开启静态资源访问
// 接口的代理1
app.use('/workbench/*', proxy({
    target: proxyUrl,
    changeOrigin: true,
    pathRewrite: { '^/workbench': '' }
  })
)
// 项目 prefix
app.get(prefix, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
  res.end(fs.readFileSync('./views/index.html').toString())
})
// 启动服务
app.listen(port, () => {
  console.log('server on port 80')
})