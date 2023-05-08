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

  app.use((error, req, res, next) => {
    console.log(error);
    switch (error.name) {
        case 'SequelizeValidationError':
            message = error.errors[0].message;

            res.status(400).json({
                message
            });
            break;

        case 'SequelizeUniqueConstraintError':
            message = error.errors[0].message;

            switch (message) {
                case "email must be unique":
                    message = "Email had been registered before."
                    break;
            }

            res.status(400).json({
                message
            });
            break;

        case 'JsonWebTokenError':
            res.status(403).json({
                message: 'Wrong access token'
            });
            break;

        case 'AuthorFailed':
            res.status(403).json({
                message: 'You can only modify/edit your own added movie'
            });
            break;

        case 'LoginFailed':
            res.status(401).json({
                message: 'Wrong email/password'
            });
            break;

        case 'ForbiddenLogin':
            res.status(403).json({
                message: 'You must be an admin'
            });
            break;

        case 'RoomNotFound':
            res.status(404).json({
                message: 'Room ID not found'
            });
            break;
        case 'RatingIsEmpty':
            res.status(404).json({
                message: 'Rating value not found'
            });
            break;

        case 'FavoriteNotFound':
            res.status(404).json({
                message: 'Favorite ID not found'
            });
            break;

        case 'FavoriteExisted':
            res.status(400).json({
                message: 'Favorite had been created before'
            });
            break;
        case 'nullQuota':
            res.status(400).json({
                message: 'Your Quota has empty'
            });
            break;

        case 'SequelizeForeignKeyConstraintError':
            res.status(400).json({
                message: 'Favorite had been created before'
            })
            break;

        default:
            res.status(500).json({
                message: 'Internal server error'
            });
            break;
    }
  });

  module.exports = app;
