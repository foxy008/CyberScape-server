if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  const cors = require('cors');
  const express = require('express');
  const router = require('./routes');
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);

  app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'SequelizeValidationError') {
      const message = err.errors[0].message;

      res.status(400).json({
          message
      });
    } else if(err.name === 'Forbidden') {
      res.status(403).json({
        message: 'Forbidden Access'
      })
    }else if(err.name === 'JsonWebTokenError') {
      res.status(401).json({
        message: 'Wrong access token'
      })
    } else if(err.name === 'LoginFailed') {
      res.status(401).json({
        message: 'Wrong email/password'
      })
    } else if(err.name === 'NotFound') {
      res.status(404).json({
        message: 'Post ID not found'
      })
    } else {
      res.status(500).json({
        message: 'Internal server error'
      })
    }
  });

  module.exports = app;
