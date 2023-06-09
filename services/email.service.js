const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { configs } = require('../configs');
const emailTemplates = require('../email-templates');
const { CustomError } = require("../errors");

module.exports = {
    sendMail: async (userMail = '', emailAction = '', context = {}, link) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD,
            },
            service: 'gmail',
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs',
        }

        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplates[emailAction];
        if (!templateInfo) {
            throw new CustomError('Wrong email action', 500);
        }

        context.link = link;

        console.log(`Email start sending | email: ${userMail} | action: ${emailAction}`);
        return transporter.sendMail({
            from: configs.NO_REPLY_EMAIL,
            to: userMail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context,
        });
    }
}