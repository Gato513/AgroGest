const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs/promises");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "nribero@codingdojo.la",
        pass: process.env.EMAIL_SMTP_TOKEN,
    },
});


module.exports.sendConfirmationEmail = (user) => {

    return new Promise(async (resolve, reject) => {
        try {
            const options = { ...user };
            options.message = "BIENVENIDO A PROYECTO UNO";

            const templateFile = await fs.readFile("./templates/confirmation.hbs", "utf-8");
            const template = handlebars.compile(templateFile);
            const html = template(options);

            const info = await transporter.sendMail({
                from: '"Not Reply Proyecto Uno" <antonioprado5606@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Welcome To Proyecto Uno", // Subject line
                text: "User creation", // plain text body
                html: html, // html body
            });
            resolve(info);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports.sendPasswordToken = ({user,token}) => {

    return new Promise(async (resolve, reject) => {
        try {
            const options = { ...user };
            options.token = token;

            const templateFile = await fs.readFile("./templates/forgot.hbs", "utf-8");
            const template = handlebars.compile(templateFile);
            const html = template(options);

            const info = await transporter.sendMail({
                from: '"Not Reply Proyecto Uno" <antonioprado5606@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Password Reset", // Subject line
                text: "Password Reset", // plain text body
                html: html, // html body
            });
            resolve(info);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
