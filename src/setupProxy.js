const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://211.188.53.9:80';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request:', req.method, req.url);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response:', proxyRes.statusCode, req.url);
      },
    })
  );
};
