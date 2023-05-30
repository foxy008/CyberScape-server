if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const router = require("./routes");
const app = express();
const Moralis = require("moralis").default;

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.get("/", (_, res) => res.send("hello world"));

app.use((error, _, res, __) => {
    switch (error.name) {
        case "SequelizeValidationError":
            message = error.errors[0].message;

            res.status(400).json({
                message,
            });
            break;

        case "SequelizeUniqueConstraintError":
            message = error.errors[0].message;

            res.status(400).json({
                message,
            });
            break;

        case "JsonWebTokenError":
            res.status(403).json({
                message: "Your verification link is not valid!",
            });
            break;

        case "LoginFailed":
            res.status(401).json({
                message: "Wrong email/password",
            });
            break;

        case "RoomNotFound":
            res.status(404).json({
                message: "Room ID not found",
            });
            break;

        case "RoomExisted":
            res.status(400).json({
                message: "Room has been created before",
            });
            break;

        case "RatingIsEmpty":
            res.status(404).json({
                message: "Rating value not found",
            });
            break;

        case "FavoriteNotFound":
            res.status(404).json({
                message: "Favorite ID not found",
            });
            break;

        case "NFTExisted":
            res.status(400).json({
                message: "NFT had been created before",
            });
            break;

        case "UserNotAvailable":
            res.status(403).json({
                message: "You need to be verified first!",
            });
            break;

        case "HadBeenVerified":
            res.status(403).json({
                message: "Your account had already been verify before!",
            });
            break;

        case "WrongVerifyToken":
            res.status(403).json({
                message: "Your verification link is not valid!",
            });
            break;

        case "RatingExisted":
            res.status(400).json({
                message: "Rating has been created before",
            });
            break;

        case "NullQuota":
            res.status(400).json({
                message: "Your Quota has empty",
            });
            break;

        case "FailedPayment":
            res.status(400).json({
                message: "Your Payment has been Failed",
            });
            break;

        case "UserUpdateFailed":
            res.status(500).json({
                message: "User failed to update",
            });
            break;

        case "NullQuota":
            res.status(406).json({
                message: "User's quota is less than 1",
            });
            break;

        case "FavoriteExisted":
            res.status(400).json({
                message: "Favorite had been created before",
            });
            break;

        case "FavoriteNotFound":
            res.status(404).json({
                message: "Favorite not found",
            });
            break;

        case "SequelizeForeignKeyConstraintError":
            res.status(400).json({
                message: "Favorite had been created before",
            });
            break;

        default:
            res.status(500).json({
                message: "Internal server error",
            });
            break;
    }
});

module.exports = app;
