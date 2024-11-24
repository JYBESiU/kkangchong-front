const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// API 요청을 프록시하도록 설정
module.exports = function (app) {
  app.use(
    '/api', // 프록시가 적용될 경로 (클라이언트에서 /api로 요청하면 프록시가 작동)
    createProxyMiddleware({
      target: target,
      changeOrigin: true, // 대상 서버의 CORS 정책을 우회
    })
  );
};