const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(express.json())
app.use(cors())

const MAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

app.post("/send-mail",async (request,res)=>{
    const {name,mail,body} = request.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL,
            pass: PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: mail,
        to: MAIL,
        subject: `New Query from ${name}`,
        text: body,
    }, (err, data) => {
        if(err) {
            res.send("Error occured while contacting");
        } else {
            res.send('Email sent successfully');
        }
    });
})