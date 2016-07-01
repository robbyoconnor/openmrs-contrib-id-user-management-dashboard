'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);

module.exports = function(app) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
  app.use(require('serve-favicon')(__dirname + '/app/favicon.png'));

  app.get('/user-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, './app/index.html'));
  });
};

