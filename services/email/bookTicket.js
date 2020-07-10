const nodemailer = require("nodemailer");
const hogan = require("hogan.js");
const fs = require("fs");

const template = fs.readFileSync("services/email/bookingTicketEmailTemplate.hjs", "utf-8");
// const template = fs.readFileSync("./bookingTicketEmailTemplate.hjs", "utf-8");
const compiledTemplate = hogan.compile(template);

const sendBookTicketEmail = (user, trip, ticket) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: "hhlhulei@gmail.com",
      pass: "heocon@123",
    },
  };

  const transporter = nodemailer.createTransport(transport);

  const mailOptions = {
    from: "hhlhulei@gmail.com",
    to: "le.minhtam221@gmail.com",
    subject: "Mail xác nhận mua vế thành công",
    html: compiledTemplate.render({
      email: user.email,
      fromStation: trip.fromStationId.name,
      toStation: trip.toStationId.name,
      price: trip.price,
      amount: ticket.seats.length,
      total: trip.price * ticket.seats.length,
      seatCodes: ticket.seats.map((m) => m.code).join(", "),
    }),
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);
    console.log("Send mail successfully");
  });
};

module.exports = {
  sendBookTicketEmail,
};
