const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use("/static", express.static(path.resolve(__dirname, "front-end", "static")))

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front-end", "index.html"));
})

app.listen(5050, () => {
  console.log('server running on port: 5050');
})