const express = require('express');
const router = express.Router();

const multiparty = require("multiparty");
const nodemailer = require("nodemailer");
router.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// CONTACT ROUTE
router.get("/", (req, res) => {
    res.render("sections/contact/index");
});

router.post("/", async (req, res) => {
    let form = new multiparty.Form();
    let data = {};

    await form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        })
    });
    const mail = {
        sender: data.email,
        to: process.env.EMAIL_USER, // receiver email,
        subject: data.subject,
        text: `Name: ${data.name} \nEmail: <${data.email}> \nSubject: ${data.subject} \nMessage: \n"${data.message}"`
    };

    transporter.sendMail(mail, (err, data) => {
    if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
    } else {
        res.status(200).send("Email successfully sent to recipient!");
    }
    });
});


module.exports = router;