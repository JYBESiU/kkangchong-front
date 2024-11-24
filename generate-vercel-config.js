const fs = require('fs');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

// 환경 변수에서 API_BASE_URL 가져오기
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

if (!apiBaseUrl) {
  console.error('API_BASE_URL 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

// vercel.json 설정 객체
const vercelConfig = {
  rewrites: [
    {
      source: '/api/:path*',
      destination: `${apiBaseUrl}/:path*`,
    },
    {
      source: '/(.*)',
      destination: '/',
    },
  ],
};

// vercel.json 파일 경로
const vercelConfigPath = path.join(__dirname, 'vercel.json');

// vercel.json 파일 생성
fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2));

console.log(`vercel.json 파일이 생성되었습니다: ${vercelConfigPath}`);
console.log('API_BASE_URL:', apiBaseUrl);
