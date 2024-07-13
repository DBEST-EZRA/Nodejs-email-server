const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ezradbest101@gmail.com",
    pass: "",
  },
});

async function sendEmail() {
  const info = await transporter.sendMail({
    from: '"EZRA DBEST" <ezradbest101@gmail.com>', // sender address
    to: "ezradbest101@gmail.com", // fixed recipient address
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

app.post("/sendmail", async (req, res) => {
  try {
    await sendEmail();
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
