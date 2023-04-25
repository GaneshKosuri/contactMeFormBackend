const express = require('express')
const cors = require('cors')
require('dotenv').config();


const nodemailer = require("nodemailer");

const app = express()

app.use(express.json())
app.use(cors())

const RECEIVER_EMAIL = process.env.EMAIL
const PASSWORD = process.env.AUTH

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

app.post("/send-mail", async (request, res) => {
    const { name, mail, body } = request.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: PORT,
        secure: false,
        auth: {
            user: RECEIVER_EMAIL,
            pass: PASSWORD
        }
    });


    await transporter.sendMail({
        from: mail,
        to: RECEIVER_EMAIL,
        subject: `New Query from ${name}`,
        text: body,
    }, (err, _) => {
        if (err) {
            res.send("Error occured while contacting");
        }
        res.send('Email sent successfully');
    });
})