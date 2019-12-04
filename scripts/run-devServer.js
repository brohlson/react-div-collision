const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('src/index.html', {
  cache: false,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/.netlify/functions/',
  proxy({
    target: 'http://localhost:9000',
    pathRewrite: {
      '/.netlify/functions/': '',
    },
  })
);

app.use(bundler.middleware());
app.listen(PORT);
