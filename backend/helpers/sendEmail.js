const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "polliandfibi@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;

// const email = {
//     to: "photoshell9@gmail.com",
//     from: "polliandfibi@gmail.com",
//     subject: "Новая заявка с сайта",
//     html: "<p>С сайта пришла новая заяка</p>"
// }
//
// sgMail.send(email)
//     .then(() => console.log("Email send success"))
//     .catch(error => console.log(error.message))
