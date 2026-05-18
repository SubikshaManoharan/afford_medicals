const { createProxyMiddleware } = require('http-proxy-middleware');

// This file is used by Create React App's development server to proxy
// requests matching the path to the target API server so the browser
// does not run into CORS issues during development.

module.exports = function(app) {
  app.use(
    '/evaluation-service',
    createProxyMiddleware({
      target: 'http://20.244.56.144',
      changeOrigin: true,
      secure: false,
      logLevel: 'silent',
    })
  );
};
