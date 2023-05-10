"use strict";
const nodemailer = require("nodemailer");
async function nodeMailer(email, token, name) {
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
        to: email, // list of receivers
        subject: `Hi ${name}, Welcome to CyberScape!`, // Subject line
        text: "You are new member", // plain text body
        html: `<p>Congratulations! You've created a new CyberScape account. To access the full features of CyberScape, please <a href="${process.env.CLIENT_URL}?verify=${token}"> verify your account<a>!</p>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = nodeMailer
