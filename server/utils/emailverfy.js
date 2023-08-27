const nodemailer = require("nodemailer");

async function emailV(email, code, sub) {
  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "mmhasan045@gmail.com", // generated ethereal user
      pass: "wbjevrizghcecgrh", // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: "Lost & Found", // sender address
    to: email, // list of receivers
    subject: sub, // Subject line
    text: "Click Here", // plain text body
    html: `<button  >${code}</button>`, // html body
  });
}

module.exports = emailV;
