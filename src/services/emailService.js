const nodemailer = require("nodemailer");
const logger = require("../utils/logger");
const { options } = require("../../routes");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(options) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent to ${options.email}`);
    } catch (error) {
      logger.error(`Error sending email to ${options.email}: ${error}`);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    await this.sendEmail({
      email: user.email,
      subject: "Welcome to Let's Practice!",
     html: `<h1>Welcome ${user.name}!</h1>
                   <p>We're glad to have you on board.</p>`
    });
  }


  async sendPasswordResetEmail(user, token) {
    await this.sendEmail({
      email: user.email,
      subject: "Reset your password",
      html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password/${token}">here</a> to reset your password.</p>`       
    });
  }
}

module.exports = EmailService;
