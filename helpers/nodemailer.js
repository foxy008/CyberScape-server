"use strict";
const nodemailer = require("nodemailer");
async function nodeMailer(data) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'ashlihsyahrulg@gmail.com', // generated ethereal user
            pass: 'hpfjeikynphfrgle', // generated ethereal password

        },
    });
    let info = await transporter.sendMail({
        from: 'admin@cyber-scape.com', // sender address
        to: data, // list of receivers
        subject: "Congratulations, you have successfully create New account!", // Subject line
        text: "You are new member", // plain text body
        html: "<b>You are new member</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = nodeMailer
